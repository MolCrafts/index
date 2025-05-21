import React, { ButtonHTMLAttributes } from "react";
import { DocTheme } from "../DocumentationLayout";

interface DocButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: DocTheme;
  variant?: "primary" | "outline";
}

export const DocButton: React.FC<DocButtonProps> = ({
  theme,
  variant = "primary",
  children,
  className,
  ...props
}) => {
  const themeStyles = {
    molpy: {
      primary: "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600",
      outline: "border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950"
    },
    molplot: {
      primary: "bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600",
      outline: "border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-950"
    },
    molvis: {
      primary: "bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-600",
      outline: "border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950"
    }
  };

  const styles = themeStyles[theme];
  const variantStyle = styles[variant];

  return (
    <button
      className={`px-4 py-2 rounded-md transition-colors border ${variantStyle} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}; 