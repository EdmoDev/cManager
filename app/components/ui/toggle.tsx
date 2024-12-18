'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800/20 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: cn(
          'bg-transparent',
          'hover:bg-gray-100 hover:text-gray-900',
          'dark:text-gray-400 dark:hover:bg-[#111] dark:hover:text-white'
        ),
        outline: cn(
          'border border-gray-200',
          'hover:bg-gray-100 hover:text-gray-900',
          'dark:border-gray-800/10 dark:text-gray-400',
          'dark:hover:bg-[#111] dark:hover:text-white'
        ),
        ghost: cn(
          'hover:bg-gray-100',
          'dark:text-gray-400 dark:hover:bg-[#111] dark:hover:text-white',
          'data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900',
          'dark:data-[state=on]:bg-[#111] dark:data-[state=on]:text-white'
        ),
      },
      size: {
        default: 'h-9 px-3',
        sm: 'h-8 px-2.5',
        lg: 'h-10 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
