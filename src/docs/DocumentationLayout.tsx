import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { DocsNavbar } from "./components/DocsNavbar";
import { DocsFooter } from "./components/DocsFooter";

export type DocTheme = "molpy" | "molpot" | "molvis";

interface DocumentationLayoutProps {
  children: ReactNode;
  theme: DocTheme;
}

export const DocumentationLayout: React.FC<DocumentationLayoutProps> = ({ 
  children,
  theme 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background dark:bg-background"
    >
      <DocsNavbar theme={theme} />
      
      <div className="pt-4">
        <div className="container mx-auto px-4">
          <main>
            {children}
          </main>
        </div>
      </div>
      
      <DocsFooter theme={theme} />
    </motion.div>
  );
}; 