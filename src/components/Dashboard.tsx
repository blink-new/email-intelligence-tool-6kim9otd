import { useState } from 'react'
import { Mail, Search, User, LogOut, Shield, Paperclip, Clock, MapPin, X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

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
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
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
            <Card 
              key={email.id}
              className="email-card cursor-pointer hover:border-purple-500/50 transition-colors"
              onClick={() => setSelectedEmail(email)}
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
                  
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
              </CardContent>
            </Card>
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

      {/* Email Details Modal */}
      <Dialog open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1A1B3A] border-purple-500/30">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Email Intelligence Report
            </DialogTitle>
          </DialogHeader>
          
          {selectedEmail && (
            <div className="space-y-6">
              {/* Email Header */}
              <div className="bg-white/5 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-2">{selectedEmail.subject}</h2>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getSecurityColor(selectedEmail.securityLevel)}`}></div>
                        <span className="text-purple-300">Security: {selectedEmail.securityLevel}</span>
                      </div>
                      <Badge className={`${getProviderColor(selectedEmail.provider)} text-white`}>
                        {selectedEmail.provider.toUpperCase()}
                      </Badge>
                      {!selectedEmail.isRead && (
                        <Badge className="bg-purple-500 text-white">Unread</Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-purple-300 text-sm">
                  <strong>From:</strong> {selectedEmail.sender} &lt;{selectedEmail.senderEmail}&gt;
                </div>
                <div className="text-purple-300 text-sm mt-1">
                  <strong>Received:</strong> {selectedEmail.timestamp}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Email Details */}
                <div className="bg-white/5 rounded-lg p-6 border border-purple-500/20">
                  <h4 className="text-white font-semibold mb-4 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Details
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-purple-400 text-sm font-medium">Preview</label>
                      <p className="text-white mt-1">{selectedEmail.preview}</p>
                    </div>
                    <div>
                      <label className="text-purple-400 text-sm font-medium">Attachments</label>
                      <div className="flex items-center space-x-2 mt-1">
                        {selectedEmail.hasAttachments ? (
                          <>
                            <Paperclip className="w-4 h-4 text-purple-400" />
                            <span className="text-white">Present - Scan recommended</span>
                          </>
                        ) : (
                          <span className="text-white">None</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-purple-400 text-sm font-medium">Message ID</label>
                      <p className="text-white font-mono text-xs mt-1">msg_{selectedEmail.id}_2024</p>
                    </div>
                  </div>
                </div>

                {/* Security Analysis */}
                <div className="bg-white/5 rounded-lg p-6 border border-purple-500/20">
                  <h4 className="text-white font-semibold mb-4 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Analysis
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-purple-400 text-sm font-medium">Security Level</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-4 h-4 rounded-full ${getSecurityColor(selectedEmail.securityLevel)}`}></div>
                        <span className="text-white capitalize font-medium">{selectedEmail.securityLevel}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-purple-400 text-sm font-medium">Sender Reputation</label>
                      <p className="text-white mt-1">
                        {selectedEmail.securityLevel === 'safe' ? 'Verified sender' : 
                         selectedEmail.securityLevel === 'warning' ? 'Unknown sender' : 'Suspicious sender'}
                      </p>
                    </div>
                    <div>
                      <label className="text-purple-400 text-sm font-medium">Domain Analysis</label>
                      <p className="text-white mt-1">
                        {selectedEmail.securityLevel === 'danger' ? 'Potentially malicious domain detected' : 'Domain verified and safe'}
                      </p>
                    </div>
                    <div>
                      <label className="text-purple-400 text-sm font-medium">Threat Assessment</label>
                      <p className="text-white mt-1">
                        {selectedEmail.securityLevel === 'danger' ? 'High risk - Do not interact' : 
                         selectedEmail.securityLevel === 'warning' ? 'Medium risk - Exercise caution' : 'Low risk - Safe to interact'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Intelligence */}
              <div className="bg-white/5 rounded-lg p-6 border border-purple-500/20">
                <h4 className="text-white font-semibold mb-4">Advanced Intelligence</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-purple-500/10">
                    <div className="text-purple-400 text-sm font-medium mb-2">Thread Analysis</div>
                    <div className="text-white">Single message thread</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-purple-500/10">
                    <div className="text-purple-400 text-sm font-medium mb-2">Geolocation</div>
                    <div className="text-white flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      Location unknown
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-purple-500/10">
                    <div className="text-purple-400 text-sm font-medium mb-2">Processing Time</div>
                    <div className="text-white flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Instant analysis
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}