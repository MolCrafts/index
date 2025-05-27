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
  const themeConfig = {
    molpy: {
      textColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    molpot: {
      textColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-200 dark:border-green-800"
    },
    molvis: {
      textColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800"
    }
  };

  const styles = themeConfig[theme];

  return (
    <section id={id} className={`mb-12 pb-8 border-b ${styles.borderColor}`}>
      <h2 className={`text-2xl font-semibold mb-6 ${styles.textColor}`}>
        {title}
      </h2>
      <div className="prose max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground">
        {children}
      </div>
    </section>
  );
}; 