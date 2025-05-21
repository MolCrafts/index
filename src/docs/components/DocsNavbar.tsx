import React from "react";
import { motion } from "framer-motion";
import { DocTheme } from "../DocumentationLayout";
import { ModeToggle } from "../../components/mode-toggle";
import { LogoIcon } from "../../components/Icons";
import { ChevronLeft } from "lucide-react";

interface DocsNavbarProps {
  theme: DocTheme;
}

export const DocsNavbar: React.FC<DocsNavbarProps> = ({ theme }) => {
  const themeStyles = {
    molpy: {
      accent: "text-blue-600 dark:text-blue-400",
      hover: "hover:text-blue-700 dark:hover:text-blue-300",
      border: "border-blue-200 dark:border-blue-800"
    },
    molplot: {
      accent: "text-green-600 dark:text-green-400",
      hover: "hover:text-green-700 dark:hover:text-green-300",
      border: "border-green-200 dark:border-green-800"
    },
    molvis: {
      accent: "text-purple-600 dark:text-purple-400",
      hover: "hover:text-purple-700 dark:hover:text-purple-300",
      border: "border-purple-200 dark:border-purple-800"
    }
  };

  const styles = themeStyles[theme];
  const title = theme.charAt(0).toUpperCase() + theme.slice(1);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b ${styles.border} py-3`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <motion.a
            href="/"
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ x: -5 }}
          >
            <ChevronLeft size={20} />
            <span className="font-medium">Home</span>
          </motion.a>

          <div className="flex items-center space-x-3">
            <LogoIcon />
            <span className={`font-bold text-lg ${styles.accent}`}>{title} Documentation</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex space-x-3">
            <motion.a 
              href="/docs/molpy" 
              className={`text-sm font-medium ${theme === "molpy" ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"}`}
              whileHover={{ y: -2 }}
            >
              MolPy
            </motion.a>
            <motion.a 
              href="/docs/molplot" 
              className={`text-sm font-medium ${theme === "molplot" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
              whileHover={{ y: -2 }}
            >
              MolPlot
            </motion.a>
            <motion.a 
              href="/docs/molvis" 
              className={`text-sm font-medium ${theme === "molvis" ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"}`}
              whileHover={{ y: -2 }}
            >
              MolVis
            </motion.a>
          </div>
          <ModeToggle />
        </div>
      </div>
    </motion.header>
  );
}; 