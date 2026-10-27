import Hero from "@/sections/Hero";
import  About  from "@/sections/About";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Navbar from "@/layout/Navbar";
import ProjectDetail, { findProjectFromHash } from "@/sections/ProjectDetail";
import { useEffect, useState } from "react";


function App() {
  const [project, setProject] = useState(() => findProjectFromHash(window.location.hash));

  useEffect(() => {
    const updateProject = () => setProject(findProjectFromHash(window.location.hash));
    window.addEventListener("hashchange", updateProject);
    return () => window.removeEventListener("hashchange", updateProject);
  }, []);

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
            <Projects />
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
