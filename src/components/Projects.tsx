import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ChevronLeft, ChevronRight, Folder } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  problem: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project One",
    description: "A full-stack web application that revolutionizes task management",
    problem: "Built a scalable task management system with real-time collaboration features",
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Project Two",
    description: "An AI-powered analytics dashboard for data visualization",
    problem: "Created intelligent dashboards that transform raw data into actionable insights",
    techStack: ["Next.js", "Python", "PostgreSQL", "Chart.js", "TensorFlow"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Project Three",
    description: "A performant e-commerce platform with seamless checkout",
    problem: "Developed a high-performance store with 99.9% uptime and sub-second load times",
    techStack: ["React", "Express", "Stripe", "Redis", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-header",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getVisibleProjects = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % projects.length;
      visible.push({ ...projects[index], position: i });
    }
    return visible;
  };

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="projects-header mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block font-mono text-sm font-medium text-primary"
          >
            // FEATURED_PROJECTS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-muted-foreground"
          >
            A showcase of my engineering work — from concept to deployment
          </motion.p>
        </div>

        {/* Projects carousel */}
        <div className="relative mx-auto max-w-6xl">
          {/* Navigation buttons */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <motion.button
              onClick={prevProject}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <motion.button
              onClick={nextProject}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Cards container */}
          <div className="relative flex items-center justify-center gap-6 px-4">
            <AnimatePresence mode="popLayout">
              {getVisibleProjects().map((project, idx) => {
                const isCenter = idx === 1;
                return (
                  <motion.div
                    key={`${project.id}-${currentIndex}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8, x: idx === 0 ? -100 : idx === 2 ? 100 : 0 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.6,
                      scale: isCenter ? 1 : 0.85,
                      x: 0,
                      zIndex: isCenter ? 10 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`project-card w-full max-w-md flex-shrink-0 ${
                      isCenter ? "" : "pointer-events-none hidden md:block"
                    }`}
                  >
                    {/* Project image placeholder */}
                    <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <Folder className="h-16 w-16 text-primary/40" />
                        </motion.div>
                      </div>
                      {/* Project number badge */}
                      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-card/90 font-display text-lg font-bold text-primary backdrop-blur-sm">
                        {project.id}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="mb-2 font-display text-xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {project.problem}
                      </p>

                      {/* Tech stack */}
                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-3">
                        <motion.a
                          href={project.liveUrl}
                          className="btn-primary flex-1 justify-center text-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          className="btn-secondary flex-1 justify-center text-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;