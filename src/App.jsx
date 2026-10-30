import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Experiments from "@/sections/Experiments";
import Experience from "@/sections/Experience";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Navbar from "@/layout/Navbar";
import ProjectDetail from "@/sections/ProjectDetail";
import { fetchContent, defaultContent } from "@/data/content";
import { useEffect, useState } from "react";


function App() {
  const [content, setContent] = useState(defaultContent);
  const [project, setProject] = useState(null);
  const [contentLoadFailed, setContentLoadFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchContent(controller.signal)
      .then(setContent)
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Could not load portfolio content.", error);
        setContentLoadFailed(true);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const updateProject = () => {
      const slug = window.location.hash.match(/^#project\/([^/]+)$/)?.[1];
      setProject(content.projects.find((item) => item.slug === slug) ?? null);
    };
    updateProject();
    window.addEventListener("hashchange", updateProject);
    return () => window.removeEventListener("hashchange", updateProject);
  }, [content]);

  useEffect(() => {
    document.title = content.site.title;
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      content.site.description,
    );
  }, [content.site.title, content.site.description]);

  useEffect(() => {
    if (project) {
      window.scrollTo(0, 0);
    } else if (window.location.hash === "#projects") {
      document.getElementById("projects")?.scrollIntoView();
    }
  }, [project]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {project ? (
        <ProjectDetail project={project} copy={content.projectDetail} />
      ) : (
        <>
          <Navbar content={content.site} />
          <main>
            <Hero content={content.hero} />
            <About content={content.about} />
            <Projects projects={content.projects} copy={content.projectsSection} />
            <Experiments experiments={content.experiments} copy={content.experimentsSection} />
            <Experience experiences={content.experience} copy={content.experienceSection} />
            <Testimonials testimonials={content.testimonials} copy={content.testimonialsSection} />
            <Contact content={content.contactSection} />
          </main>
        </>
      )}
      {contentLoadFailed && (
        <p
          role="alert"
          className="fixed bottom-4 right-4 z-[60] max-w-sm rounded-xl border border-border bg-surface px-4 py-3 text-sm shadow-lg"
        >
          {content.messages.contentError}
        </p>
      )}
    </div>
  )
}

export default App
