"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Smile, Phone, Video } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"

const initialContacts = [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Just now",
    unread: 2,
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "2 hours ago",
    unread: 0,
  },
  {
    id: 3,
    name: "Amit Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Just now",
    unread: 0,
  },
  {
    id: 4,
    name: "Neha Gupta",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "Yesterday",
    unread: 5,
  },
  {
    id: 5,
    name: "Vikram Singh",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Just now",
    unread: 0,
  },
]

const initialMessages = [
  {
    id: 1,
    contactId: 1,
    messages: [
      {
        id: 1,
        sender: "contact",
        text: "Hi there! How are you doing?",
        time: "10:30 AM",
      },
      {
        id: 2,
        sender: "user",
        text: "I'm good, thanks! How about you?",
        time: "10:32 AM",
      },
      {
        id: 3,
        sender: "contact",
        text: "I'm doing well! Just wanted to check if you've made the payment for this month's EMI?",
        time: "10:35 AM",
      },
      {
        id: 4,
        sender: "user",
        text: "Oh yes, I was about to do that today. Thanks for the reminder!",
        time: "10:38 AM",
      },
      {
        id: 5,
        sender: "contact",
        text: "No problem! Let me know once it's done.",
        time: "10:40 AM",
      },
    ],
  },
  {
    id: 2,
    contactId: 2,
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Hey Priya, have you received the investment details I sent?",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "contact",
        text: "Yes, I've reviewed them. Let's discuss tomorrow.",
        time: "Yesterday",
      },
    ],
  },
]

export default function ChatPage() {
  const [contacts, setContacts] = useState(initialContacts)
  const [messages, setMessages] = useState(initialMessages)
  const [selectedContact, setSelectedContact] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)
  const { settings } = useSettings()

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedContact, messages])

  const handleContactSelect = (contact) => {
    setSelectedContact(contact)
    // Mark messages as read
    setContacts(contacts.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c)))
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedContact) return

    const updatedMessages = messages.map((thread) => {
      if (thread.contactId === selectedContact.id) {
        return {
          ...thread,
          messages: [
            ...thread.messages,
            {
              id: thread.messages.length + 1,
              sender: "user",
              text: newMessage,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ],
        }
      }
      return thread
    })

    setMessages(updatedMessages)
    setNewMessage("")
  }

  const getContactThread = () => {
    if (!selectedContact) return []
    const thread = messages.find((t) => t.contactId === selectedContact.id)
    return thread ? thread.messages : []
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Chat</h1>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-12rem)]">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="space-y-1 p-2">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-colors ${
                      selectedContact?.id === contact.id ? "bg-secondary" : "hover:bg-secondary/50"
                    }`}
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {contact.status === "online" && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium truncate">{contact.name}</p>
                        {contact.unread > 0 && (
                          <span className="ml-2 inline-flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-primary rounded-full">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {contact.status === "online" ? "Online" : contact.lastSeen}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          {selectedContact ? (
            <>
              <CardHeader className="border-b px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} alt={selectedContact.name} />
                      <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{selectedContact.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {selectedContact.status === "online" ? "Online" : selectedContact.lastSeen}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[calc(100vh-20rem)]">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {getContactThread().map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs text-right mt-1 opacity-70">{message.time}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage()
                      }}
                    />
                    <Button variant="ghost" size="icon">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-muted-foreground">Select a contact to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
