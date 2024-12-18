"use client"

import React from 'react'
import { Calendar } from "@/app/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { useTheme } from 'next-themes'
import MainLayout from '@/app/components/layout/main-layout'
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import { addDays, isSameDay } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus, ChevronRight, MoreVertical } from "lucide-react"
import "react-big-calendar/lib/css/react-big-calendar.css"

const locales = {
  "en-US": require("date-fns/locale/en-US"),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface Event {
  id: number
  title: string
  start: Date
  end: Date
  type: 'service' | 'youth' | 'prayer' | 'music' | 'study' | 'outreach' | 'meeting'
  location: string
  description?: string
  attendees?: Array<{
    id: number
    name: string
    role: string
  }>
  ministry?: string
  resources?: string[]
}

const events: Event[] = [
  {
    id: 1,
    title: "Sunday Service",
    start: new Date(2024, 2, 10, 9, 0),
    end: new Date(2024, 2, 10, 11, 0),
    type: "service",
    location: "Main Sanctuary",
    description: "Weekly Sunday worship service",
    attendees: [
      { id: 1, name: "John Smith", role: "Pastor" },
      { id: 2, name: "Sarah Johnson", role: "Worship Leader" },
    ],
    ministry: "Worship",
    resources: ["Projector", "Sound System"]
  },
  {
    id: 2,
    title: "Youth Ministry",
    start: new Date(2024, 2, 10, 16, 0),
    end: new Date(2024, 2, 10, 18, 0),
    type: "youth",
    location: "Youth Center",
    description: "Weekly youth gathering",
    attendees: [
      { id: 3, name: "Mike Wilson", role: "Youth Pastor" },
    ],
    ministry: "Youth"
  },
  {
    id: 3,
    title: "Prayer Meeting",
    start: new Date(2024, 2, 12, 19, 0),
    end: new Date(2024, 2, 12, 20, 0),
    type: "prayer",
    location: "Prayer Room",
    description: "Weekly prayer gathering",
    ministry: "Prayer"
  }
]

const eventTypeColors = {
  service: "bg-blue-500",
  youth: "bg-green-500",
  prayer: "bg-purple-500",
  music: "bg-yellow-500",
  study: "bg-indigo-500",
  outreach: "bg-red-500",
  meeting: "bg-gray-500"
}

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date>(new Date())
  const [view, setView] = React.useState(Views.MONTH)
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null)
  const [isEventDetailsOpen, setIsEventDetailsOpen] = React.useState(false)
  const [isAddEventOpen, setIsAddEventOpen] = React.useState(false)
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsEventDetailsOpen(true)
  }

  const EventDetails = ({ event }: { event: Event }) => (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className={`w-fit px-2 py-1 rounded-full text-white text-sm ${eventTypeColors[event.type]}`}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </div>
        <h2 className="text-2xl font-semibold">{event.title}</h2>
        {event.description && (
          <p className="text-muted-foreground">{event.description}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{format(event.start, 'MMMM d, yyyy')}</p>
            <p className="text-sm text-muted-foreground">
              {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <p>{event.location}</p>
        </div>

        {event.ministry && (
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-muted-foreground" />
            <p>{event.ministry} Ministry</p>
          </div>
        )}
      </div>

      {event.attendees && event.attendees.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">Attendees</h3>
          <div className="space-y-2">
            {event.attendees.map((attendee) => (
              <div key={attendee.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://avatar.vercel.sh/${attendee.name}`} />
                  <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{attendee.name}</p>
                  <p className="text-sm text-muted-foreground">{attendee.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.resources && event.resources.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">Resources</h3>
          <div className="flex flex-wrap gap-2">
            {event.resources.map((resource, index) => (
              <div
                key={index}
                className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
              >
                {resource}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <MainLayout>
      <ScrollArea className="flex-1">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Calendar</h1>
              <p className="text-muted-foreground">Manage church events and schedules</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => setIsAddEventOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calendar */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Events Calendar</CardTitle>
                    <CardDescription>View and manage all church events</CardDescription>
                  </div>
                  <Tabs defaultValue="month" className="w-[400px]">
                    <TabsList>
                      <TabsTrigger value="month">Month</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="day">Day</TabsTrigger>
                      <TabsTrigger value="agenda">Agenda</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <BigCalendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 700 }}
                  onSelectEvent={handleEventClick}
                  views={['month', 'week', 'day', 'agenda']}
                  view={view}
                  onView={setView}
                  date={date}
                  onNavigate={setDate}
                  eventPropGetter={(event) => ({
                    className: `${eventTypeColors[event.type as keyof typeof eventTypeColors]} text-white`
                  })}
                />
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Mini Calendar */}
              <Card>
                <CardContent className="p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events
                      .filter(event => 
                        event.start >= new Date() && 
                        event.start <= addDays(new Date(), 7)
                      )
                      .sort((a, b) => a.start.getTime() - b.start.getTime())
                      .map(event => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-secondary/50"
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="space-y-1">
                            <p className="font-medium">{event.title}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {format(event.start, isSameDay(event.start, new Date()) ? "'Today,' h:mm a" : "EEE, h:mm a")}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Event Details Dialog */}
      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && <EventDetails event={selectedEvent} />}
        </DialogContent>
      </Dialog>

      {/* Add Event Dialog */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>Create a new event in the calendar</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" placeholder="Enter event title" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="datetime-local" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="youth">Youth</SelectItem>
                  <SelectItem value="prayer">Prayer</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="study">Study</SelectItem>
                  <SelectItem value="outreach">Outreach</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="Enter event location" />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input placeholder="Enter event description" />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                Cancel
              </Button>
              <Button>Create Event</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}