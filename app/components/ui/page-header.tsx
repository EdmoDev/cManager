"use client"

import React from 'react'
import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { useTheme } from 'next-themes'
import { ChevronDown, MoreVertical } from 'lucide-react'

interface Action {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
}

interface PageHeaderProps {
  title: string
  description?: string
  primaryAction?: Action
  secondaryActions?: Action[]
  breadcrumbs?: Array<{
    label: string
    href?: string
  }>
}

export function PageHeader({
  title,
  description,
  primaryAction,
  secondaryActions = [],
  breadcrumbs = []
}: PageHeaderProps) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-800">
      {breadcrumbs.length > 0 && (
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.label}>
              {index > 0 && <ChevronDown className="w-4 h-4 transform rotate-[-90deg]" />}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {crumb.label}
                </a>
              ) : (
                <span>{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {secondaryActions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {secondaryActions.map((action) => (
                  <DropdownMenuItem
                    key={action.label}
                    onClick={action.onClick}
                  >
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              variant={primaryAction.variant}
              className="rounded-lg"
            >
              {primaryAction.icon && <span className="mr-2">{primaryAction.icon}</span>}
              {primaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
} 