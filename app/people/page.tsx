"use client"

import React from 'react'
import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { useTheme } from 'next-themes'
import MainLayout from '@/app/components/layout/main-layout'
import {
  UserPlus,
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Tag,
  UserCog,
  Trash,
  Download
} from "lucide-react"

interface Member {
  id: string
  name: string
  email: string
  phone: string
  address: string
  joinDate: string
  status: 'active' | 'inactive'
  role: string
  groups: string[]
  avatar?: string
  ministry?: string[]
  attendance?: {
    last3Months: number
    total: number
  }
  skills?: string[]
  familyMembers?: string[]
}

const members: Member[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, City, State',
    joinDate: '2023-01-15',
    status: 'active',
    role: 'Member',
    groups: ['Youth Group', 'Choir'],
    ministry: ['Worship', 'Youth'],
    attendance: {
      last3Months: 10,
      total: 45
    },
    skills: ['Music', 'Teaching'],
    familyMembers: ['Sarah Smith', 'Tommy Smith']
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 234-5678',
    address: '456 Oak Ave, City, State',
    joinDate: '2023-03-20',
    status: 'active',
    role: 'Ministry Leader',
    groups: ['Prayer Team', 'Women\'s Ministry'],
  },
  // Add more members...
]

const groups = [
  { id: '1', name: 'Youth Group', members: 45 },
  { id: '2', name: 'Choir', members: 20 },
  { id: '3', name: 'Prayer Team', members: 30 },
  { id: '4', name: 'Women\'s Ministry', members: 25 },
]

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedTab, setSelectedTab] = React.useState('members')
  const [filterStatus, setFilterStatus] = React.useState<'all' | 'active' | 'inactive'>('all')
  const [selectedGroup, setSelectedGroup] = React.useState<string | null>(null)
  const { theme } = useTheme()

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' ? true : member.status === filterStatus
    const matchesGroup = !selectedGroup ? true : member.groups.includes(selectedGroup)
    
    return matchesSearch && matchesStatus && matchesGroup
  })

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">People</h1>
            <p className="text-muted-foreground">Manage church members and groups</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => {}}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => {}}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Person
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="members">
              <Users className="w-4 h-4 mr-2" />
              Members
            </TabsTrigger>
            <TabsTrigger value="groups">
              <Tag className="w-4 h-4 mr-2" />
              Groups
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setFilterStatus('all')}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('active')}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('inactive')}>Inactive</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Groups</DropdownMenuLabel>
                {groups.map(group => (
                  <DropdownMenuItem key={group.id} onClick={() => setSelectedGroup(group.name)}>
                    {group.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <TabsContent value="members" className="space-y-4">
            <div className="grid gap-4">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground gap-4">
                          <span className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {member.email}
                          </span>
                          <span className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {member.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <UserCog className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>Manage Groups</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="w-4 h-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.groups.map((group) => (
                      <Badge key={group} variant="secondary">
                        {group}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <Card key={group.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.members} members</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Group</DropdownMenuItem>
                        <DropdownMenuItem>Manage Members</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="w-4 h-4 mr-2" />
                          Delete Group
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}