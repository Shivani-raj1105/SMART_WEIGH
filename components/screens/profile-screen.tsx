"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/lib/app-context"
import { 
  User, 
  Mail, 
  Settings, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Scale,
  History,
  ArrowLeft,
  Phone,
  Calendar,
  Users
} from "lucide-react"

type ActiveSection = null | "account" | "privacy" | "help"

export function ProfileScreen() {
  const { user, setIsAuthenticated, setUser, measurementHistory } = useAppContext()
  const [activeSection, setActiveSection] = useState<ActiveSection>(null)

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  const stats = [
    { 
      icon: Scale, 
      label: "Measurements", 
      value: measurementHistory.length.toString(),
      color: "text-primary"
    },
    { 
      icon: History, 
      label: "This Week", 
      value: measurementHistory.filter(r => 
        new Date(r.timestamp) > new Date(Date.now() - 7 * 86400000)
      ).length.toString(),
      color: "text-accent"
    },
  ]

  const menuItems = [
    { icon: Settings, label: "Account Settings", desc: "View your account details", section: "account" as const },
    { icon: Shield, label: "Privacy & Security", desc: "Data protection settings", section: "privacy" as const },
    { icon: HelpCircle, label: "Help & Support", desc: "FAQs and contact", section: "help" as const },
  ]

  // Account Settings Section
  const renderAccountSettings = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <button
        onClick={() => setActiveSection(null)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Profile</span>
      </button>

      <h2 className="text-xl font-bold text-foreground">Account Settings</h2>

      <Card className="bg-card/30 backdrop-blur-sm border-border/30">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-3 py-2 border-b border-border/30">
            <User className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Full Name</p>
              <p className="text-foreground">{user?.name || "Not set"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2 border-b border-border/30">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Email Address</p>
              <p className="text-foreground">{user?.email || "Not set"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2 border-b border-border/30">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Phone Number</p>
              <p className="text-foreground">{user?.phone || "Not set"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2 border-b border-border/30">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Age</p>
              <p className="text-foreground">{user?.age ? `${user.age} years` : "Not set"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Sex</p>
              <p className="text-foreground capitalize">{user?.sex || "Not set"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  // Privacy & Security Section
  const renderPrivacySecurity = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <button
        onClick={() => setActiveSection(null)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Profile</span>
      </button>

      <h2 className="text-xl font-bold text-foreground">Privacy & Security</h2>

      <Card className="bg-card/30 backdrop-blur-sm border-border/30">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            At WeighScale Pro, we are committed to protecting your privacy and ensuring the security of your personal information. 
            We collect only the data necessary to provide you with accurate weight measurements and analytics. 
            Your measurement history is stored securely and encrypted at rest. We do not share your personal data with third parties 
            without your explicit consent, except as required by law. You have full control over your data and can request its deletion 
            at any time through our support channels. Our application uses industry-standard security protocols including SSL/TLS 
            encryption for data transmission and secure authentication mechanisms to protect your account. We regularly update our 
            security measures to address emerging threats and maintain compliance with applicable data protection regulations.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )

  // Help & Support Section
  const renderHelpSupport = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <button
        onClick={() => setActiveSection(null)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Profile</span>
      </button>

      <h2 className="text-xl font-bold text-foreground">Help & Support</h2>

      <Card className="bg-card/30 backdrop-blur-sm border-border/30">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Welcome to WeighScale Pro Help & Support. If you are experiencing any issues with your weight measurements, 
            device connectivity, or account access, our support team is here to assist you. For common questions, please 
            refer to our FAQ section within the app. If you need to calibrate your scale, navigate to the device settings 
            and follow the on-screen instructions. For technical support, you can reach us via email at support@weighscalepro.com 
            or call our helpline at 1-800-WEIGH-PRO (Monday to Friday, 9 AM - 6 PM EST). For urgent issues related to 
            measurement accuracy in medical or industrial settings, please contact our priority support line. We typically 
            respond to all inquiries within 24-48 business hours. Your feedback helps us improve our service, so please 
            do not hesitate to share your experience with us.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <motion.div
      className="min-h-screen pb-20 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="px-4 pt-6 space-y-6">
        <AnimatePresence mode="wait">
          {activeSection === "account" ? (
            renderAccountSettings()
          ) : activeSection === "privacy" ? (
            renderPrivacySecurity()
          ) : activeSection === "help" ? (
            renderHelpSupport()
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Profile Header */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Card className="bg-gradient-to-br from-primary/20 to-accent/10 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <User className="w-8 h-8 text-primary-foreground" />
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-foreground">{user?.name || "User"}</h2>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span>{user?.email || "user@example.com"}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-card/30 backdrop-blur-sm border-border/30">
                    <CardContent className="p-4 text-center">
                      <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              {/* Menu Items */}
              <motion.div
                className="space-y-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {menuItems.map((item, index) => (
                  <Card 
                    key={index} 
                    className="bg-card/30 backdrop-blur-sm border-border/30 hover:bg-card/50 transition-colors cursor-pointer"
                    onClick={() => setActiveSection(item.section)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              {/* Preferences */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Preferences</h3>
                <Card className="bg-card/30 backdrop-blur-sm border-border/30">
                  <CardContent className="divide-y divide-border/30">
                    {[
                      { label: "Dark Mode", value: true },
                      { label: "Sound Effects", value: true },
                      { label: "Haptic Feedback", value: false },
                      { label: "Auto-save Readings", value: true },
                    ].map((pref, index) => (
                      <div key={index} className="flex items-center justify-between py-3 first:pt-4 last:pb-4">
                        <span className="text-sm text-foreground">{pref.label}</span>
                        <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${
                          pref.value ? "bg-primary/20" : "bg-secondary/50"
                        }`}>
                          <div className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${
                            pref.value 
                              ? "right-0.5 bg-primary" 
                              : "left-0.5 bg-muted-foreground"
                          }`} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* App Info */}
              <motion.div
                className="text-center text-xs text-muted-foreground space-y-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p>WeighScale Pro v1.0.0</p>
                <p>Precision Measurement System</p>
              </motion.div>

              {/* Logout */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="destructive"
                  className="w-full gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
