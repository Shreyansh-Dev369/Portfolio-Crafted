import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: "power4.out", delay: 0.3 }
      );

      // Subtitle slide in
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.6 }
      );

      // Description fade up
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.9 }
      );

      // Floating background orbs
      gsap.to(".hero-orb-1", {
        y: -30,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-orb-2", {
        y: 20,
        x: -30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@shreyansh.dev", label: "Email" },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Animated background orbs */}
      <div className="hero-orb-1 pointer-events-none absolute right-[15%] top-[20%] h-72 w-72 rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl" />
      <div className="hero-orb-2 pointer-events-none absolute bottom-[20%] left-[10%] h-56 w-56 rounded-full bg-gradient-to-tr from-accent/10 to-primary/5 blur-3xl" />

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Main headline with GSAP */}
        <h1
          ref={titleRef}
          className="mb-4 font-display text-4xl font-bold leading-tight tracking-tight text-foreground opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Hi, I'm{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Shreyansh Tripathi
            </span>
            <motion.span
              className="absolute -inset-1 -z-10 block rounded-lg bg-primary/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              style={{ transformOrigin: "left" }}
            />
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mb-6 font-display text-xl font-medium text-muted-foreground opacity-0 sm:text-2xl"
        >
          Aspiring Software Development Engineer
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground opacity-0 sm:text-lg"
        >
          I build scalable, performant, and maintainable web applications,
          focusing on clean architecture, efficient problem-solving, and
          real-world impact.
        </p>

        {/* CTA Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            variants={itemVariants}
            href="#projects"
            className="btn-primary group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </motion.a>
          <motion.a
            variants={itemVariants}
            href="#contact"
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              variants={itemVariants}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon group"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5 transition-colors group-hover:text-primary" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;