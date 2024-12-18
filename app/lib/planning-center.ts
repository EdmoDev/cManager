interface PlanningCenterConfig {
  applicationId: string
  secret: string
  baseUrl?: string
}

interface ServiceType {
  id: string
  name: string
  type: string
  attributes: {
    name: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    permissions: string[]
  }
}

interface Plan {
  id: string
  attributes: {
    title: string
    dates: string
    serviceTypeId: string
    createdAt: string
    updatedAt: string
    sortDate: string
    totalLength: number
    rehearsalLength: number
  }
  relationships: {
    serviceType: {
      data: {
        id: string
        type: string
      }
    }
  }
}

interface Person {
  id: string
  attributes: {
    givenName: string
    firstName: string
    middleName: string | null
    lastName: string
    birthdate: string | null
    anniversary: string | null
    gender: string
    grade: number | null
    child: boolean
    graduationYear: number | null
    site: string | null
    status: string
    membershipType: string | null
    inactiveReason: string | null
    createdAt: string
    updatedAt: string
    avatar: string | null
    namePrefix: string | null
    nameSuffix: string | null
    permissions: string[]
  }
}

interface Team {
  id: string
  attributes: {
    name: string
    sequenceNumber: number
    scheduleToPreferences: boolean
    defaultStatus: string
    defaultPrepareNotifications: boolean
    createdAt: string
    updatedAt: string
    archivedAt: string | null
    scheduledToPreferences: boolean
    rehearsalTeam: boolean
    groupKey: string | null
    stagedGroupKey: string | null
  }
}

interface Schedule {
  id: string
  attributes: {
    status: string
    createdAt: string
    updatedAt: string
    sortDate: string
    declineReason: string | null
    notes: string | null
    organizationName: string | null
    organizationTimeZone: string
    personName: string
    respondedAt: string | null
    teamName: string
  }
  relationships: {
    person: {
      data: {
        id: string
        type: string
      }
    }
    planPerson: {
      data: {
        id: string
        type: string
      }
    }
    team: {
      data: {
        id: string
        type: string
      }
    }
  }
}

export class PlanningCenterAPI {
  private config: PlanningCenterConfig
  private baseUrl: string

  constructor(config: PlanningCenterConfig) {
    this.config = config
    this.baseUrl = config.baseUrl || 'https://api.planningcenteronline.com'
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const auth = Buffer.from(`${this.config.applicationId}:${this.config.secret}`).toString('base64')
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Planning Center API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Services API
  async getServiceTypes(): Promise<ServiceType[]> {
    const response = await this.request<{ data: ServiceType[] }>('/services/v2/service_types')
    return response.data
  }

  async getPlans(serviceTypeId: string): Promise<Plan[]> {
    const response = await this.request<{ data: Plan[] }>(`/services/v2/service_types/${serviceTypeId}/plans`)
    return response.data
  }

  async getPlan(serviceTypeId: string, planId: string): Promise<Plan> {
    const response = await this.request<{ data: Plan }>(`/services/v2/service_types/${serviceTypeId}/plans/${planId}`)
    return response.data
  }

  // People API
  async getPeople(query?: string): Promise<Person[]> {
    const endpoint = query
      ? `/people/v2/people?where[search_name_or_email]=${encodeURIComponent(query)}`
      : '/people/v2/people'
    const response = await this.request<{ data: Person[] }>(endpoint)
    return response.data
  }

  async getPerson(personId: string): Promise<Person> {
    const response = await this.request<{ data: Person }>(`/people/v2/people/${personId}`)
    return response.data
  }

  // Teams API
  async getTeams(serviceTypeId: string): Promise<Team[]> {
    const response = await this.request<{ data: Team[] }>(`/services/v2/service_types/${serviceTypeId}/teams`)
    return response.data
  }

  async getTeam(serviceTypeId: string, teamId: string): Promise<Team> {
    const response = await this.request<{ data: Team }>(`/services/v2/service_types/${serviceTypeId}/teams/${teamId}`)
    return response.data
  }

  // Schedules API
  async getSchedules(serviceTypeId: string, planId: string): Promise<Schedule[]> {
    const response = await this.request<{ data: Schedule[] }>(
      `/services/v2/service_types/${serviceTypeId}/plans/${planId}/plan_people`
    )
    return response.data
  }

  async createSchedule(serviceTypeId: string, planId: string, data: {
    personId: string
    teamId: string
    status?: string
    notes?: string
  }): Promise<Schedule> {
    const response = await this.request<{ data: Schedule }>(
      `/services/v2/service_types/${serviceTypeId}/plans/${planId}/plan_people`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'PlanPerson',
            attributes: {
              status: data.status || 'U',
              notes: data.notes
            },
            relationships: {
              person: {
                data: {
                  type: 'Person',
                  id: data.personId
                }
              },
              team: {
                data: {
                  type: 'Team',
                  id: data.teamId
                }
              }
            }
          }
        })
      }
    )
    return response.data
  }

  async updateSchedule(serviceTypeId: string, planId: string, scheduleId: string, data: {
    status?: string
    notes?: string
  }): Promise<Schedule> {
    const response = await this.request<{ data: Schedule }>(
      `/services/v2/service_types/${serviceTypeId}/plans/${planId}/plan_people/${scheduleId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          data: {
            type: 'PlanPerson',
            id: scheduleId,
            attributes: {
              status: data.status,
              notes: data.notes
            }
          }
        })
      }
    )
    return response.data
  }

  async deleteSchedule(serviceTypeId: string, planId: string, scheduleId: string): Promise<void> {
    await this.request(
      `/services/v2/service_types/${serviceTypeId}/plans/${planId}/plan_people/${scheduleId}`,
      { method: 'DELETE' }
    )
  }

  // Calendar API
  async getEvents(startDate: string, endDate: string): Promise<any[]> {
    const response = await this.request<{ data: any[] }>(
      `/calendar/v2/events?where[starts_at]=${startDate}&where[ends_at]=${endDate}`
    )
    return response.data
  }

  async createEvent(data: {
    name: string
    startTime: string
    endTime: string
    location?: string
    description?: string
  }): Promise<any> {
    const response = await this.request<{ data: any }>(
      '/calendar/v2/events',
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'Event',
            attributes: {
              name: data.name,
              starts_at: data.startTime,
              ends_at: data.endTime,
              location: data.location,
              description: data.description
            }
          }
        })
      }
    )
    return response.data
  }

  // Check-ins API
  async getCheckIns(eventId: string): Promise<any[]> {
    const response = await this.request<{ data: any[] }>(`/check-ins/v2/events/${eventId}/check_ins`)
    return response.data
  }

  async createCheckIn(eventId: string, data: {
    personId: string
    stationId: string
    medicalNotes?: string
    securityNotes?: string
  }): Promise<any> {
    const response = await this.request<{ data: any }>(
      `/check-ins/v2/events/${eventId}/check_ins`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'CheckIn',
            attributes: {
              medical_notes: data.medicalNotes,
              security_notes: data.securityNotes
            },
            relationships: {
              person: {
                data: {
                  type: 'Person',
                  id: data.personId
                }
              },
              station: {
                data: {
                  type: 'Station',
                  id: data.stationId
                }
              }
            }
          }
        })
      }
    )
    return response.data
  }

  // Giving API
  async getDonations(startDate: string, endDate: string): Promise<any[]> {
    const response = await this.request<{ data: any[] }>(
      `/giving/v2/donations?where[created_at]=${startDate}..${endDate}`
    )
    return response.data
  }

  async createDonation(data: {
    amount: number
    fundId: string
    personId: string
    paymentMethodId: string
    note?: string
  }): Promise<any> {
    const response = await this.request<{ data: any }>(
      '/giving/v2/donations',
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'Donation',
            attributes: {
              amount: data.amount,
              note: data.note
            },
            relationships: {
              person: {
                data: {
                  type: 'Person',
                  id: data.personId
                }
              },
              payment_method: {
                data: {
                  type: 'PaymentMethod',
                  id: data.paymentMethodId
                }
              },
              fund: {
                data: {
                  type: 'Fund',
                  id: data.fundId
                }
              }
            }
          }
        })
      }
    )
    return response.data
  }
} 