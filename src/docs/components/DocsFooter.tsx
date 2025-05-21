import React from "react";
import { motion } from "framer-motion";
import { DocTheme } from "../DocumentationLayout";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

interface DocsFooterProps {
  theme: DocTheme;
}

export const DocsFooter: React.FC<DocsFooterProps> = ({ theme }) => {
  const themeStyles = {
    molpy: {
      accent: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      link: "hover:text-blue-600 dark:hover:text-blue-400"
    },
    molplot: {
      accent: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      link: "hover:text-green-600 dark:hover:text-green-400"
    },
    molvis: {
      accent: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      link: "hover:text-purple-600 dark:hover:text-purple-400"
    }
  };

  const styles = themeStyles[theme];
  const currentYear = new Date().getFullYear();
  const title = theme.charAt(0).toUpperCase() + theme.slice(1);

  return (
    <footer className={`mt-12 border-t ${styles.border} py-8`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className={`font-semibold text-lg ${styles.accent}`}>{title} Documentation</h3>
            <p className="text-muted-foreground mt-2">
              Part of the MolCrafts open-source molecular sciences toolkit.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Other Documentation</h4>
            <ul className="space-y-2">
              {theme !== "molpy" && (
                <li>
                  <motion.a 
                    href="/docs/molpy" 
                    className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                    whileHover={{ x: 5 }}
                  >
                    MolPy Documentation
                  </motion.a>
                </li>
              )}
              {theme !== "molplot" && (
                <li>
                  <motion.a 
                    href="/docs/molplot" 
                    className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400"
                    whileHover={{ x: 5 }}
                  >
                    MolPlot Documentation
                  </motion.a>
                </li>
              )}
              {theme !== "molvis" && (
                <li>
                  <motion.a 
                    href="/docs/molvis" 
                    className="text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400"
                    whileHover={{ x: 5 }}
                  >
                    MolVis Documentation
                  </motion.a>
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <motion.a 
                  href="/" 
                  className={`text-muted-foreground ${styles.link}`}
                  whileHover={{ x: 5 }}
                >
                  Main Website
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="https://github.com/MolCrafts"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className={`text-muted-foreground ${styles.link} inline-flex items-center`}
                  whileHover={{ x: 5 }}
                >
                  <GitHubLogoIcon className="mr-2 h-4 w-4" />
                  GitHub Repository
                </motion.a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-muted text-center text-sm text-muted-foreground">
          © {currentYear} MolCrafts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}; 