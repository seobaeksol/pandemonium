import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "severe" | "progress" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-white text-[#4c5c66] border-line",
    severe: "bg-rose-50 text-rose-700 border-rose-200",
    progress: "bg-amber-50 text-amber-700 border-amber-200",
    outline: "bg-transparent text-muted border-line",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
