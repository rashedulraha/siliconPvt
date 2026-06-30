import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionContainerProps<T extends React.ElementType = "div"> {
  /**
   * The HTML element or React component to render the container as.
   * @default "div"
   */
  as?: T;
  /**
   * The content to be rendered inside the container.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes to merge with the default container styles.
   */
  className?: string;
}

/**
 * SectionContainer
 *
 * The single source of truth for the website's global responsive width alignment.
 *
 * Responsive Matrix:
 * - `w-full`: Fully fluid on mobile, preventing overflows.
 * - `max-w-7xl`: Enforces a premium 1280px layout grid at high-res displays.
 * - `mx-auto`: Centers the container.
 * - `px-4 sm:px-6 lg:px-8`: Adaptive padding to ensure breathing room on all screens.
 */
export function SectionContainer<T extends React.ElementType = "div">({
  as,
  children,
  className,
  ...props
}: SectionContainerProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof SectionContainerProps<T>>) {
  const Component = as || "div";

  return (
    <Component
      className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...props}>
      {children}
    </Component>
  );
}
