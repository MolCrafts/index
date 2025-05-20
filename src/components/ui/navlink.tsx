import * as React from "react";
import { cn } from "@/lib/utils";

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <a
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          active && "text-foreground font-semibold",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink }; 