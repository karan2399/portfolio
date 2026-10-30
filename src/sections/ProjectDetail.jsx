import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { resolveProjectImageUrl } from "@/data/projects";

const ProjectDetail = ({ project, copy }) => {
  const [copyStatus, setCopyStatus] = useState("");

  const copyCredentials = async () => {
    if (!navigator.clipboard?.writeText) {
      setCopyStatus(copy.clipboardUnavailable);
      return;
    }

    const { email, password } = project.demoCredentials;
    try {
      await navigator.clipboard.writeText(
        copy.credentialsTemplate
          .replace("{email}", email)
          .replace("{password}", password),
      );
      setCopyStatus(copy.copied);
      window.setTimeout(() => setCopyStatus(""), 2000);
    } catch (error) {
      console.error("Could not copy demo credentials.", error);
      setCopyStatus(copy.copyError);
    }
  };

  return (
    <main className="min-h-screen pb-24">
      <div className="container mx-auto px-6 pt-32">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {copy.back}
        </a>

        <section className="mx-auto mt-12 max-w-5xl">
          <div className="mb-10">
            <span className="text-sm font-medium uppercase tracking-widest text-primary">
              {copy.eyebrow}
            </span>
            <h1 className="mt-4 text-4xl font-bold md:text-6xl">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {copy.demo} <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition-colors hover:border-primary/50 hover:text-primary"
              >
                     <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.67.08-.67 1.12.08 1.71 1.15 1.71 1.15 1 .1 1.53-.75 1.9-1.17.1-.72.39-1.21.7-1.49-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.29-2.6 5.23-5.09 5.51.4.35.75 1.02.75 2.06v3.15c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                    </svg>
                <span>{copy.github}</span>
              </a>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium">{copy.role}:</span> {project.role}
            </p>
          </div>

          {project.screenshots?.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {project.screenshots.map((screenshot) => (
                <figure key={screenshot.src} className="glass overflow-hidden rounded-2xl">
                  <img
                    src={resolveProjectImageUrl(screenshot.src)}
                    alt={screenshot.alt}
                    className="aspect-video w-full object-fill"
                  />
                  <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                    {screenshot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold">{copy.about}</h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  {project.overview}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">{copy.highlights}</h2>
                <ul className="mt-5 space-y-4">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">{copy.technologies}</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/50 bg-surface px-4 py-2 text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              {project.demoCredentials && (
                <section className="glass rounded-2xl p-6">
                  <h2 className="text-xl font-semibold">{copy.tryDemo}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {copy.demoWarning}
                  </p>
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                        {copy.email}
                      </dt>
                      <dd className="mt-1 break-all font-mono text-sm">
                        {project.demoCredentials.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                        {copy.password}
                      </dt>
                      <dd className="mt-1 font-mono text-sm">
                        {project.demoCredentials.password}
                      </dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={copyCredentials}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {copyStatus === copy.copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copyStatus || copy.copy}
                  </button>
                  <span role="status" aria-live="polite" className="sr-only">
                    {copyStatus}
                  </span>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {project.demoCredentials.note}
                  </p>
                </section>
              )}

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center justify-between rounded-2xl p-6 transition-colors hover:border-primary/50"
              >
                <span>
                  <span className="block font-medium">{copy.source}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {copy.repository}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-primary" />
              </a>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProjectDetail;
