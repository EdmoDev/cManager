import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-black text-white shadow hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
        secondary:
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        destructive:
          "border-transparent bg-red-500 text-white shadow hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
        outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
        success:
          "border-transparent bg-green-500 text-white shadow hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700",
        warning:
          "border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700",
        info:
          "border-transparent bg-gray-500 text-white shadow hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700",
        gradient:
          "border-transparent bg-gradient-to-r from-gray-500 to-black text-white shadow hover:from-gray-600 hover:to-black/90 dark:from-white dark:to-gray-200 dark:text-black dark:hover:from-white/90 dark:hover:to-gray-300",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, className }))} {...props} />
  )
}

export { Badge, badgeVariants }