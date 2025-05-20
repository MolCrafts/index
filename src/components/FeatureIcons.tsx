import { FC } from "react";

interface IconProps {
  className?: string;
}

export const SimulationIcon: FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 7L17 17" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const AnalysisIcon: FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 21H4C3.44772 21 3 20.5523 3 20V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 14L11 10L14 13L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="14" r="1" fill="currentColor" />
    <circle cx="11" cy="10" r="1" fill="currentColor" />
    <circle cx="14" cy="13" r="1" fill="currentColor" />
    <circle cx="18" cy="9" r="1" fill="currentColor" />
  </svg>
);

export const WorkflowIcon: FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.5 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17.5 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 17.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const DataIcon: FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 8C16.4183 8 20 6.65685 20 5C20 3.34315 16.4183 2 12 2C7.58172 2 4 3.34315 4 5C4 6.65685 7.58172 8 12 8Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const CollaborationIcon: FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 8V9C7 10.1046 7.89543 11 9 11H15C16.1046 11 17 10.1046 17 9V8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 13V11" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IntegrationIcon: FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 11L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="8" cy="16" r="1" fill="currentColor" />
    <circle cx="16" cy="16" r="1" fill="currentColor" />
  </svg>
); 