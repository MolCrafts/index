import React from "react";
import { DocTheme } from "../DocumentationLayout";

interface DocButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: DocTheme;
  variant?: "solid" | "outline";
  children: React.ReactNode;
}

export const DocButton: React.FC<DocButtonProps> = ({
  theme,
  variant = "solid",
  children,
  className,
  ...props
}) => {
  const themeConfig = {
    molpy: {
      solid: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
      outline: "border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
    },
    molpot: {
      solid: "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
      outline: "border-green-200 text-green-600 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20"
    },
    molvis: {
      solid: "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600",
      outline: "border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
    }
  };

  const styles = themeConfig[theme];
  const variantStyle = styles[variant];

  return (
    <button
      className={`px-4 py-2 rounded-md transition-colors duration-200 ${
        variant === "outline" ? "border-2" : ""
      } ${variantStyle} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}; 