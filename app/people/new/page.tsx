"use client"

import React from 'react'
import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { useTheme } from 'next-themes'
import MainLayout from '@/app/components/layout/main-layout'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Tag,
  Upload
} from "lucide-react"

const roles = [
  { value: 'member', label: 'Member' },
  { value: 'leader', label: 'Ministry Leader' },
  { value: 'staff', label: 'Staff' },
  { value: 'admin', label: 'Administrator' },
]

const groups = [
  { value: 'youth', label: 'Youth Group' },
  { value: 'choir', label: 'Choir' },
  { value: 'prayer', label: 'Prayer Team' },
  { value: 'womens', label: 'Women\'s Ministry' },
]

export default function NewMemberPage() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    birthDate: '',
    joinDate: new Date().toISOString().split('T')[0],
    role: '',
    groups: [] as string[],
  })
  const { theme } = useTheme()
  const router = useRouter()
  const isDarkMode = theme === 'dark'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    // Redirect back to people page
    router.push('/people')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <MainLayout>
      <ScrollArea className="flex-1">
        <div className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="rounded-full"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-3xl font-bold">Add New Member</h1>
            </div>
            <Button
              onClick={handleSubmit}
              className={`rounded-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Member
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile Photo */}
                  <div className="md:col-span-2 flex justify-center">
                    <div className="space-y-4 text-center">
                      <div className={`w-32 h-32 rounded-full mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center`}>
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                      <Button variant="outline" className="rounded-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Basic Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">First Name</label>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Last Name</label>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 rounded-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Additional Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="pl-10 rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">City</label>
                          <Input
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">State</label>
                          <Input
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">ZIP Code</label>
                        <Input
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Church Information */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Church Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Role</label>
                        <Select
                          onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                        >
                          <SelectTrigger className="rounded-lg">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map(role => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Groups</label>
                        <Select
                          onValueChange={(value) => setFormData(prev => ({ ...prev, groups: [...prev.groups, value] }))}
                        >
                          <SelectTrigger className="rounded-lg">
                            <SelectValue placeholder="Select groups" />
                          </SelectTrigger>
                          <SelectContent>
                            {groups.map(group => (
                              <SelectItem key={group.value} value={group.value}>
                                {group.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {formData.groups.map(group => (
                            <div
                              key={group}
                              className={`px-2 py-1 rounded-full text-xs ${
                                isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                              }`}
                            >
                              {groups.find(g => g.value === group)?.label}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Birth Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            name="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className="pl-10 rounded-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Join Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            name="joinDate"
                            type="date"
                            value={formData.joinDate}
                            onChange={handleInputChange}
                            className="pl-10 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </form>
        </div>
      </ScrollArea>
    </MainLayout>
  )
} 