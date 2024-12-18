"use client"

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      variant: {
        default: 'bg-gray-50 text-gray-600 ring-gray-500/10',
        primary: 'bg-blue-50 text-blue-700 ring-blue-700/10',
        success: 'bg-green-50 text-green-700 ring-green-600/20',
        warning: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
        danger: 'bg-red-50 text-red-700 ring-red-600/10',
        info: 'bg-blue-50 text-blue-700 ring-blue-700/10',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-sm',
      },
      state: {
        solid: '',
        outline: 'bg-transparent',
        soft: 'ring-0',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      state: 'solid'
    },
    compoundVariants: [
      // Outline variants
      {
        variant: 'default',
        state: 'outline',
        className: 'text-gray-600 ring-gray-200',
      },
      {
        variant: 'primary',
        state: 'outline',
        className: isDarkMode ? 'text-white ring-white/30' : 'text-black ring-black/20',
      },
      {
        variant: 'success',
        state: 'outline',
        className: 'text-green-700 ring-green-200',
      },
      {
        variant: 'warning',
        state: 'outline',
        className: 'text-yellow-800 ring-yellow-200',
      },
      {
        variant: 'danger',
        state: 'outline',
        className: 'text-red-700 ring-red-200',
      },
      {
        variant: 'info',
        state: 'outline',
        className: isDarkMode ? 'text-white ring-white/30' : 'text-black ring-black/20',
      },
      // Soft variants
      {
        variant: 'default',
        state: 'soft',
        className: 'bg-gray-50 text-gray-600',
      },
      {
        variant: 'primary',
        state: 'soft',
        className: isDarkMode ? 'bg-white/20 text-white' : 'bg-black/10 text-black',
      },
      {
        variant: 'success',
        state: 'soft',
        className: 'bg-green-50 text-green-700',
      },
      {
        variant: 'warning',
        state: 'soft',
        className: 'bg-yellow-50 text-yellow-800',
      },
      {
        variant: 'danger',
        state: 'soft',
        className: 'bg-red-50 text-red-700',
      },
      {
        variant: 'info',
        state: 'soft',
        className: isDarkMode ? 'bg-white/20 text-white' : 'bg-black/10 text-black',
      },
    ],
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  icon?: React.ReactNode
  pulse?: boolean
  dot?: boolean
}

export function StatusBadge({
  className,
  variant,
  size,
  state,
  icon,
  pulse,
  dot,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={cn(statusBadgeVariants({ variant, size, state }), className)}
      {...props}
    >
      {icon && <span className="mr-1.5 -ml-0.5 h-3.5 w-3.5">{icon}</span>}
      {dot && (
        <span
          className={cn(
            'mr-1.5 -ml-0.5 h-1.5 w-1.5 rounded-full',
            {
              'animate-pulse': pulse,
              'bg-gray-400': variant === 'default',
              'bg-blue-400': variant === 'primary',
              'bg-green-400': variant === 'success',
              'bg-yellow-400': variant === 'warning',
              'bg-red-400': variant === 'danger',
              'bg-blue-400': variant === 'info',
            }
          )}
        />
      )}
      {children}
    </span>
  )
}

// Predefined status badges for common use cases
export function OnlineStatusBadge({ className, ...props }: Omit<StatusBadgeProps, 'variant' | 'children'>) {
  return (
    <StatusBadge
      variant="success"
      state="soft"
      dot
      pulse
      className={cn('gap-x-1.5', className)}
      {...props}
    >
      Online
    </StatusBadge>
  )
}

export function OfflineStatusBadge({ className, ...props }: Omit<StatusBadgeProps, 'variant' | 'children'>) {
  return (
    <StatusBadge
      variant="default"
      state="soft"
      dot
      className={cn('gap-x-1.5', className)}
      {...props}
    >
      Offline
    </StatusBadge>
  )
}

export function PendingStatusBadge({ className, ...props }: Omit<StatusBadgeProps, 'variant' | 'children'>) {
  return (
    <StatusBadge
      variant="warning"
      state="soft"
      dot
      pulse
      className={cn('gap-x-1.5', className)}
      {...props}
    >
      Pending
    </StatusBadge>
  )
}

export function ActiveStatusBadge({ className, ...props }: Omit<StatusBadgeProps, 'variant' | 'children'>) {
  return (
    <StatusBadge
      variant="success"
      state="soft"
      dot
      className={cn('gap-x-1.5', className)}
      {...props}
    >
      Active
    </StatusBadge>
  )
}

export function InactiveStatusBadge({ className, ...props }: Omit<StatusBadgeProps, 'variant' | 'children'>) {
  return (
    <StatusBadge
      variant="default"
      state="soft"
      dot
      className={cn('gap-x-1.5', className)}
      {...props}
    >
      Inactive
    </StatusBadge>
  )
}

export function ErrorStatusBadge({ className, ...props }: Omit<StatusBadgeProps, 'variant' | 'children'>) {
  return (
    <StatusBadge
      variant="danger"
      state="soft"
      dot
      className={cn('gap-x-1.5', className)}
      {...props}
    >
      Error
    </StatusBadge>
  )
}

export function DraftStatusBadge({ className, ...props }: Omit<StatusBadgeProps, 'variant' | 'children'>) {
  return (
    <StatusBadge
      variant="default"
      state="soft"
      className={cn('gap-x-1.5', className)}
      {...props}
    >
      Draft
    </StatusBadge>
  )
}

export function PublishedStatusBadge({ className, ...props }: Omit<StatusBadgeProps, 'variant' | 'children'>) {
  return (
    <StatusBadge
      variant="success"
      state="soft"
      className={cn('gap-x-1.5', className)}
      {...props}
    >
      Published
    </StatusBadge>
  )
}

export function ScheduledStatusBadge({ className, ...props }: Omit<StatusBadgeProps, 'variant' | 'children'>) {
  return (
    <StatusBadge
      variant="primary"
      state="soft"
      className={cn('gap-x-1.5', className)}
      {...props}
    >
      Scheduled
    </StatusBadge>
  )
}

export function ArchivedStatusBadge({ className, ...props }: Omit<StatusBadgeProps, 'variant' | 'children'>) {
  return (
    <StatusBadge
      variant="default"
      state="soft"
      className={cn('gap-x-1.5', className)}
      {...props}
    >
      Archived
    </StatusBadge>
  )
}

export function DeletedStatusBadge({ className, ...props }: Omit<StatusBadgeProps, 'variant' | 'children'>) {
  return (
    <StatusBadge
      variant="danger"
      state="soft"
      className={cn('gap-x-1.5', className)}
      {...props}
    >
      Deleted
    </StatusBadge>
  )
} 