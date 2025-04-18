"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  MessageSquare, 
  Mail, 
  PhoneCall,
  ArrowRight,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const contactMethods = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Live Chat",
    description: "Chat with our customer support team in real-time.",
    action: "Start Chat",
    hours: "Monday to Friday, 9am–5pm EST",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Us",
    description: "Send us an email and we'll respond within 24 hours.",
    action: "Send Email",
    contact: "support@smellandco.com",
  },
  {
    icon: <PhoneCall className="h-6 w-6" />,
    title: "Call Us",
    description: "Speak directly with our customer care specialists.",
    action: "Call Now",
    contact: "+1 (800) 555-1234",
    hours: "Monday to Friday, 9am–5pm EST",
  },
]

export function ContactSupport() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process form submission
    setIsSubmitted(true)
    
    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <section className="py-24 bg-muted">
      <div className="perfume-container">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            className="heading-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            We're Here to Help
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Have questions about our products or need assistance? We're just a message away.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div 
            className="bg-background rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="heading-3 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order">Order Inquiry</SelectItem>
                    <SelectItem value="product">Product Information</SelectItem>
                    <SelectItem value="return">Return/Exchange</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className="resize-none"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitted}>
                {isSubmitted ? (
                  <span className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    Message Sent
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Methods */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="heading-3 mb-6">Other Ways to Connect</h3>
            
            {contactMethods.map((method, index) => (
              <div 
                key={method.title}
                className="bg-background rounded-lg p-6 shadow-md flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{method.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{method.description}</p>
                  {method.contact && (
                    <p className="text-sm font-medium">{method.contact}</p>
                  )}
                  {method.hours && (
                    <p className="text-xs text-muted-foreground">{method.hours}</p>
                  )}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      {method.action}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{method.title}</DialogTitle>
                      <DialogDescription>
                        {method.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      {method.title === "Live Chat" && (
                        <p className="text-center text-muted-foreground py-8">
                          Chat functionality would be integrated here
                        </p>
                      )}
                      {method.title === "Email Us" && (
                        <a 
                          href={`mailto:${method.contact}`} 
                          className="flex items-center justify-center gap-2 text-primary"
                        >
                          <Mail className="h-4 w-4" />
                          {method.contact}
                        </a>
                      )}
                      {method.title === "Call Us" && (
                        <a 
                          href={`tel:${method.contact}`} 
                          className="flex items-center justify-center gap-2 text-primary"
                        >
                          <PhoneCall className="h-4 w-4" />
                          {method.contact}
                        </a>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}

            <div className="bg-primary/10 rounded-lg p-6 mt-6">
              <h4 className="font-medium mb-2">FAQs</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Find quick answers to common questions in our comprehensive FAQ section.
              </p>
              <Button variant="outline" size="sm">
                Visit FAQ
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 