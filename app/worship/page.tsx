"use client"

import React from 'react'
import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { useTheme } from 'next-themes'
import MainLayout from '@/app/components/layout/main-layout'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import {
  MusicIcon,
  GripVertical,
  Clock,
  User,
  Plus
} from "lucide-react"

interface Song {
  id: string
  title: string
  key: string
  duration: string
  leader: string
}

const initialSongs: Song[] = [
  {
    id: '1',
    title: "Amazing Grace",
    key: "G",
    duration: "4:30",
    leader: "John Doe"
  },
  {
    id: '2',
    title: "How Great Is Our God",
    key: "C",
    duration: "5:00",
    leader: "Jane Smith"
  }
]

export default function WorshipPage() {
  const [songs, setSongs] = React.useState(initialSongs)
  const [activeTab, setActiveTab] = React.useState('planning')
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    
    const items = Array.from(songs)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    
    setSongs(items)
  }

  return (
    <MainLayout>
      <ScrollArea className="flex-1">
        <div className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Worship</h1>
          </div>

          <Tabs defaultValue="planning" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className={`grid w-full grid-cols-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-1`}>
              <TabsTrigger value="planning">Service Planning</TabsTrigger>
              <TabsTrigger value="songs">Song Library</TabsTrigger>
              <TabsTrigger value="teams">Team Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="planning" className="space-y-4">
              <Card className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">Sunday Service</h2>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>March 10, 2024</p>
                    </div>
                    <Button 
                      onClick={() => {/* Handle add song */}}
                      className={`rounded-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Song
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium px-4">
                      <div className="col-span-1"></div>
                      <div className="col-span-5">Song</div>
                      <div className="col-span-2">Key</div>
                      <div className="col-span-2">Duration</div>
                      <div className="col-span-2">Leader</div>
                    </div>

                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="songs">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                            {songs.map((song, index) => (
                              <Draggable key={song.id} draggableId={song.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}
                                  >
                                    <div className="col-span-1" {...provided.dragHandleProps}>
                                      <GripVertical className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div className="col-span-5 flex items-center space-x-3">
                                      <MusicIcon className="w-4 h-4 text-blue-500" />
                                      <span>{song.title}</span>
                                    </div>
                                    <div className="col-span-2">{song.key}</div>
                                    <div className="col-span-2 flex items-center space-x-2">
                                      <Clock className="w-4 h-4 text-gray-400" />
                                      <span>{song.duration}</span>
                                    </div>
                                    <div className="col-span-2 flex items-center space-x-2">
                                      <User className="w-4 h-4 text-gray-400" />
                                      <span>{song.leader}</span>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="songs">
              {/* Song Library Content */}
            </TabsContent>

            <TabsContent value="teams">
              {/* Team Schedule Content */}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </MainLayout>
  )
}