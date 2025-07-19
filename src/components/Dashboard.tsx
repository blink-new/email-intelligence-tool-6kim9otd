import { useState } from 'react'
import { Mail, Search, User, LogOut, ChevronDown, Shield, Paperclip, Clock, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

interface Email {
  id: string
  sender: string
  senderEmail: string
  subject: string
  preview: string
  timestamp: string
  isRead: boolean
  hasAttachments: boolean
  securityLevel: 'safe' | 'warning' | 'danger'
  provider: 'gmail' | 'outlook'
}

const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'John Smith',
    senderEmail: 'john.smith@company.com',
    subject: 'Q4 Financial Report - Review Required',
    preview: 'Please review the attached Q4 financial report and provide your feedback by...',
    timestamp: '2 hours ago',
    isRead: false,
    hasAttachments: true,
    securityLevel: 'safe',
    provider: 'gmail'
  },
  {
    id: '2',
    sender: 'Sarah Johnson',
    senderEmail: 'sarah.j@marketing.co',
    subject: 'New Marketing Campaign Proposal',
    preview: 'I wanted to share our latest marketing campaign proposal for the upcoming...',
    timestamp: '4 hours ago',
    isRead: true,
    hasAttachments: false,
    securityLevel: 'safe',
    provider: 'outlook'
  },
  {
    id: '3',
    sender: 'Security Alert',
    senderEmail: 'noreply@suspicious-domain.com',
    subject: 'Urgent: Verify Your Account',
    preview: 'Your account has been compromised. Click here to verify immediately...',
    timestamp: '1 day ago',
    isRead: false,
    hasAttachments: false,
    securityLevel: 'danger',
    provider: 'gmail'
  }
]

interface DashboardProps {
  user: any
}

export default function Dashboard({ user }: DashboardProps) {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEmails = mockEmails.filter(email =>
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.sender.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'safe': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'danger': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getProviderColor = (provider: string) => {
    return provider === 'gmail' ? 'bg-red-500' : 'bg-blue-500'
  }

  return (
    <div className="min-h-screen bg-[#0F0F23]">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 purple-gradient rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-white">Email Intelligence</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-purple-300">
                <User className="w-4 h-4" />
                <span className="text-sm">{user?.email || 'user@example.com'}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-purple-500/20 text-white placeholder-purple-400"
            />
          </div>
        </div>

        {/* Email List */}
        <div className="space-y-4">
          {filteredEmails.map((email) => (
            <div key={email.id} className="relative">
              <Card 
                className={`email-card ${selectedEmail === email.id ? 'border-purple-500/50 bg-white/10' : ''}`}
                onClick={() => setSelectedEmail(selectedEmail === email.id ? null : email.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getSecurityColor(email.securityLevel)}`}></div>
                          <Badge variant="secondary" className={`${getProviderColor(email.provider)} text-white text-xs`}>
                            {email.provider}
                          </Badge>
                        </div>
                        <span className="text-white font-medium">{email.sender}</span>
                        <span className="text-purple-400 text-sm">{email.timestamp}</span>
                      </div>
                      
                      <h3 className={`text-lg font-medium mb-1 ${email.isRead ? 'text-purple-300' : 'text-white'}`}>
                        {email.subject}
                      </h3>
                      
                      <p className="text-purple-400 text-sm line-clamp-2">
                        {email.preview}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-3">
                        {email.hasAttachments && (
                          <div className="flex items-center space-x-1 text-purple-400">
                            <Paperclip className="w-3 h-3" />
                            <span className="text-xs">Attachment</span>
                          </div>
                        )}
                        {!email.isRead && (
                          <Badge variant="secondary" className="bg-purple-500 text-white text-xs">
                            Unread
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <ChevronDown 
                      className={`w-5 h-5 text-purple-400 transition-transform duration-200 ${
                        selectedEmail === email.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Dropdown Content */}
              {selectedEmail === email.id && (
                <div className="mt-2 dropdown-content p-6 animate-slide-up">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email Details */}
                    <div>
                      <h4 className="text-white font-semibold mb-4 flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Details
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-purple-400 text-sm">From</label>
                          <p className="text-white">{email.senderEmail}</p>
                        </div>
                        <div>
                          <label className="text-purple-400 text-sm">Subject</label>
                          <p className="text-white">{email.subject}</p>
                        </div>
                        <div>
                          <label className="text-purple-400 text-sm">Received</label>
                          <p className="text-white flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {email.timestamp}
                          </p>
                        </div>
                        <div>
                          <label className="text-purple-400 text-sm">Provider</label>
                          <Badge className={`${getProviderColor(email.provider)} text-white`}>
                            {email.provider.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Security Analysis */}
                    <div>
                      <h4 className="text-white font-semibold mb-4 flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        Security Analysis
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-purple-400 text-sm">Security Level</label>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getSecurityColor(email.securityLevel)}`}></div>
                            <span className="text-white capitalize">{email.securityLevel}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-purple-400 text-sm">Sender Reputation</label>
                          <p className="text-white">
                            {email.securityLevel === 'safe' ? 'Verified' : 
                             email.securityLevel === 'warning' ? 'Unknown' : 'Suspicious'}
                          </p>
                        </div>
                        <div>
                          <label className="text-purple-400 text-sm">Domain Analysis</label>
                          <p className="text-white">
                            {email.securityLevel === 'danger' ? 'Potentially malicious domain' : 'Domain verified'}
                          </p>
                        </div>
                        <div>
                          <label className="text-purple-400 text-sm">Attachments</label>
                          <p className="text-white">
                            {email.hasAttachments ? 'Present - Scan recommended' : 'None'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Intelligence */}
                  <div className="mt-6 pt-6 border-t border-purple-500/20">
                    <h4 className="text-white font-semibold mb-4">Email Intelligence</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-purple-400 text-sm mb-1">Message ID</div>
                        <div className="text-white text-xs font-mono">msg_{email.id}_2024</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-purple-400 text-sm mb-1">Thread Count</div>
                        <div className="text-white">1 message</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-purple-400 text-sm mb-1">Location</div>
                        <div className="text-white flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          Unknown
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredEmails.length === 0 && (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">No emails found</h3>
            <p className="text-purple-400">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </div>
  )
}