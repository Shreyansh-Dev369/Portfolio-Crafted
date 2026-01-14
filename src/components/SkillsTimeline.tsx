import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Terminal, Globe, Database, Brain, Server, Sparkles, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  title: string;
  description: string;
  skills: string[];
  icon: React.ElementType;
  level: number;
}

const milestones: Milestone[] = [
  {
    year: "2023",
    title: "CS Foundations",
    description: "Mastered core programming concepts and problem-solving fundamentals",
    skills: ["JavaScript", "TypeScript", "DSA", "OOP", "Problem Solving"],
    icon: Terminal,
    level: 1,
  },
  {
    year: "2023-2024",
    title: "Frontend Engineering",
    description: "Built interactive, responsive, and accessible user interfaces",
    skills: ["React", "Next.js", "Tailwind CSS", "Responsive Design", "Accessibility"],
    icon: Globe,
    level: 2,
  },
  {
    year: "2024",
    title: "Backend & Databases",
    description: "Developed server-side logic and database architectures",
    skills: ["Node.js", "Express", "SQL/NoSQL", "Authentication", "System Design"],
    icon: Database,
    level: 3,
  },
  {
    year: "2024-2025",
    title: "AI/ML Fundamentals",
    description: "Explored machine learning concepts and data analysis",
    skills: ["Python", "ML Basics", "Data Analysis", "Analytical Thinking"],
    icon: Brain,
    level: 4,
  },
  {
    year: "2025-Present",
    title: "Full-Stack & SDE Prep",
    description: "Combining all skills for production-ready applications",
    skills: ["Full-Stack Dev", "CI/CD", "Cloud", "Testing", "Clean Architecture"],
    icon: Server,
    level: 5,
  },
];

// UFO Component - Enhanced
const UFO = () => (
  <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="beamGradient" x1="50" y1="35" x2="50" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(152 60% 50%)" stopOpacity="0.6"/>
        <stop offset="1" stopColor="hsl(152 60% 50%)" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="ufoBody" x1="50" y1="12" x2="50" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(var(--muted))"/>
        <stop offset="1" stopColor="hsl(var(--border))"/>
      </linearGradient>
      <linearGradient id="ufoDome" x1="50" y1="0" x2="50" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(var(--primary))"/>
        <stop offset="1" stopColor="hsl(var(--accent))"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Tractor beam */}
    <path d="M35 32 L28 60 L72 60 L65 32" fill="url(#beamGradient)" opacity="0.4"/>
    
    {/* Main body disc */}
    <ellipse cx="50" cy="26" rx="35" ry="10" fill="url(#ufoBody)" filter="url(#glow)"/>
    
    {/* Body rim with glow */}
    <ellipse cx="50" cy="26" rx="35" ry="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.6"/>
    
    {/* Dome */}
    <ellipse cx="50" cy="18" rx="18" ry="14" fill="url(#ufoDome)" filter="url(#glow)"/>
    <ellipse cx="50" cy="18" rx="18" ry="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.8"/>
    
    {/* Dome highlight */}
    <ellipse cx="44" cy="14" rx="6" ry="4" fill="white" opacity="0.3"/>
    
    {/* Rotating lights ring */}
    <g>
      <circle cx="22" cy="26" r="4" fill="hsl(var(--primary))" filter="url(#glow)">
        <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="36" cy="30" r="3" fill="hsl(45 90% 55%)" filter="url(#glow)">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50" cy="32" r="3" fill="hsl(var(--primary))" filter="url(#glow)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="0.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="64" cy="30" r="3" fill="hsl(45 90% 55%)" filter="url(#glow)">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="78" cy="26" r="4" fill="hsl(var(--primary))" filter="url(#glow)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="0.9s" repeatCount="indefinite"/>
      </circle>
    </g>
    
    {/* Antenna */}
    <line x1="50" y1="4" x2="50" y2="0" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5"/>
    <circle cx="50" cy="0" r="2" fill="hsl(var(--primary))">
      <animate attributeName="r" values="2;3;2" dur="1s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

// Explosion Component
const Explosion = () => (
  <motion.div className="relative">
    {/* Core explosion */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute left-1/2 top-1/2"
        initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
        animate={{
          x: Math.cos((i * 30 * Math.PI) / 180) * 100,
          y: Math.sin((i * 30 * Math.PI) / 180) * 100,
          scale: [0, 1.5, 0],
          opacity: [1, 0.8, 0],
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-orange-400 via-yellow-400 to-red-500" />
      </motion.div>
    ))}
    
    {/* Secondary sparks */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={`spark-${i}`}
        className="absolute left-1/2 top-1/2"
        initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
        animate={{
          x: Math.cos(((i * 45 + 22.5) * Math.PI) / 180) * 60,
          y: Math.sin(((i * 45 + 22.5) * Math.PI) / 180) * 60,
          scale: [0, 1, 0],
          opacity: [1, 0.6, 0],
        }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 0.7,
        }}
      >
        <Star className="h-3 w-3 text-yellow-400" />
      </motion.div>
    ))}

    {/* Center glow */}
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 2, 1.5, 2], opacity: [0, 1, 0.8, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="h-16 w-16 rounded-full bg-gradient-radial from-yellow-300 via-orange-400 to-transparent blur-md" />
    </motion.div>
    
    {/* Rocket icon emerging from explosion */}
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <Rocket className="h-8 w-8 text-primary" />
    </motion.div>
  </motion.div>
);

// Trail dot component for spaceship trail
interface TrailDot {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

const SkillsTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [showExplosion, setShowExplosion] = useState(false);
  const [ufoVisible, setUfoVisible] = useState(true);
  const [trailDots, setTrailDots] = useState<TrailDot[]>([]);
  const lastDotPositionRef = useRef({ x: 0, y: 0 });
  const dotIdRef = useRef(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Move all useTransform hooks to top level - slower, full range scroll mapping
  const ufoRotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 10, -10, 10, 0]);
  // Full scroll range - UFO moves from top to bottom as you scroll through the entire section
  const ufoTop = useTransform(scrollYProgress, [0, 0.85], ["0%", "90%"]);
  // Zigzag movement across the screen
  const ufoLeft = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 0.85], ["20%", "70%", "25%", "70%", "25%", "50%"]);

  // Track active milestone and add trail dots
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const milestoneIndex = Math.min(Math.floor(latest * 6), 5);
    setActiveMilestone(milestoneIndex);
    
    // Trigger explosion when reaching the end (after level 5)
    if (latest > 0.88) {
      setShowExplosion(true);
      setUfoVisible(false);
    } else {
      setShowExplosion(false);
      setUfoVisible(true);
    }

    // Calculate UFO position for trail dots
    if (containerRef.current && latest < 0.88) {
      const topPercent = (latest / 0.85) * 90;
      const leftProgress = latest / 0.85;
      let leftPercent = 20;
      
      if (leftProgress <= 0.235) {
        leftPercent = 20 + (leftProgress / 0.235) * 50;
      } else if (leftProgress <= 0.47) {
        leftPercent = 70 - ((leftProgress - 0.235) / 0.235) * 45;
      } else if (leftProgress <= 0.705) {
        leftPercent = 25 + ((leftProgress - 0.47) / 0.235) * 45;
      } else if (leftProgress <= 0.94) {
        leftPercent = 70 - ((leftProgress - 0.705) / 0.235) * 45;
      } else {
        leftPercent = 25 + ((leftProgress - 0.94) / 0.06) * 25;
      }

      const dx = leftPercent - lastDotPositionRef.current.x;
      const dy = topPercent - lastDotPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Add dot every 2% movement for smoother trail
      if (distance > 2) {
        const newDot: TrailDot = {
          id: dotIdRef.current++,
          x: leftPercent,
          y: topPercent,
          opacity: 1,
        };
        
        setTrailDots(prev => {
          const updated = [...prev, newDot].slice(-25); // Keep last 25 dots
          return updated;
        });
        
        lastDotPositionRef.current = { x: leftPercent, y: topPercent };
      }
    }
  });

  // Fade out trail dots over time
  useEffect(() => {
    const interval = setInterval(() => {
      setTrailDots(prev => 
        prev
          .map(dot => ({ ...dot, opacity: dot.opacity - 0.05 }))
          .filter(dot => dot.opacity > 0)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate milestone cards on scroll
      gsap.utils.toArray<HTMLElement>(".milestone-card").forEach((card) => {
        const isLeft = card.classList.contains("milestone-left");
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            x: isLeft ? -100 : 100,
            rotateY: isLeft ? -15 : 15
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate skill tags
      gsap.utils.toArray<HTMLElement>(".skill-tag-anim").forEach((tag) => {
        gsap.fromTo(
          tag,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: tag,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Calculate opacity for each milestone based on active state
  const getMilestoneOpacity = (index: number) => {
    if (index === activeMilestone) return 1;
    if (index < activeMilestone) {
      // Fade previous levels
      const distance = activeMilestone - index;
      return Math.max(0.3, 1 - distance * 0.2);
    }
    // Upcoming levels are slightly dimmed
    return 0.6;
  };

  const getMilestoneScale = (index: number) => {
    if (index === activeMilestone) return 1;
    if (index < activeMilestone) {
      return 0.95;
    }
    return 0.98;
  };

  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block font-mono text-sm font-medium text-primary"
          >
            // SKILLS_JOURNEY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Skills Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-muted-foreground"
          >
            Navigating through the galaxy of technologies, leveling up skills
            one milestone at a time
          </motion.p>
        </div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative mx-auto max-w-5xl">
          {/* Vertical center line - hidden */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border/30 to-transparent opacity-30" />
          
          {/* Trail dots behind spaceship */}
          {trailDots.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute z-10 pointer-events-none"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 1, opacity: dot.opacity }}
              animate={{ opacity: dot.opacity }}
            >
              <div 
                className="h-3 w-3 rounded-full bg-primary shadow-lg shadow-primary/50"
                style={{ opacity: dot.opacity }}
              />
            </motion.div>
          ))}

          {/* UFO - visible until level 5 */}
          <AnimatePresence>
            {ufoVisible && (
              <motion.div
                className="absolute z-20"
                style={{ 
                  top: ufoTop,
                  left: ufoLeft,
                  rotate: ufoRotate,
                }}
                exit={{ 
                  scale: 0,
                  opacity: 0,
                  transition: { duration: 0.5 }
                }}
              >
                <motion.div
                  animate={{
                    y: [-8, 8, -8],
                    x: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <UFO />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Milestones */}
          <div className="relative space-y-24 py-20">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              const opacity = getMilestoneOpacity(index);
              const scale = getMilestoneScale(index);
              const isActive = index === activeMilestone;
              
              return (
                <motion.div
                  key={milestone.year}
                  className={`milestone-card ${isLeft ? 'milestone-left' : 'milestone-right'} relative flex items-center ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                  animate={{ 
                    opacity,
                    scale,
                    filter: isActive ? "blur(0px)" : `blur(${Math.abs(activeMilestone - index) * 0.5}px)`
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* Center dot indicator */}
                  <motion.div 
                    className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      scale: isActive ? [1, 1.3, 1] : 1,
                      boxShadow: isActive 
                        ? ["0 0 0 0 hsla(var(--primary), 0.4)", "0 0 0 20px hsla(var(--primary), 0)", "0 0 0 0 hsla(var(--primary), 0.4)"]
                        : "none"
                    }}
                    transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                  >
                    <div className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                      isActive 
                        ? "border-primary bg-primary shadow-lg shadow-primary/50" 
                        : index < activeMilestone 
                          ? "border-primary/50 bg-primary/30" 
                          : "border-muted-foreground/30 bg-background"
                    }`} />
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`skill-card group w-full max-w-md transition-all duration-500 ${isLeft ? "mr-auto pr-8" : "ml-auto pl-8"} ${
                      isActive ? "ring-2 ring-primary/30 shadow-xl shadow-primary/10" : ""
                    }`}
                  >
                    {/* Level badge */}
                    <div className={`mb-3 flex items-center gap-2 ${isLeft ? "justify-start" : "justify-end"}`}>
                      <motion.span 
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${
                          isActive 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-primary/10 text-primary"
                        }`}
                        animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Star className="h-3 w-3" />
                        Level {milestone.level}
                      </motion.span>
                    </div>

                    {/* Icon */}
                    <div className={`mb-3 flex ${isLeft ? "justify-start" : "justify-end"}`}>
                      <motion.div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground transition-all duration-300 ${
                          isActive ? "shadow-lg shadow-primary/30" : ""
                        }`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        animate={isActive ? { y: [-2, 2, -2] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <milestone.icon className="h-7 w-7" />
                      </motion.div>
                    </div>

                    {/* Year */}
                    <span className={`block font-mono text-sm text-primary ${isLeft ? "text-left" : "text-right"}`}>
                      {milestone.year}
                    </span>

                    {/* Title */}
                    <h3 className={`mt-1 font-display text-xl font-bold text-foreground ${isLeft ? "text-left" : "text-right"}`}>
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className={`mt-2 text-sm text-muted-foreground ${isLeft ? "text-left" : "text-right"}`}>
                      {milestone.description}
                    </p>

                    {/* Skills */}
                    <div className={`mt-4 flex flex-wrap gap-2 ${isLeft ? "justify-start" : "justify-end"}`}>
                      {milestone.skills.map((skill, skillIndex) => (
                        <motion.span 
                          key={skill} 
                          className={`skill-tag-anim tech-tag transition-all duration-300 ${
                            isActive ? "bg-primary/20 border-primary/40" : ""
                          }`}
                          style={{ animationDelay: `${skillIndex * 0.1}s` }}
                          animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                          transition={{ duration: 1.5, delay: skillIndex * 0.1, repeat: Infinity }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Final destination - Mission Active with Explosion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              className="flex justify-center pt-8"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-2xl" />
                
                {/* Explosion effect */}
                <AnimatePresence>
                  {showExplosion && (
                    <motion.div
                      className="absolute -top-20 left-1/2 z-30 -translate-x-1/2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <Explosion />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.div 
                  className={`relative flex flex-col items-center gap-4 rounded-3xl border-2 bg-card p-8 text-center shadow-xl transition-all duration-500 ${
                    showExplosion 
                      ? "border-orange-400/50 shadow-orange-400/20" 
                      : "border-primary/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  animate={showExplosion ? {
                    boxShadow: [
                      "0 0 0 0 hsla(30, 100%, 50%, 0)",
                      "0 0 60px 20px hsla(30, 100%, 50%, 0.3)",
                      "0 0 0 0 hsla(30, 100%, 50%, 0)",
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div 
                    className={`flex h-20 w-20 items-center justify-center rounded-2xl text-primary-foreground transition-all duration-500 ${
                      showExplosion 
                        ? "bg-gradient-to-br from-orange-400 via-yellow-400 to-red-500" 
                        : "bg-gradient-to-br from-primary to-accent"
                    }`}
                    animate={showExplosion ? { 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    } : { 
                      rotate: [0, 5, -5, 0] 
                    }}
                    transition={{ duration: showExplosion ? 2 : 4, repeat: Infinity }}
                  >
                    {showExplosion ? (
                      <Rocket className="h-10 w-10" />
                    ) : (
                      <Sparkles className="h-10 w-10" />
                    )}
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {showExplosion ? "🚀 Mission: Launched!" : "Mission: Active"}
                  </h3>
                  <p className="max-w-sm text-muted-foreground">
                    {showExplosion 
                      ? "Spaceship has blasted off! Ready to conquer new frontiers!" 
                      : "Ready to apply all skills to build real-world, impactful projects"
                    }
                  </p>
                  <motion.div
                    className={`achievement-badge transition-all duration-300 ${
                      showExplosion ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white" : ""
                    }`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="h-4 w-4" />
                    {showExplosion ? "Liftoff Complete!" : "All Systems Operational"}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsTimeline;