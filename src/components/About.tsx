import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Layers, Zap, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, readable, and efficient code",
  },
  {
    icon: Layers,
    title: "Architecture",
    description: "Designing scalable and robust system structures",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing for speed and user experience",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively in team environments",
  },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!statsRef.current) return;

    const ctx = gsap.context(() => {
      // Animate stats numbers
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((stat) => {
        const endValue = parseInt(stat.getAttribute("data-value") || "0");
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: endValue,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Highlight cards stagger animation
      gsap.fromTo(
        ".highlight-card",
        { opacity: 0, y: 40, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".highlights-grid",
            start: "top 80%",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          {/* Section header */}
          <div className="mb-16 text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-block font-mono text-sm font-medium text-primary"
            >
              // ABOUT_ME
            </motion.span>
            <h2 className="section-title">About Me</h2>
          </div>

          {/* Main content */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm a <span className="font-medium text-foreground">Computer Science undergraduate</span> passionate
                about building software that makes a difference. My focus is on
                creating systems that are{" "}
                <span className="font-medium text-primary">reliable</span>,{" "}
                <span className="font-medium text-primary">scalable</span>, and{" "}
                <span className="font-medium text-primary">performant</span>.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I believe in clean architecture and maintainable code. Every
                project I work on reflects my commitment to end-to-end system
                thinking—from data structures to user interfaces to the overall
                user experience.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                When I'm not coding, I'm exploring new technologies, solving
                algorithmic challenges, or contributing to open-source projects
                that align with my interests.
              </p>

              {/* Stats */}
              <div ref={statsRef} className="flex gap-8 pt-4">
                <div>
                  <div 
                    className="stat-number font-display text-3xl font-bold text-foreground"
                    data-value="2"
                  >
                    0
                  </div>
                  <div className="text-sm text-muted-foreground">Years Learning</div>
                </div>
                <div>
                  <div 
                    className="stat-number font-display text-3xl font-bold text-foreground"
                    data-value="10"
                  >
                    0
                  </div>
                  <div className="text-sm text-muted-foreground">Projects Built</div>
                </div>
                <div>
                  <div 
                    className="stat-number font-display text-3xl font-bold text-foreground"
                    data-value="5"
                  >
                    0
                  </div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
              </div>
            </motion.div>

            {/* Highlights grid */}
            <div className="highlights-grid grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="highlight-card skill-card group"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1 font-display font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;