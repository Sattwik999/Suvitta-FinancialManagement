"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Plus, Video, Users, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const initialMeetings = [
  {
    id: 1,
    title: "Financial Planning Review",
    date: new Date(2023, 6, 15, 10, 0),
    duration: 60,
    participants: ["Rahul Sharma", "Priya Patel", "Amit Kumar"],
    type: "video",
    link: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: 2,
    title: "Investment Strategy Discussion",
    date: new Date(2023, 6, 18, 14, 30),
    duration: 45,
    participants: ["Neha Gupta", "Vikram Singh"],
    type: "video",
    link: "https://meet.google.com/klm-nopq-rst",
  },
  {
    id: 3,
    title: "Loan Application Review",
    date: new Date(2023, 6, 20, 11, 0),
    duration: 30,
    participants: ["Rahul Sharma"],
    type: "video",
    link: "https://meet.google.com/uvw-xyz-123",
  },
]

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState(initialMeetings)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: new Date(),
    time: "10:00",
    duration: 30,
    participants: "",
    type: "video",
  })
  const [date, setDate] = useState(new Date())

  const handleAddMeeting = () => {
    const [hours, minutes] = newMeeting.time.split(":").map(Number)
    const meetingDate = new Date(newMeeting.date)
    meetingDate.setHours(hours, minutes)

    const meeting = {
      id: meetings.length + 1,
      title: newMeeting.title,
      date: meetingDate,
      duration: Number(newMeeting.duration),
      participants: newMeeting.participants.split(",").map((p) => p.trim()),
      type: newMeeting.type,
      link: `https://meet.google.com/${Math.random().toString(36).substring(2, 11)}`,
    }

    setMeetings([...meetings, meeting])
    setIsAddModalOpen(false)
    setNewMeeting({
      title: "",
      date: new Date(),
      time: "10:00",
      duration: 30,
      participants: "",
      type: "video",
    })
  }

  const getUpcomingMeetings = () => {
    const now = new Date()
    return meetings.filter((meeting) => meeting.date > now).sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  const getTodayMeetings = () => {
    const now = new Date()
    return meetings.filter(
      (meeting) =>
        meeting.date.getDate() === now.getDate() &&
        meeting.date.getMonth() === now.getMonth() &&
        meeting.date.getFullYear() === now.getFullYear(),
    )
  }

  const formatMeetingTime = (date) => {
    return format(date, "h:mm a")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              {getTodayMeetings().length > 0 ? (
                <div className="space-y-4">
                  {getTodayMeetings().map((meeting) => (
                    <div key={meeting.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{meeting.title}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {formatMeetingTime(meeting.date)} ({meeting.duration} min)
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            {meeting.participants.length} participants
                          </div>
                        </div>
                      </div>
                      <Button>Join</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No meetings scheduled for today</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              {getUpcomingMeetings().length > 0 ? (
                <div className="space-y-4">
                  {getUpcomingMeetings().map((meeting) => (
                    <div key={meeting.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{meeting.title}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                          <div>
                            <CalendarIcon className="inline mr-1 h-4 w-4" />
                            {format(meeting.date, "EEEE, MMMM d, yyyy")}
                          </div>
                          <div>
                            <Clock className="inline mr-1 h-4 w-4" />
                            {formatMeetingTime(meeting.date)} ({meeting.duration} min)
                          </div>
                          <div>
                            <Users className="inline mr-1 h-4 w-4" />
                            {meeting.participants.length} participants
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">Details</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No upcoming meetings</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Meeting Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule New Meeting</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Meeting Title</Label>
              <Input
                id="title"
                value={newMeeting.title}
                onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newMeeting.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newMeeting.date ? format(newMeeting.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newMeeting.date}
                    onSelect={(date) => setNewMeeting({ ...newMeeting, date: date || new Date() })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newMeeting.time}
                onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select
                value={String(newMeeting.duration)}
                onValueChange={(value) => setNewMeeting({ ...newMeeting, duration: Number(value) })}
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="participants">Participants (comma separated)</Label>
              <Input
                id="participants"
                value={newMeeting.participants}
                onChange={(e) => setNewMeeting({ ...newMeeting, participants: e.target.value })}
                placeholder="e.g., Rahul Sharma, Priya Patel"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Meeting Type</Label>
              <Select value={newMeeting.type} onValueChange={(value) => setNewMeeting({ ...newMeeting, type: value })}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select meeting type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Conference</SelectItem>
                  <SelectItem value="audio">Audio Only</SelectItem>
                  <SelectItem value="in-person">In Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMeeting}>Schedule Meeting</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
