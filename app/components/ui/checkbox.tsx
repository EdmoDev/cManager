'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm',
      'border border-gray-200 bg-white',
      'focus:outline-none focus:ring-2 focus:ring-gray-200',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-gray-900 data-[state=checked]:text-white',
      'dark:border-gray-800/10 dark:bg-black',
      'dark:focus:ring-gray-800',
      'dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-black',
      'transition-colors duration-300',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className='h-3.5 w-3.5' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };