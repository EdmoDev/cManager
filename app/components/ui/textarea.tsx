import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md text-sm",
          "bg-white text-gray-900 border border-gray-200",
          "placeholder:text-gray-500",
          "focus:outline-none focus:ring-2 focus:ring-gray-200",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-black dark:text-white dark:border-gray-800/10",
          "dark:placeholder:text-gray-500",
          "dark:focus:ring-gray-800",
          "dark:focus:bg-[#111]",
          "transition-colors duration-300",
          "px-3 py-2",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
