import React, { ReactNode } from "react";
import { DocTheme } from "../DocumentationLayout";

interface DocSectionProps {
  theme: DocTheme;
  id: string;
  title: string;
  children: ReactNode;
}

export const DocSection: React.FC<DocSectionProps> = ({
  theme,
  id,
  title,
  children,
}) => {
  const themeStyles = {
    molpy: {
      heading: "text-blue-700 dark:text-blue-300",
      border: "border-blue-200 dark:border-blue-800"
    },
    molplot: {
      heading: "text-green-700 dark:text-green-300",
      border: "border-green-200 dark:border-green-800"
    },
    molvis: {
      heading: "text-purple-700 dark:text-purple-300",
      border: "border-purple-200 dark:border-purple-800"
    }
  };

  const styles = themeStyles[theme];

  return (
    <section id={id} className={`mb-12 pb-8 border-b ${styles.border}`}>
      <h2 className={`text-2xl font-semibold mb-6 ${styles.heading}`}>
        {title}
      </h2>
      <div className="prose max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground">
        {children}
      </div>
    </section>
  );
}; 