const projectsUrl =
  "https://gist.githubusercontent.com/karan2399/a07ac9de0c84ef94a10c52da301fe727/raw/projects.json";

const isRecord = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isStringArray = (value) =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

export const resolveProjectImageUrl = (src) =>
  /^https?:\/\//i.test(src)
    ? src
    : `${import.meta.env.BASE_URL}${src.replace(/^\/+/, "")}`;

export const findProjectFromHash = (hash, projects) => {
  const slug = hash.match(/^#project\/([^/]+)$/)?.[1];
  return projects.find((project) => project.slug === slug) ?? null;
};

const isProject = (project) =>
  isRecord(project) &&
  ["slug", "title", "description", "image", "overview", "role", "liveDemoUrl", "github"].every(
    (key) => typeof project[key] === "string",
  ) &&
  Array.isArray(project.screenshots) &&
  project.screenshots.every(
    (screenshot) =>
      isRecord(screenshot) &&
      ["src", "alt", "caption"].every((key) => typeof screenshot[key] === "string"),
  ) &&
  isStringArray(project.tags) &&
  isStringArray(project.highlights) &&
  isRecord(project.demoCredentials) &&
  ["email", "password", "note"].every(
    (key) => typeof project.demoCredentials[key] === "string",
  );

export async function fetchProjects(signal) {
  const response = await fetch(projectsUrl, { cache: "no-store", signal });
  if (!response.ok) {
    throw new Error(`Could not load projects (${response.status}).`);
  }

  const projects = await response.json();
  if (!Array.isArray(projects) || !projects.every(isProject)) {
    throw new Error("The project Gist must contain an array of valid project objects.");
  }

  const slugs = projects.map((project) => project.slug);
  if (new Set(slugs).size !== slugs.length) {
    throw new Error("Every project in the Gist must have a unique slug.");
  }

  return projects;
}
