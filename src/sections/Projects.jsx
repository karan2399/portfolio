import { ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import  AnimatedBorderButton  from "@/components/AnimatedBorderButton";
import { resolveProjectImageUrl } from "@/data/projects";

const Projects = ({ projects, status }) => {
  const sliderRef = useRef(null);
  const [canScrollBackward, setCanScrollBackward] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);
  const isSlider = projects.length > 3;

  const projectGridClass =
    projects.length === 1
      ? "mx-auto max-w-3xl grid-cols-1"
      : projects.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !isSlider) return undefined;

    const updateScrollControls = () => {
      setCanScrollBackward(slider.scrollLeft > 0);
      setCanScrollForward(
        slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 1,
      );
    };

    updateScrollControls();
    slider.addEventListener("scroll", updateScrollControls);
    window.addEventListener("resize", updateScrollControls);
    return () => {
      slider.removeEventListener("scroll", updateScrollControls);
      window.removeEventListener("resize", updateScrollControls);
    };
  }, [isSlider]);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    const firstCard = slider?.firstElementChild;
    if (!slider || !firstCard) return;

    const gap = parseFloat(window.getComputedStyle(slider).columnGap) || 0;
    slider.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that
            <span className="font-serif italic font-normal text-white">
              {" "}
              make an impact.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of my recent work, from complex web applications to
            innovative tools that solve real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        {status === "loading" && (
          <p role="status" className="text-center text-muted-foreground">
            Loading projects…
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="text-center text-muted-foreground">
            Project details couldn’t be loaded. Please try again later.
          </p>
        )}
        {status === "loaded" && (
          <>
            <div
              ref={sliderRef}
              role={isSlider ? "region" : undefined}
              aria-label={isSlider ? "Featured projects" : undefined}
              aria-roledescription={isSlider ? "carousel" : undefined}
              tabIndex={isSlider ? 0 : undefined}
              className={
                isSlider
                  ? "project-slider flex items-stretch gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
                  : `grid ${projectGridClass} gap-8`
              }
            >
              {projects.map((project, idx) => (
                <a
                  key={project.slug}
                  href={`#project/${project.slug}`}
                  aria-label={`View details for ${project.title}`}
                  role={isSlider ? "group" : undefined}
                  aria-roledescription={isSlider ? "slide" : undefined}
                  className={`group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1 ${
                    isSlider ? "project-slide snap-start" : ""
                  }`}
                  style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                >
                  {project.image && (
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={resolveProjectImageUrl(project.image)}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0
                    bg-gradient-to-t from-card via-card/50
                     to-transparent opacity-60"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium">
                          View project details <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 p-6">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                        {project.title}
                      </h3>
                      <ArrowUp
                        className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                      />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/50 bg-surface px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            {isSlider && (
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  aria-label="Previous projects"
                  onClick={() => scrollSlider(-1)}
                  disabled={!canScrollBackward}
                  className="glass rounded-full p-3 text-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next projects"
                  onClick={() => scrollSlider(1)}
                  disabled={!canScrollForward}
                  className="glass rounded-full p-3 text-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowRight size={20} aria-hidden="true" />
                </button>
              </div>
            )}
          </>
        )}

        {/* View All CTA */}
        <div className="text-center mt-12 animate-fade-in animation-delay-500">
          <AnimatedBorderButton  link="https://www.github.com/karan2399">
            View All Projects
            <ArrowUp className="w-5 h-5" />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
};

export default Projects;