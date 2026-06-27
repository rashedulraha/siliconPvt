import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 bg-card p-6 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 select-none text-left",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-mono">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  "text-[10px] font-semibold px-2 py-0.5 rounded-full select-none",
                  trend.positive 
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                )}
              >
                {trend.positive ? "↑" : "↓"} {trend.value}
              </span>
            </div>
          )}
        </div>
        <div className="h-10 w-10 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center text-primary shrink-0">
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
    </div>
  );
}
