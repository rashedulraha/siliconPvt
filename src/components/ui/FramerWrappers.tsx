"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

// Custom premium Apple/Stripe-style cubic-bezier curve
export const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]; // ultra-smooth easeOutExpo

interface FadeInSlideUpProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

/**
 * Text/Typography Animation wrapper: Fade-in + subtle Slide-up
 */
export const FadeInSlideUp: React.FC<FadeInSlideUpProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 15,
  className,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ease: PREMIUM_EASE,
        duration: duration,
        delay: delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
}

/**
 * Container wrapper for Staggered animations
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.06,
  delayChildren = 0,
  className,
  ...props
}) => {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  yOffset?: number;
  duration?: number;
}

/**
 * Item wrapper for elements inside a StaggerContainer
 */
export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  yOffset = 15,
  duration = 0.6,
  className,
  ...props
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: PREMIUM_EASE,
        duration: duration,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
};

interface PremiumHoverCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  glowColor?: string;
  glowIntensity?: string;
}

/**
 * PremiumHoverCard wrapper: Adds micro-scaling and gold/amber border glow
 */
export const PremiumHoverCard: React.FC<PremiumHoverCardProps> = ({
  children,
  glowColor = "rgba(245, 158, 11, 0.25)", // default gold/amber accent
  glowIntensity = "0 8px 30px -10px",
  className,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        borderColor: "rgba(245, 158, 11, 0.4)",
        boxShadow: `${glowIntensity} ${glowColor}`,
      }}
      transition={{
        ease: PREMIUM_EASE,
        duration: 0.4,
      }}
      className={`transition-colors duration-300 [--card-spacing:1.5rem] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
