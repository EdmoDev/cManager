"use client"

import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Progress } from "@/app/components/ui/progress"
import { Button } from "@/app/components/ui/button"
import { useTheme } from 'next-themes'
import {
  Upload,
  X,
  File,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react'

interface FileWithPreview extends File {
  preview?: string
}

interface UploadedFile {
  id: string
  file: FileWithPreview
  progress: number
  error?: string
  status: 'uploading' | 'success' | 'error'
}

interface MediaUploaderProps {
  accept?: Record<string, string[]>
  maxFiles?: number
  maxSize?: number
  multiple?: boolean
  onUpload?: (files: File[]) => Promise<void>
  onRemove?: (fileId: string) => void
  value?: UploadedFile[]
  onChange?: (files: UploadedFile[]) => void
  disabled?: boolean
  className?: string
}

export function MediaUploader({
  accept = {
    'image/*': [],
    'video/*': [],
    'audio/*': [],
    'application/pdf': [],
    'text/plain': [],
  },
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = true,
  onUpload,
  onRemove,
  value = [],
  onChange,
  disabled = false,
  className,
}: MediaUploaderProps) {
  const [files, setFiles] = React.useState<UploadedFile[]>(value)
  const [isDragActive, setIsDragActive] = React.useState(false)
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file: Object.assign(file, {
          preview: file.type.startsWith('image/')
            ? URL.createObjectURL(file)
            : undefined
        }),
        progress: 0,
        status: 'uploading' as const
      }))

      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles)
      setFiles(updatedFiles)
      onChange?.(updatedFiles)

      if (onUpload) {
        try {
          await onUpload(acceptedFiles)
          setFiles(prev =>
            prev.map(f =>
              newFiles.find(nf => nf.id === f.id)
                ? { ...f, status: 'success' as const, progress: 100 }
                : f
            )
          )
        } catch (error) {
          setFiles(prev =>
            prev.map(f =>
              newFiles.find(nf => nf.id === f.id)
                ? { ...f, status: 'error' as const, error: (error as Error).message }
                : f
            )
          )
        }
      }
    },
    [files, maxFiles, onChange, onUpload]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - files.length,
    maxSize,
    multiple,
    disabled,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  })

  const handleRemove = (id: string) => {
    const file = files.find(f => f.id === id)
    if (file?.file.preview) {
      URL.revokeObjectURL(file.file.preview)
    }
    setFiles(prev => prev.filter(f => f.id !== id))
    onRemove?.(id)
  }

  React.useEffect(() => {
    // Cleanup previews on unmount
    return () => files.forEach(file => {
      if (file.file.preview) {
        URL.revokeObjectURL(file.file.preview)
      }
    })
  }, [])

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon className="w-6 h-6" />
    if (file.type.startsWith('video/')) return <Video className="w-6 h-6" />
    if (file.type.startsWith('audio/')) return <Music className="w-6 h-6" />
    if (file.type === 'application/pdf') return <FileText className="w-6 h-6" />
    return <File className="w-6 h-6" />
  }

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="w-4 h-4 animate-spin" />
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`
          relative p-6 border-2 border-dashed rounded-lg text-center cursor-pointer
          transition-colors
          ${isDragActive
            ? isDarkMode
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-blue-500 bg-blue-50'
            : isDarkMode
              ? 'border-gray-700 hover:border-gray-600'
              : 'border-gray-300 hover:border-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <div className="flex justify-center">
            <Upload className={`w-12 h-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            <span className="font-medium">Click to upload</span> or drag and drop
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {Object.entries(accept)
              .map(([type, exts]) => {
                const label = type.split('/')[0]
                return exts.length > 0 ? `${label} (${exts.join(', ')})` : label
              })
              .join(', ')}
          </p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Up to {maxFiles} files, max {(maxSize / 1024 / 1024).toFixed(0)}MB each
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map(file => (
            <div
              key={file.id}
              className={`
                relative flex items-center p-3 rounded-lg
                ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}
              `}
            >
              {file.file.preview ? (
                <img
                  src={file.file.preview}
                  alt={file.file.name}
                  className="w-10 h-10 rounded object-cover"
                />
              ) : (
                <div className={`w-10 h-10 rounded flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {getFileIcon(file.file)}
                </div>
              )}
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {file.file.name}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {(file.file.size / 1024).toFixed(1)} KB
                </p>
                {file.status === 'uploading' && (
                  <Progress value={file.progress} className="h-1 mt-1" />
                )}
                {file.status === 'error' && (
                  <p className="text-xs text-red-500 mt-1">{file.error}</p>
                )}
              </div>
              <div className="ml-4 flex items-center space-x-2">
                {getStatusIcon(file.status)}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => handleRemove(file.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 