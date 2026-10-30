import { ExternalLink } from "lucide-react";
const Experiments = ({ experiments, copy }) => {
  return (
  <section id="experiments" className="relative overflow-hidden py-32">
    <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
    <div className="container relative z-10 mx-auto px-6">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <span className="text-sm font-medium uppercase tracking-wider text-secondary-foreground">
          {copy.eyebrow}
        </span>
        <h2 className="mt-4 text-4xl font-bold text-secondary-foreground md:text-5xl">
          {copy.headline[0]}
          <span className="font-serif font-normal italic text-white">
            {copy.headline[1]}
          </span>
        </h2>
        <p className="mt-6 text-muted-foreground">
          {copy.description}
        </p>
      </div>

      {experiments.length > 0 ? (
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
                  {copy.technologies}
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
                    {copy.liveDemo} <ExternalLink size={16} aria-hidden="true" />
                  </a>
                )}
                {experiment.githubUrl && (
                  <a
                    href={experiment.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-foreground"
                  >
                    {copy.github} <ExternalLink size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          {copy.empty}
        </p>
      )}
    </div>
  </section>
  );
};

export default Experiments;
