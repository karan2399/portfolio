const experimentsUrl =
  "https://gist.githubusercontent.com/karan2399/d7384d30ea7ed5ec6cc24bc1b7e784e9/raw/portfolio_experiments.json";

const isRecord = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isStringArray = (value) =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const isExperiment = (experiment) =>
  isRecord(experiment) &&
  ["slug", "name", "description", "deployedUrl", "githubUrl"].every(
    (key) => typeof experiment[key] === "string",
  ) &&
  isStringArray(experiment.technologies);

export async function fetchExperiments(signal) {
  const response = await fetch(experimentsUrl, { cache: "no-store", signal });
  if (!response.ok) {
    throw new Error(`Could not load experiments (${response.status}).`);
  }

  const experiments = await response.json();
  if (!Array.isArray(experiments) || !experiments.every(isExperiment)) {
    throw new Error(
      "The experiments Gist must contain an array of valid experiment objects.",
    );
  }

  const slugs = experiments.map((experiment) => experiment.slug);
  if (new Set(slugs).size !== slugs.length) {
    throw new Error("Every experiment in the Gist must have a unique slug.");
  }

  return experiments;
}
