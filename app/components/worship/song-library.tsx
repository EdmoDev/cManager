"use client"

import React from 'react'
import { Card, CardContent } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { useTheme } from 'next-themes'
import {
  MusicIcon,
  SearchIcon,
  PlusIcon,
  FilterIcon,
  BookOpenIcon
} from "lucide-react"

interface Song {
  id: number
  title: string
  artist: string
  key: string
  tempo: number
  lastPlayed: string
  category: string
}

const songs: Song[] = [
  {
    id: 1,
    title: "Amazing Grace",
    artist: "John Newton",
    key: "G",
    tempo: 70,
    lastPlayed: "2023-12-01",
    category: "Hymn"
  },
  {
    id: 2,
    title: "How Great is Our God",
    artist: "Chris Tomlin",
    key: "C",
    tempo: 78,
    lastPlayed: "2023-12-03",
    category: "Contemporary"
  },
  {
    id: 3,
    title: "10,000 Reasons",
    artist: "Matt Redman",
    key: "E",
    tempo: 73,
    lastPlayed: "2023-12-05",
    category: "Contemporary"
  }
]

export function SongLibrary() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SearchIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} w-4 h-4`} />
            <Input
              type="text"
              placeholder="Search songs..."
              className={`${isDarkMode ? 'bg-[#111] text-white' : 'bg-white text-gray-900'} border-none rounded-full pl-10 pr-4 py-1 w-64 text-sm focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className={`rounded-full ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}`}>
            <FilterIcon className="w-4 h-4" />
          </Button>
        </div>
        <Button className={`rounded-full ${isDarkMode ? 'bg-white/90 hover:bg-white text-black' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Song
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {filteredSongs.map(song => (
            <Card key={song.id} className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <MusicIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{song.title}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {song.artist}
                    </p>
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Key: {song.key}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {song.tempo} BPM
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {song.category}
                  </div>
                  <Button variant="ghost" size="sm" className={`${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-100'}`}>
                    <BookOpenIcon className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 