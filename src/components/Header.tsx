import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const Header = () => {
  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  /* ================= LOGO MOTION ================= */
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(x, { stiffness: 120, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(dx * 10);
    y.set(dy * -10);
  };

  /* ================= SCROLL ACTIVE ================= */
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);

      for (const link of [...navLinks].reverse()) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < 160) {
          setActive(link.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ height: isScrolled ? 64 : 88 }}
      transition={{ duration: 0.35 }}
      className="
        fixed top-0 left-0 right-0 z-50
        bg-background/70 backdrop-blur-xl
        border-b border-border/40
        px-8
        flex items-center
      "
    >
      {/* ================= LOGO ================= */}
      <motion.div
        className="flex items-center justify-center"
        style={{ perspective: 1200 }}
        onMouseMove={handleMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        animate={{ scale: isScrolled ? 0.9 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* GLOWING CIRCLE */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(255,46,46,0.4)",
              "0 0 45px rgba(255,46,46,0.9)",
              "0 0 20px rgba(255,46,46,0.4)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            flex items-center justify-center
            rounded-full
            border border-red-500/60
            w-20 h-20 md:w-24 md:h-24
          "
        >
          {/* LOGO IMAGE */}
          <motion.img
            src="shreyansh.png"
            alt="Logo"
            draggable={false}
            style={{ rotateX, rotateY }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="
              w-14 h-14 md:w-16 md:h-16
              object-contain
              select-none
              pointer-events-none
              bg-transparent
            "
          />
        </motion.div>
      </motion.div>

      {/* ================= NAV ================= */}
      <nav className="ml-auto flex items-center">
        <ul className="flex gap-10">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <a
                href={`#${link.id}`}
                className={`relative text-sm font-medium transition-colors ${
                  active === link.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}

                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="
                      absolute -bottom-2 left-0
                      h-[2px] w-full
                      bg-primary rounded-full
                    "
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;
