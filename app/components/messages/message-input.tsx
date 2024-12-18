"use client"

import React from 'react'
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { useTheme } from 'next-themes'
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  FileText,
  Smile,
  Mic,
  X
} from "lucide-react"

interface Attachment {
  id: string
  file: File
  preview?: string
  type: 'image' | 'file'
}

interface MessageInputProps {
  onSend: (content: string, attachments: Attachment[]) => void
  placeholder?: string
  disabled?: boolean
}

export function MessageInput({ onSend, placeholder = "Type a message...", disabled }: MessageInputProps) {
  const [content, setContent] = React.useState('')
  const [attachments, setAttachments] = React.useState<Attachment[]>([])
  const [isRecording, setIsRecording] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = () => {
    if (content.trim() || attachments.length > 0) {
      onSend(content, attachments)
      setContent('')
      setAttachments([])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newAttachments = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }))
    setAttachments(prev => [...prev, ...newAttachments])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const attachment = prev.find(a => a.id === id)
      if (attachment?.preview) {
        URL.revokeObjectURL(attachment.preview)
      }
      return prev.filter(a => a.id !== id)
    })
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items)
    const files = items
      .filter(item => item.kind === 'file')
      .map(item => item.getAsFile())
      .filter((file): file is File => file !== null)

    if (files.length > 0) {
      const newAttachments = files.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
      }))
      setAttachments(prev => [...prev, ...newAttachments])
    }
  }

  return (
    <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {attachments.map(attachment => (
            <div
              key={attachment.id}
              className={`relative group rounded-lg overflow-hidden ${
                attachment.type === 'image' ? 'w-20 h-20' : 'flex items-center p-2 bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {attachment.type === 'image' ? (
                <>
                  <img
                    src={attachment.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </>) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  <span className="text-sm truncate">{attachment.file.name}</span>
                </>
              )}
              <button
                onClick={() => removeAttachment(attachment.id)}
                className={`absolute top-1 right-1 p-1 rounded-full ${
                  attachment.type === 'image'
                    ? 'bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100'
                    : 'bg-gray-200 dark:bg-gray-700'
                } transition-opacity`}
                title="Remove attachment"
                aria-label="Remove attachment"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            placeholder={placeholder}
            disabled={disabled}
            className={`min-h-[20px] max-h-[200px] resize-none rounded-lg ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            } border-none`}
            rows={1}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx,.txt"
            title="Upload files"
            aria-label="Upload files"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                title="Add attachment"
              >
                <Paperclip className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                <FileText className="w-4 h-4 mr-2" />
                Upload File
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            title="Add emoji"
          >
            <Smile className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${isRecording ? 'text-red-500' : ''}`}
            onClick={() => setIsRecording(!isRecording)}
            title={isRecording ? 'Stop recording' : 'Start voice message'}
          >
            <Mic className="w-5 h-5" />
          </Button>

          <Button
            onClick={handleSend}
            disabled={disabled || (!content.trim() && attachments.length === 0)}
            className={`rounded-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 