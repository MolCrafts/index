import React, { ReactNode } from "react";
import { DocTheme } from "../DocumentationLayout";

interface DocCardProps {
  theme: DocTheme;
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const DocCard: React.FC<DocCardProps> = ({
  theme,
  title,
  children,
  icon
}) => {
  const themeStyles = {
    molpy: {
      border: "border-blue-200 dark:border-blue-800",
      heading: "text-blue-700 dark:text-blue-300",
      bg: "bg-white dark:bg-slate-900",
      shadow: "shadow-blue-100 dark:shadow-none"
    },
    molplot: {
      border: "border-green-200 dark:border-green-800",
      heading: "text-green-700 dark:text-green-300",
      bg: "bg-white dark:bg-slate-900",
      shadow: "shadow-green-100 dark:shadow-none"
    },
    molvis: {
      border: "border-purple-200 dark:border-purple-800",
      heading: "text-purple-700 dark:text-purple-300",
      bg: "bg-white dark:bg-slate-900",
      shadow: "shadow-purple-100 dark:shadow-none"
    }
  };

  const styles = themeStyles[theme];

  return (
    <div className={`p-6 rounded-lg border ${styles.border} ${styles.bg} shadow-md ${styles.shadow} dark:shadow-md dark:shadow-black/5`}>
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className={`text-xl ${styles.heading}`}>
            {icon}
          </div>
        )}
        <h3 className={`text-xl font-semibold ${styles.heading}`}>
          {title}
        </h3>
      </div>
      <div className="text-gray-600 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}; 