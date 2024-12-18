"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/app/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import MainLayout from '@/app/components/layout/main-layout'
import { Plus, Search, Users, CalendarDays, ArrowRight, Heart, BookOpen, Music, Hands } from 'lucide-react'
import Link from 'next/link'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { Separator } from '@/app/components/ui/separator'

const ministries = [
  {
    id: 1,
    name: "Youth Ministry",
    description: "Empowering young people through faith and fellowship",
    members: 45,
    nextEvent: "Youth Night - Friday 7PM",
    icon: Heart,
  },
  {
    id: 2,
    name: "Bible Study",
    description: "Deep dive into scripture and spiritual growth",
    members: 30,
    nextEvent: "Wednesday Bible Study - 6:30PM",
    icon: BookOpen,
  },
  {
    id: 3,
    name: "Worship Team",
    description: "Leading the congregation in praise and worship",
    members: 15,
    nextEvent: "Practice Session - Thursday 6PM",
    icon: Music,
  },
  {
    id: 4,
    name: "Outreach",
    description: "Serving our community and spreading God's love",
    members: 25,
    nextEvent: "Community Service - Saturday 9AM",
    icon: Hands,
  },
]

export default function MinistriesPage() {
  const router = useRouter()

  return (
    <MainLayout>
      <ScrollArea className="flex-1">
        <div className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Ministries</h1>
              <p className="text-muted-foreground">Manage and oversee all church ministries</p>
            </div>
            <Button onClick={() => router.push('/ministries/new')}>
              <Plus className="mr-2 h-4 w-4" /> New Ministry
            </Button>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search ministries..."
                className="max-w-sm"
                prefix={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ministries</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((ministry) => {
              const Icon = ministry.icon
              return (
                <Link key={ministry.id} href={`/ministries/${ministry.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle>{ministry.name}</CardTitle>
                      </div>
                      <CardDescription>{ministry.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{ministry.members} members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{ministry.nextEvent}</span>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  )
}