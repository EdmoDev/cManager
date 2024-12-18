"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Separator } from "@/app/components/ui/separator"
import MainLayout from '@/app/components/layout/main-layout'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const ministrySchema = z.object({
  name: z.string().min(2, {
    message: "Ministry name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  leader: z.string().min(2, {
    message: "Leader name must be at least 2 characters.",
  }),
  leaderEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  type: z.string({
    required_error: "Please select a ministry type.",
  }),
  meetingDay: z.string({
    required_error: "Please select a meeting day.",
  }),
  meetingTime: z.string({
    required_error: "Please select a meeting time.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  capacity: z.string().regex(/^\d+$/, {
    message: "Capacity must be a number.",
  }),
})

const ministryTypes = [
  { value: "worship", label: "Worship" },
  { value: "youth", label: "Youth" },
  { value: "children", label: "Children" },
  { value: "prayer", label: "Prayer" },
  { value: "outreach", label: "Outreach" },
  { value: "discipleship", label: "Discipleship" },
  { value: "media", label: "Media" },
  { value: "other", label: "Other" },
]

const weekDays = [
  { value: "sunday", label: "Sunday" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
]

export default function NewMinistryPage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof ministrySchema>>({
    resolver: zodResolver(ministrySchema),
    defaultValues: {
      name: "",
      description: "",
      leader: "",
      leaderEmail: "",
      type: "",
      meetingDay: "",
      meetingTime: "",
      location: "",
      capacity: "",
    },
  })

  function onSubmit(values: z.infer<typeof ministrySchema>) {
    // TODO: Submit to API
    console.log(values)
    router.push('/ministries')
  }

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2" 
                asChild
              >
                <Link href="/ministries">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-4" />
              <h2 className="text-2xl font-bold tracking-tight">New Ministry</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Create a new ministry team or group.
            </p>
          </div>
        </div>

        <Card className="max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ministry Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Youth Ministry" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of your ministry team or group.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the purpose and goals of this ministry..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="leader"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ministry Leader</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="leaderEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Leader Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ministry Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ministryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="meetingDay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meeting Day</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {weekDays.map((day) => (
                              <SelectItem key={day.value} value={day.value}>
                                {day.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meetingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meeting Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Room 101" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit">Create Ministry</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push('/ministries')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </MainLayout>
  )
} 