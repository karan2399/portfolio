import Hero from "@/sections/Hero";
import  About  from "@/sections/About";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Navbar from "@/layout/Navbar";
import ProjectDetail from "@/sections/ProjectDetail";
import { fetchProjects, findProjectFromHash } from "@/data/projects";
import { useEffect, useState } from "react";


function App() {
  const [projects, setProjects] = useState([]);
  const [projectsStatus, setProjectsStatus] = useState("loading");
  const [project, setProject] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchProjects(controller.signal)
      .then((loadedProjects) => {
        setProjects(loadedProjects);
        setProjectsStatus("loaded");
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Could not load project data.", error);
        setProjectsStatus("error");
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const updateProject = () =>
      setProject(findProjectFromHash(window.location.hash, projects));
    updateProject();
    window.addEventListener("hashchange", updateProject);
    return () => window.removeEventListener("hashchange", updateProject);
  }, [projects]);

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
        <ProjectDetail project={project} />
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects projects={projects} status={projectsStatus} />
            <Experience />
            <Testimonials />
            <Contact />
          </main>
        </>
      )}
    </div>
  )
}

export default App
