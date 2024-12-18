import { Metadata } from 'next'
import MinistryDetails from './ministry-details'

// This would come from your API/database
const ministryData = {
  youth: {
    id: "youth",
    name: "Youth Ministry",
    type: "youth",
    leader: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    members: 45,
    nextMeeting: "Sunday, 4:00 PM",
    location: "Youth Center",
    description: "Engaging young people in faith and fellowship through dynamic programs, mentorship, and community service.",
    engagement: 75,
    schedule: [
      { day: "Sunday", time: "4:00 PM - 6:00 PM", activity: "Youth Service" },
      { day: "Wednesday", time: "6:30 PM - 8:00 PM", activity: "Bible Study" },
      { day: "Friday", time: "7:00 PM - 9:00 PM", activity: "Youth Night" }
    ],
    members_list: [
      { id: 1, name: "Sarah Johnson", role: "Youth Leader", joined: "2023-01-15" },
      { id: 2, name: "Mike Wilson", role: "Assistant", joined: "2023-02-01" },
      { id: 3, name: "Emily Brown", role: "Member", joined: "2023-03-10" }
    ],
    upcoming_events: [
      { id: 1, name: "Youth Camp", date: "2024-07-15", location: "Camp Grounds" },
      { id: 2, name: "Service Project", date: "2024-06-01", location: "Community Center" }
    ]
  },
  worship: {
    id: "worship",
    name: "Worship Ministry",
    type: "worship",
    leader: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 234-5678",
    members: 20,
    nextMeeting: "Saturday, 3:00 PM",
    location: "Main Sanctuary",
    description: "Leading the congregation in worship through music and praise.",
    engagement: 85,
    schedule: [
      { day: "Saturday", time: "3:00 PM - 5:00 PM", activity: "Practice" },
      { day: "Sunday", time: "8:00 AM - 12:00 PM", activity: "Services" }
    ],
    members_list: [
      { id: 1, name: "David Lee", role: "Worship Leader", joined: "2023-01-01" },
      { id: 2, name: "Anna Chen", role: "Vocalist", joined: "2023-02-15" }
    ],
    upcoming_events: [
      { id: 1, name: "Worship Night", date: "2024-06-30", location: "Main Sanctuary" }
    ]
  },
  prayer: {
    id: "prayer",
    name: "Prayer Ministry",
    type: "prayer",
    leader: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "(555) 345-6789",
    members: 30,
    nextMeeting: "Wednesday, 7:00 PM",
    location: "Prayer Room",
    description: "Interceding for the church and community through focused prayer.",
    engagement: 65,
    schedule: [
      { day: "Wednesday", time: "7:00 PM - 8:30 PM", activity: "Prayer Meeting" },
      { day: "Sunday", time: "9:00 AM - 9:45 AM", activity: "Pre-Service Prayer" }
    ],
    members_list: [
      { id: 1, name: "Grace Kim", role: "Prayer Coordinator", joined: "2023-03-01" },
      { id: 2, name: "Tom Wilson", role: "Member", joined: "2023-04-15" }
    ],
    upcoming_events: [
      { id: 1, name: "Prayer Vigil", date: "2024-07-01", location: "Prayer Room" }
    ]
  }
}

// Generate static params for all known ministry IDs
export async function generateStaticParams() {
  // In a real app, this would fetch from your API/database
  const ministryIds = Object.keys(ministryData)
  
  return ministryIds.map((id) => ({
    id: id,
  }))
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const ministry = ministryData[params.id as keyof typeof ministryData]
  
  if (!ministry) {
    return {
      title: 'Ministry Not Found',
    }
  }

  return {
    title: ministry.name,
    description: ministry.description,
  }
}

export default function MinistryPage({ params }: { params: { id: string } }) {
  const ministry = ministryData[params.id as keyof typeof ministryData]

  return <MinistryDetails ministry={ministry} />
} 