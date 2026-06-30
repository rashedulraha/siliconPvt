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
 * A standardized, responsive layout container wrapper.
 * Enforces a unified horizontal width grid (`container mx-auto px-4 sm:px-6 lg:px-8`)
 * across the application to maintain perfect alignment.
 */
export function SectionContainer<T extends React.ElementType = "div">({
  as,
  children,
  className,
  ...props
}: SectionContainerProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof SectionContainerProps<T>>) {
  const Component = as || "div";

  return (
    <Component
      className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
