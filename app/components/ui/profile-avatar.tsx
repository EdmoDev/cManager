"use client"

import * as React from 'react'
import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Button } from "@/app/components/ui/button"
import { useTheme } from 'next-themes'
import { 
  User,
  Settings,
  LogOut,
  HelpCircle,
  Bell,
  Moon,
  Sun
} from 'lucide-react'

interface ProfileAvatarProps {
  user?: {
    name?: string
    email?: string
    image?: string
  }
  showStatus?: boolean
  size?: 'sm' | 'md' | 'lg'
  onSignOut?: () => void
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12'
}

export function ProfileAvatar({ 
  user, 
  showStatus = true, 
  size = 'md',
  onSignOut 
}: ProfileAvatarProps) {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark'

  // Get initials from name
  const initials = user?.name
    ? user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    : 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-8 w-8 rounded-full p-0"
        >
          <Avatar className={cn(
            sizeClasses[size],
            "ring-2 ring-blue-500 ring-offset-2 transition-all duration-200",
            isDarkMode ? "ring-offset-black" : "ring-offset-gray-50",
            "hover:scale-105"
          )}>
            <AvatarImage
              src={user?.image}
              alt={user?.name || "User avatar"}
              className="object-cover"
            />
            <AvatarFallback 
              className={cn(
                "bg-blue-500 text-white font-medium",
                "animate-in fade-in-50 duration-300"
              )}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          {showStatus && (
            <span className={cn(
              "absolute top-0 right-0 w-2 h-2 rounded-full",
              "bg-blue-500",
              "ring-1 ring-white dark:ring-black",
              "transition-transform duration-200",
              "hover:scale-110"
            )} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className={cn(
          "w-56 p-1",
          isDarkMode ? "bg-[#111] border-gray-800" : "bg-white",
          "animate-in fade-in-50 zoom-in-95",
          "shadow-lg"
        )} 
        align="end" 
        forceMount
      >
        <DropdownMenuLabel className="font-normal px-2 py-1.5">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem className="rounded-md cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-md cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-md cursor-pointer">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
            className="rounded-md cursor-pointer"
          >
            {isDarkMode ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-md cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help</span>
            <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-1" />
        <div className="p-1">
          <DropdownMenuItem 
            onClick={onSignOut}
            className={cn(
              "rounded-md cursor-pointer",
              isDarkMode 
                ? "text-red-400 hover:bg-red-500/10" 
                : "text-red-600 hover:bg-red-50"
            )}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 