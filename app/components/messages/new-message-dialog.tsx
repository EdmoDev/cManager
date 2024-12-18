"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { useTheme } from 'next-themes'
import {
  Search,
  Users,
  UserPlus,
  Check,
  X
} from "lucide-react"

interface Member {
  id: string
  name: string
  role: string
  avatar?: string
  online?: boolean
}

interface NewMessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onStartChat: (members: Member[], isGroup: boolean, groupName?: string) => void
}

const members: Member[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Youth Pastor',
    online: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Worship Leader',
    online: true
  },
  {
    id: '3',
    name: 'Michael Brown',
    role: 'Elder',
    online: false
  }
]

export function NewMessageDialog({ open, onOpenChange, onStartChat }: NewMessageDialogProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedMembers, setSelectedMembers] = React.useState<Member[]>([])
  const [groupName, setGroupName] = React.useState('')
  const [isGroup, setIsGroup] = React.useState(false)
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleMember = (member: Member) => {
    setSelectedMembers(prev =>
      prev.some(m => m.id === member.id)
        ? prev.filter(m => m.id !== member.id)
        : [...prev, member]
    )
  }

  const handleStartChat = () => {
    onStartChat(selectedMembers, isGroup, isGroup ? groupName : undefined)
    onOpenChange(false)
    // Reset state
    setSelectedMembers([])
    setGroupName('')
    setIsGroup(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription>
            Start a conversation with members or create a group chat
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="direct" className="mt-4" onValueChange={(value) => setIsGroup(value === 'group')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="direct">Direct Message</TabsTrigger>
            <TabsTrigger value="group">Group Chat</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            {isGroup && (
              <div className="mb-4">
                <Input
                  placeholder="Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="rounded-lg"
                />
              </div>
            )}

            <div className="relative mb-4">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} w-4 h-4`} />
              <Input
                placeholder="Search members..."
                className="pl-9 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {selectedMembers.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedMembers.map(member => (
                  <div
                    key={member.id}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${
                      isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <span>{member.name}</span>
                    <button
                      onClick={() => toggleMember(member)}
                      className={`ml-1 p-0.5 rounded-full hover:bg-gray-700`}
                      title={`Remove ${member.name}`}
                      aria-label={`Remove ${member.name} from selection`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {filteredMembers.map(member => (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMembers.some(m => m.id === member.id)
                        ? isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                        : isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleMember(member)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        {member.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {member.role}
                        </p>
                      </div>
                    </div>
                    {selectedMembers.some(m => m.id === member.id) && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleStartChat}
                disabled={selectedMembers.length === 0 || (isGroup && !groupName)}
                className={`rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {isGroup ? 'Create Group' : 'Start Chat'}
              </Button>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 