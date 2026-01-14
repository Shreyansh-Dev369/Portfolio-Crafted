import { motion } from "framer-motion";
import { Heart, Code2 } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-card/30 py-8">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-4 text-center"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear}</span>
            <span className="font-medium text-foreground">Shreyansh Tripathi</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-destructive" />
            <span>using</span>
            <Code2 className="h-3 w-3 text-primary" />
            <span className="font-medium">React, Tailwind CSS & Framer Motion</span>
          </div>

          <motion.div
            className="mt-2 font-mono text-xs text-primary/60"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {"// Let's build something amazing together"}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;