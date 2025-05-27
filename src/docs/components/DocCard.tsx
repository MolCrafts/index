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
  const themeConfig = {
    molpy: {
      textColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800",
      bg: "bg-white dark:bg-slate-900",
      shadow: "shadow-blue-100 dark:shadow-none"
    },
    molpot: {
      textColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-200 dark:border-green-800",
      bg: "bg-white dark:bg-slate-900",
      shadow: "shadow-green-100 dark:shadow-none"
    },
    molvis: {
      textColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800",
      bg: "bg-white dark:bg-slate-900",
      shadow: "shadow-purple-100 dark:shadow-none"
    }
  };

  const styles = themeConfig[theme];

  return (
    <div className={`p-6 rounded-lg border ${styles.borderColor} ${styles.bg} shadow-md ${styles.shadow} dark:shadow-md dark:shadow-black/5`}>
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className={`text-xl ${styles.textColor}`}>
            {icon}
          </div>
        )}
        <h3 className={`text-xl font-semibold ${styles.textColor}`}>
          {title}
        </h3>
      </div>
      <div className="text-gray-600 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}; 