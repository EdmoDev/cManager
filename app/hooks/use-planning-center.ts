import { useState, useEffect } from 'react'
import { PlanningCenterAPI } from '@/lib/planning-center'

// Initialize the API with environment variables
const api = new PlanningCenterAPI({
  applicationId: process.env.NEXT_PUBLIC_PCO_APP_ID || '',
  secret: process.env.NEXT_PUBLIC_PCO_SECRET || ''
})

interface UseQueryOptions {
  enabled?: boolean
  refetchInterval?: number
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

interface QueryResult<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  refetch: () => Promise<void>
}

interface MutationResult<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  mutate: (...args: any[]) => Promise<void>
}

// Cache for query results
const queryCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCacheKey(key: string, args: any[]): string {
  return `${key}:${JSON.stringify(args)}`
}

function getFromCache(key: string): any | null {
  const cached = queryCache.get(key)
  if (!cached) return null
  if (Date.now() - cached.timestamp > CACHE_TTL) {
    queryCache.delete(key)
    return null
  }
  return cached.data
}

function setCache(key: string, data: any): void {
  queryCache.set(key, { data, timestamp: Date.now() })
}

// Generic query hook
function useQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  options: UseQueryOptions = {}
): QueryResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const result = await queryFn()
      setData(result)
      setError(null)
      setCache(key, result)
      options.onSuccess?.(result)
    } catch (err) {
      setError(err as Error)
      options.onError?.(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (options.enabled === false) return

    const cached = getFromCache(key)
    if (cached) {
      setData(cached)
      setIsLoading(false)
      return
    }

    fetchData()

    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval)
      return () => clearInterval(interval)
    }
  }, [key, options.enabled, options.refetchInterval])

  return { data, error, isLoading, refetch: fetchData }
}

// Generic mutation hook
function useMutation<T, Args extends any[]>(
  mutationFn: (...args: Args) => Promise<T>,
  options: Omit<UseQueryOptions, 'enabled' | 'refetchInterval'> = {}
): MutationResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const mutate = async (...args: Args) => {
    try {
      setIsLoading(true)
      const result = await mutationFn(...args)
      setData(result)
      setError(null)
      options.onSuccess?.(result)
    } catch (err) {
      setError(err as Error)
      options.onError?.(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return { data, error, isLoading, mutate }
}

// Service Types
export function useServiceTypes(options?: UseQueryOptions) {
  return useQuery('serviceTypes', () => api.getServiceTypes(), options)
}

// Plans
export function usePlans(serviceTypeId: string, options?: UseQueryOptions) {
  return useQuery(['plans', serviceTypeId], () => api.getPlans(serviceTypeId), options)
}

export function usePlan(serviceTypeId: string, planId: string, options?: UseQueryOptions) {
  return useQuery(
    ['plan', serviceTypeId, planId],
    () => api.getPlan(serviceTypeId, planId),
    options
  )
}

// People
export function usePeople(query?: string, options?: UseQueryOptions) {
  return useQuery(['people', query], () => api.getPeople(query), options)
}

export function usePerson(personId: string, options?: UseQueryOptions) {
  return useQuery(['person', personId], () => api.getPerson(personId), options)
}

// Teams
export function useTeams(serviceTypeId: string, options?: UseQueryOptions) {
  return useQuery(['teams', serviceTypeId], () => api.getTeams(serviceTypeId), options)
}

export function useTeam(serviceTypeId: string, teamId: string, options?: UseQueryOptions) {
  return useQuery(
    ['team', serviceTypeId, teamId],
    () => api.getTeam(serviceTypeId, teamId),
    options
  )
}

// Schedules
export function useSchedules(serviceTypeId: string, planId: string, options?: UseQueryOptions) {
  return useQuery(
    ['schedules', serviceTypeId, planId],
    () => api.getSchedules(serviceTypeId, planId),
    options
  )
}

export function useCreateSchedule() {
  return useMutation(
    (serviceTypeId: string, planId: string, data: Parameters<typeof api.createSchedule>[2]) =>
      api.createSchedule(serviceTypeId, planId, data)
  )
}

export function useUpdateSchedule() {
  return useMutation(
    (serviceTypeId: string, planId: string, scheduleId: string, data: Parameters<typeof api.updateSchedule>[3]) =>
      api.updateSchedule(serviceTypeId, planId, scheduleId, data)
  )
}

export function useDeleteSchedule() {
  return useMutation(
    (serviceTypeId: string, planId: string, scheduleId: string) =>
      api.deleteSchedule(serviceTypeId, planId, scheduleId)
  )
}

// Calendar
export function useEvents(startDate: string, endDate: string, options?: UseQueryOptions) {
  return useQuery(
    ['events', startDate, endDate],
    () => api.getEvents(startDate, endDate),
    options
  )
}

export function useCreateEvent() {
  return useMutation((data: Parameters<typeof api.createEvent>[0]) => api.createEvent(data))
}

// Check-ins
export function useCheckIns(eventId: string, options?: UseQueryOptions) {
  return useQuery(['checkIns', eventId], () => api.getCheckIns(eventId), options)
}

export function useCreateCheckIn() {
  return useMutation(
    (eventId: string, data: Parameters<typeof api.createCheckIn>[1]) =>
      api.createCheckIn(eventId, data)
  )
}

// Giving
export function useDonations(startDate: string, endDate: string, options?: UseQueryOptions) {
  return useQuery(
    ['donations', startDate, endDate],
    () => api.getDonations(startDate, endDate),
    options
  )
}

export function useCreateDonation() {
  return useMutation(
    (data: Parameters<typeof api.createDonation>[0]) => api.createDonation(data)
  )
} 