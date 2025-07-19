import { Mail, Shield, Zap } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function LoginPage() {
  const handleGmailLogin = () => {
    // Simulate Gmail OAuth
    console.log('Gmail login initiated')
  }

  const handleOutlookLogin = () => {
    // Simulate Outlook OAuth
    console.log('Outlook login initiated')
  }

  return (
    <div className="min-h-screen bg-[#0F0F23] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 purple-gradient rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Email Intelligence Tool
          </h1>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Unlock powerful insights from your Gmail and Outlook emails. 
            Get detailed analysis, security information, and comprehensive email intelligence.
          </p>
        </div>

        {/* Login Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Gmail Card */}
          <Card className="glass-effect border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Connect Gmail</CardTitle>
              <CardDescription className="text-purple-300">
                Access your Gmail account for comprehensive email analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleGmailLogin}
                className="w-full bg-red-500 hover:bg-red-600 text-white"
              >
                Sign in with Gmail
              </Button>
            </CardContent>
          </Card>

          {/* Outlook Card */}
          <Card className="glass-effect border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Connect Outlook</CardTitle>
              <CardDescription className="text-purple-300">
                Access your Microsoft Outlook account for email insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleOutlookLogin}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Sign in with Outlook
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 purple-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2">Security Analysis</h3>
            <p className="text-purple-300 text-sm">
              Advanced security scanning and threat detection for your emails
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 purple-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2">Smart Insights</h3>
            <p className="text-purple-300 text-sm">
              AI-powered analysis providing detailed email intelligence
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 purple-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2">Email Details</h3>
            <p className="text-purple-300 text-sm">
              Comprehensive metadata and sender information analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}