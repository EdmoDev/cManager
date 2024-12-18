"use client"

import React from 'react'
import { useTheme } from 'next-themes'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { RichTextEditor } from "@/app/components/ui/rich-text-editor"
import { MediaUploader } from "@/app/components/ui/media-uploader"
import { DataTable } from "@/app/components/ui/data-table"
import { FilterBar } from "@/app/components/ui/filter-bar"
import { PageHeader } from "@/app/components/ui/page-header"
import {
  StatusBadge,
  DraftStatusBadge,
  PublishedStatusBadge,
  ScheduledStatusBadge
} from "@/app/components/ui/status-badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import {
  Calendar,
  Clock,
  Music,
  Users,
  FileText,
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Share2
} from 'lucide-react'
import { usePlanningCenter } from '@/hooks/use-planning-center'

interface ServiceItem {
  id: string
  title: string
  type: 'song' | 'reading' | 'prayer' | 'sermon' | 'announcement' | 'other'
  duration: number
  assignedTo?: string[]
  notes?: string
  attachments?: string[]
  status: 'draft' | 'published' | 'scheduled'
}

interface ServicePlan {
  id: string
  title: string
  date: string
  time: string
  type: string
  items: ServiceItem[]
  teams: string[]
  status: 'draft' | 'published' | 'scheduled'
}

export function ServicePlanner() {
  const [selectedPlan, setSelectedPlan] = React.useState<ServicePlan | null>(null)
  const [isNewPlanDialogOpen, setIsNewPlanDialogOpen] = React.useState(false)
  const [isItemDialogOpen, setIsItemDialogOpen] = React.useState(false)
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  // Planning Center hooks
  const { data: serviceTypes } = usePlanningCenter.useServiceTypes()
  const { data: plans } = usePlanningCenter.usePlans(selectedPlan?.type || '')
  const { data: teams } = usePlanningCenter.useTeams(selectedPlan?.type || '')

  const columns = [
    {
      key: 'title',
      header: 'Title',
      cell: (row: ServicePlan) => (
        <div className="flex items-center space-x-2">
          <span className="font-medium">{row.title}</span>
          {row.status === 'draft' && <DraftStatusBadge />}
          {row.status === 'published' && <PublishedStatusBadge />}
          {row.status === 'scheduled' && <ScheduledStatusBadge />}
        </div>
      ),
      sortable: true
    },
    {
      key: 'date',
      header: 'Date',
      cell: (row: ServicePlan) => row.date,
      sortable: true
    },
    {
      key: 'time',
      header: 'Time',
      cell: (row: ServicePlan) => row.time
    },
    {
      key: 'type',
      header: 'Type',
      cell: (row: ServicePlan) => row.type
    },
    {
      key: 'teams',
      header: 'Teams',
      cell: (row: ServicePlan) => row.teams.join(', ')
    }
  ]

  const filters = [
    {
      id: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'scheduled', label: 'Scheduled' }
      ]
    },
    {
      id: 'type',
      label: 'Service Type',
      type: 'select' as const,
      options: serviceTypes?.map(type => ({
        value: type.id,
        label: type.attributes.name
      })) || []
    },
    {
      id: 'date',
      label: 'Date',
      type: 'date' as const
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Service Planning"
        description="Plan and organize church services"
        primaryAction={{
          label: 'New Service Plan',
          icon: <Plus className="w-4 h-4" />,
          onClick: () => setIsNewPlanDialogOpen(true)
        }}
        secondaryActions={[
          {
            label: 'Import from PCO',
            icon: <Download className="w-4 h-4" />,
            onClick: () => {/* Handle import */}
          },
          {
            label: 'Share',
            icon: <Share2 className="w-4 h-4" />,
            onClick: () => {/* Handle share */}
          },
          {
            label: 'Settings',
            icon: <Settings className="w-4 h-4" />,
            onClick: () => {/* Handle settings */}
          }
        ]}
      />

      <FilterBar
        filters={filters}
        onFilterChange={() => {/* Handle filter change */}}
        searchPlaceholder="Search service plans..."
      />

      <DataTable
        data={[]}
        columns={columns}
        searchable
        selectable
        pagination={{
          pageSize: 10,
          currentPage: 1,
          totalItems: 0,
          onPageChange: () => {/* Handle page change */}
        }}
        actions={[
          {
            label: 'Edit',
            onClick: (row) => setSelectedPlan(row)
          },
          {
            label: 'Duplicate',
            onClick: () => {/* Handle duplicate */}
          },
          {
            label: 'Delete',
            onClick: () => {/* Handle delete */}
          }
        ]}
      />

      {/* New Plan Dialog */}
      <Dialog open={isNewPlanDialogOpen} onOpenChange={setIsNewPlanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Service Plan</DialogTitle>
            <DialogDescription>
              Create a new service plan and start adding items
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input placeholder="Enter service title" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Time</label>
                <Input type="time" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Service Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes?.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.attributes.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Teams</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select teams" />
                </SelectTrigger>
                <SelectContent>
                  {teams?.map(team => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.attributes.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Notes</label>
              <RichTextEditor placeholder="Add service notes..." />
            </div>

            <div>
              <label className="text-sm font-medium">Attachments</label>
              <MediaUploader
                accept={{
                  'application/pdf': [],
                  'image/*': [],
                  'audio/*': []
                }}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsNewPlanDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => {/* Handle create */}}>
                Create Plan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Service Item Dialog */}
      <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Service Item</DialogTitle>
            <DialogDescription>
              Add a new item to the service plan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input placeholder="Enter item title" />
            </div>

            <div>
              <label className="text-sm font-medium">Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="song">Song</SelectItem>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="prayer">Prayer</SelectItem>
                  <SelectItem value="sermon">Sermon</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Duration (minutes)</label>
              <Input type="number" min="1" />
            </div>

            <div>
              <label className="text-sm font-medium">Assigned To</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select people" />
                </SelectTrigger>
                <SelectContent>
                  {/* Add team members */}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Notes</label>
              <RichTextEditor placeholder="Add item notes..." />
            </div>

            <div>
              <label className="text-sm font-medium">Attachments</label>
              <MediaUploader
                accept={{
                  'application/pdf': [],
                  'image/*': [],
                  'audio/*': []
                }}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsItemDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => {/* Handle add */}}>
                Add Item
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 