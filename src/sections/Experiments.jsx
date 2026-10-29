import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchExperiments } from "@/data/experiments";

const Experiments = () => {
  const [experiments, setExperiments] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetchExperiments(controller.signal)
      .then((loadedExperiments) => {
        setExperiments(loadedExperiments);
        setStatus("loaded");
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Could not load experiment data.", error);
        setStatus("error");
      });

    return () => controller.abort();
  }, []);

  return (
  <section id="experiments" className="relative overflow-hidden py-32">
    <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
    <div className="container relative z-10 mx-auto px-6">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <span className="text-sm font-medium uppercase tracking-wider text-secondary-foreground">
          Beyond the featured work
        </span>
        <h2 className="mt-4 text-4xl font-bold text-secondary-foreground md:text-5xl">
          Small projects
          <span className="font-serif font-normal italic text-white">
            {" "} & experiments.
          </span>
        </h2>
        <p className="mt-6 text-muted-foreground">
          A collection of things I build to explore ideas, learn new
          technologies, and try something different.
        </p>
      </div>

      {status === "loading" && (
        <p role="status" className="text-center text-muted-foreground">
          Loading experiments…
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-center text-muted-foreground">
          Experiment details couldn’t be loaded. Please try again later.
        </p>
      )}
      {status === "loaded" && experiments.length > 0 ? (
        <div
          className={`grid gap-6 ${
            experiments.length === 1
              ? "mx-auto max-w-3xl grid-cols-1"
              : experiments.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {experiments.map((experiment) => (
            <article
              key={experiment.name}
              className="glass flex h-full flex-col rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold">{experiment.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {experiment.description}
              </p>
              <div className="mt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Technologies
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {experiment.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full border border-border/50 bg-surface px-3 py-1 text-xs text-muted-foreground"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 border-t border-border/50 pt-4">
                {experiment.deployedUrl && (
                  <a
                    href={experiment.deployedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-foreground"
                  >
                    Live demo <ExternalLink size={16} aria-hidden="true" />
                  </a>
                )}
                {experiment.githubUrl && (
                  <a
                    href={experiment.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-foreground"
                  >
                    GitHub <ExternalLink size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : status === "loaded" && experiments.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Small projects and experiments are coming soon.
        </p>
      ) : null}
    </div>
  </section>
  );
};

export default Experiments;
