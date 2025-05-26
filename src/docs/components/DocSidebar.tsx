import React from "react";
import { DocTheme } from "../DocumentationLayout";

interface DocSidebarProps {
  theme: DocTheme;
  sections: {
    title: string;
    id: string;
  }[];
  activeSectionId: string;
  onSectionClick: (id: string) => void;
}

export const DocSidebar: React.FC<DocSidebarProps> = ({
  theme,
  sections,
  activeSectionId,
  onSectionClick,
}) => {
  const themeConfig = {
    molpy: {
      active: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20"
    },
    molpot: {
      active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      hover: "hover:bg-green-50 dark:hover:bg-green-900/20"
    },
    molvis: {
      active: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      hover: "hover:bg-purple-50 dark:hover:bg-purple-900/20"
    }
  };

  const styles = themeConfig[theme];

  return (
    <div className="w-64 pr-4">
      <nav className="sticky top-20">
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionClick(section.id)}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeSectionId === section.id 
                    ? styles.active
                    : `text-gray-600 dark:text-gray-300 ${styles.hover}`
                }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}; 