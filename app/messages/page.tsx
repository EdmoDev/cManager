"use client"

import React from 'react'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { useTheme } from 'next-themes'
import MainLayout from '@/app/components/layout/main-layout'
import { MessageBubble } from '@/app/components/messages/message-bubble'
import { MessageInput } from '@/app/components/messages/message-input'
import { Announcements } from '@/app/components/messages/announcements'
import { NewMessageDialog } from '@/app/components/messages/new-message-dialog'
import { NewAnnouncementDialog } from '@/app/components/messages/new-announcement-dialog'
import {
  PlusCircle,
  Search,
  Users,
  MessageCircle
} from 'lucide-react'

// Mock data for testing
const mockChats = [
  {
    id: '1',
    name: 'Youth Ministry Team',
    lastMessage: 'Next meeting agenda',
    timestamp: '10:30 AM',
    unread: 3,
    type: 'group',
    members: 12
  },
  {
    id: '2',
    name: 'John Smith',
    lastMessage: 'Can you help with...',
    timestamp: '9:45 AM',
    unread: 1,
    type: 'direct',
    online: true
  },
  {
    id: '3',
    name: 'Worship Team',
    lastMessage: 'Sunday service plan',
    timestamp: 'Yesterday',
    unread: 0,
    type: 'group',
    members: 8
  }
]

const mockMessages = [
  {
    id: '1',
    content: 'Hello everyone! Just a reminder about tomorrow\'s youth group meeting.',
    sender: {
      id: '1',
      name: 'John Smith',
      avatar: undefined
    },
    timestamp: '10:30 AM',
    isOwn: false,
    reactions: [
      { emoji: '👍', count: 3, users: ['1', '2', '3'] },
      { emoji: '🙏', count: 2, users: ['4', '5'] }
    ]
  },
  {
    id: '2',
    content: 'Thanks for the reminder! I\'ll be there.',
    sender: {
      id: '2',
      name: 'Current User',
      avatar: undefined
    },
    timestamp: '10:32 AM',
    isOwn: true
  },
  {
    id: '3',
    content: 'Don\'t forget to bring your study materials!',
    sender: {
      id: '1',
      name: 'John Smith',
      avatar: undefined
    },
    timestamp: '10:35 AM',
    isOwn: false,
    attachments: [
      {
        id: '1',
        type: 'file',
        name: 'study_guide.pdf',
        url: '#',
        size: '2.4 MB'
      }
    ]
  }
]

const mockAnnouncements = [
  {
    id: '1',
    title: 'Christmas Service Schedule',
    content: 'Join us for our special Christmas services! We\'ll have three services on Christmas Eve at 4 PM, 6 PM, and 8 PM, and two services on Christmas Day at 9 AM and 11 AM.',
    sender: {
      id: '1',
      name: 'Pastor David',
      role: 'Senior Pastor',
      avatar: undefined
    },
    timestamp: '2 hours ago',
    priority: 'high',
    isPinned: true,
    likes: 24,
    comments: 5,
    readBy: 156,
    totalRecipients: 250
  },
  {
    id: '2',
    title: 'Building Fund Update',
    content: 'We\'re excited to announce that we\'ve reached 80% of our building fund goal! Thank you for your generous contributions. We\'re planning to begin construction in the spring.',
    sender: {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Finance Committee',
      avatar: undefined
    },
    timestamp: '1 day ago',
    priority: 'medium',
    isPinned: false,
    likes: 45,
    comments: 12,
    readBy: 200,
    totalRecipients: 250
  }
]

export default function MessagesPage() {
  const [isNewMessageOpen, setIsNewMessageOpen] = React.useState(false)
  const [isNewAnnouncementOpen, setIsNewAnnouncementOpen] = React.useState(false)
  const [selectedChat, setSelectedChat] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState('')
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const handleSendMessage = (content: string, attachments: any[]) => {
    console.log('Sending message:', { content, attachments })
    // Handle sending message
  }

  const handleNewMessage = (members: any[], isGroup: boolean, groupName?: string) => {
    console.log('Starting new chat:', { members, isGroup, groupName })
    // Handle creating new chat
  }

  const handleNewAnnouncement = (data: any) => {
    console.log('Creating new announcement:', data)
    // Handle creating new announcement
  }

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)]">
        <Tabs defaultValue="messages" className="h-full">
          <TabsList className="w-full justify-start border-b rounded-none px-4 h-12">
            <TabsTrigger value="messages" className="rounded-full">Messages</TabsTrigger>
            <TabsTrigger value="announcements" className="rounded-full">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="h-[calc(100%-3rem)] m-0">
            <div className="h-full">
              <div className="flex h-full">
                {/* Sidebar */}
                <div className={`w-80 border-r ${isDarkMode ? 'border-gray-800 bg-[#111]' : 'border-gray-200 bg-white'}`}>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Messages</h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => setIsNewMessageOpen(true)}
                      >
                        <PlusCircle className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="relative mb-4">
                      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} w-4 h-4`} />
                      <Input
                        placeholder="Search messages..."
                        className={`pl-9 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} border-none rounded-full`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <ScrollArea className="h-[calc(100vh-12rem)]">
                      <div className="space-y-2">
                        {filteredChats.map((chat) => (
                          <div
                            key={chat.id}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedChat === chat.id
                                ? isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                                : isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedChat(chat.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <Avatar>
                                  {chat.type === 'group' ? (
                                    <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                      <Users className="w-4 h-4" />
                                    </div>
                                  ) : (
                                    <>
                                      <AvatarImage src={undefined} />
                                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                                    </>
                                  )}
                                </Avatar>
                                {'online' in chat && chat.online && (
                                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-medium truncate">{chat.name}</h3>
                                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {chat.timestamp}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <p className={`text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {chat.lastMessage}
                                  </p>
                                  {chat.unread > 0 && (
                                    <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                                      {chat.unread}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>

                {/* Main chat area */}
                {selectedChat ? (
                  <div className="flex-1 flex flex-col">
                    {/* Chat header */}
                    <div className={`h-16 px-6 flex items-center justify-between border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          {mockChats.find(c => c.id === selectedChat)?.type === 'group' ? (
                            <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                              <Users className="w-4 h-4" />
                            </div>
                          ) : (
                            <>
                              <AvatarImage src={undefined} />
                              <AvatarFallback>{mockChats.find(c => c.id === selectedChat)?.name[0]}</AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{mockChats.find(c => c.id === selectedChat)?.name}</h3>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {mockChats.find(c => c.id === selectedChat)?.type === 'group'
                              ? `${mockChats.find(c => c.id === selectedChat)?.members} members`
                              : 'Online'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-6">
                      {mockMessages.map(message => (
                        <MessageBubble
                          key={message.id}
                          {...message}
                          onReply={(id) => console.log('Reply to:', id)}
                          onReact={(id, emoji) => console.log('React:', id, emoji)}
                          onEdit={(id) => console.log('Edit:', id)}
                          onDelete={(id) => console.log('Delete:', id)}
                        />
                      ))}
                    </ScrollArea>

                    {/* Message input */}
                    <MessageInput onSend={handleSendMessage} />
                  </div>
                ) : (
                  // Empty state
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageCircle className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                      <h3 className="text-lg font-medium mb-2">No Chat Selected</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Choose a conversation or start a new one
                      </p>
                      <Button
                        className={`mt-4 rounded-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                        onClick={() => setIsNewMessageOpen(true)}
                      >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        New Message
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="h-[calc(100%-3rem)] m-0 p-4">
            <Announcements
              announcements={mockAnnouncements}
              onNewAnnouncement={() => setIsNewAnnouncementOpen(true)}
              onEdit={(id) => console.log('Edit announcement:', id)}
              onDelete={(id) => console.log('Delete announcement:', id)}
              onPin={(id) => console.log('Pin announcement:', id)}
              onLike={(id) => console.log('Like announcement:', id)}
              onComment={(id) => console.log('Comment on announcement:', id)}
            />
          </TabsContent>
        </Tabs>

        <NewMessageDialog
          open={isNewMessageOpen}
          onOpenChange={setIsNewMessageOpen}
          onStartChat={handleNewMessage}
        />

        <NewAnnouncementDialog
          open={isNewAnnouncementOpen}
          onOpenChange={setIsNewAnnouncementOpen}
          onSubmit={handleNewAnnouncement}
        />
      </div>
    </MainLayout>
  )
} 