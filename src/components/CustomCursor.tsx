import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 24);
      cursorY.set(e.clientY - 24);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          'a, button, [role="button"], input, textarea, select'
        )
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  const safeHSL = (variable: string, fallback: string) =>
    `hsl(var(${variable}, ${fallback}))`;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{ scale: isHovering ? 1.3 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <svg
          width={48}
          height={48}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_10px_hsl(var(--primary)/0.8)]"
        >
          {/* Energy shield */}
          <motion.circle
            cx={24}
            cy={24}
            r={22}
            fill="none"
            stroke={safeHSL("--primary", "200,100%,50%")}
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={0.4}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />

          {/* Outer hex shield */}
          <motion.path
            d="M24 4 L40 12 L40 28 L24 36 L8 28 L8 12 Z"
            fill={`${safeHSL("--primary", "200,100%,50%")}/0.1`}
            stroke={safeHSL("--primary", "200,100%,50%")}
            strokeWidth={1.5}
            animate={{ strokeOpacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Head */}
          <rect
            x={14}
            y={10}
            width={20}
            height={18}
            rx={3}
            fill={safeHSL("--card", "0,0%,90%")}
            stroke={safeHSL("--primary", "200,100%,50%")}
            strokeWidth={2}
          />

          {/* Visor */}
          <motion.rect
            x={16}
            y={14}
            width={16}
            height={6}
            rx={1}
            fill={safeHSL("--primary", "200,100%,50%")}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />

          {/* Eyes – FIXED (no cx animation) */}
          <motion.circle
            cx={20}
            cy={17}
            r={2}
            fill={safeHSL("--background", "0,0%,100%")}
            animate={{ x: [-1, 1, -1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx={28}
            cy={17}
            r={2}
            fill={safeHSL("--background", "0,0%,100%")}
            animate={{ x: [1, -1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Antenna */}
          <motion.g
            animate={{ y: [-1, 1, -1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <rect x={18} y={5} width={2} height={6} rx={1} fill={safeHSL("--muted-foreground", "0,0%,50%")} />
            <motion.circle
              cx={19}
              cy={4}
              r={2}
              fill={safeHSL("--primary", "200,100%,50%")}
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <rect x={28} y={5} width={2} height={6} rx={1} fill={safeHSL("--muted-foreground", "0,0%,50%")} />
            <motion.circle
              cx={29}
              cy={4}
              r={2}
              fill={safeHSL("--accent", "340,100%,50%")}
              animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </motion.g>

          {/* Energy core */}
          <motion.circle
            cx={24}
            cy={31}
            r={2}
            fill={safeHSL("--primary", "200,100%,50%")}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />

          {/* Hover reticle */}
          {isHovering && (
            <motion.circle
              cx={24}
              cy={24}
              r={18}
              fill="none"
              stroke={safeHSL("--destructive", "0,100%,50%")}
              strokeWidth={1}
              strokeDasharray="8 4"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "center" }}
            />
          )}
        </svg>
      </motion.div>

      {/* Glow */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <motion.div
          className="h-12 w-12 rounded-full"
          style={{
            background: `radial-gradient(circle, ${safeHSL(
              "--primary",
              "200,100%,50%"
            )}/0.3 0%, transparent 70%)`,
          }}
          animate={{ scale: isHovering ? 1.5 : 1 }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
