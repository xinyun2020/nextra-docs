import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center border px-1.5 py-0.5 text-xs font-mono transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-black dark:border-white text-black dark:text-white",
        secondary:
          "bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground",
        destructive:
          "bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string;
  children?: React.ReactNode;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={`${badgeVariants({ variant })} ${className}`} {...props}>
      {props.children}
    </div>
  );
}

export { Badge, badgeVariants };
