
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Bell, Palette, Shield, LogOut } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch'; 
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeProvider';

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();

  const settingsOptions = [
    { icon: <User className="h-5 w-5 text-primary" />, title: "Account Information", description: "Manage your personal details and login credentials." },
    { icon: <Bell className="h-5 w-5 text-accent" />, title: "Notification Preferences", description: "Customize how you receive alerts and updates." },
    { icon: <Palette className="h-5 w-5 text-green-500" />, title: "Appearance", description: "Change themes, fonts, and layout options." },
    { icon: <Shield className="h-5 w-5 text-red-500" />, title: "Security & Privacy", description: "Update password, manage data, and review privacy settings." },
  ];

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
      className="space-y-8 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight gradient-text">Settings</h1>
        <p className="text-muted-foreground">Customize your PushpSetu experience.</p>
      </motion.div>

      {settingsOptions.map((option, index) => (
        <motion.div variants={itemVariants} key={index}>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-card/80 dark:bg-slate-800/60 backdrop-blur-md border border-border/30">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="p-3 bg-secondary/50 dark:bg-slate-700/50 rounded-lg">
                {option.icon}
              </div>
              <div>
                <CardTitle className="text-xl text-foreground dark:text-slate-100">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {option.title === "Appearance" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme-mode" className="text-sm font-medium">Theme Mode</Label>
                    <div className="flex gap-2">
                      <Button size="sm" variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>Light</Button>
                      <Button size="sm" variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>Dark</Button>
                      <Button size="sm" variant={theme === 'system' ? 'default' : 'outline'} onClick={() => setTheme('system')}>System</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compact-mode" className="text-sm font-medium">Compact Mode</Label>
                    <Switch id="compact-mode" />
                  </div>
                </div>
              )}
              {option.title === "Notification Preferences" && (
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications" className="text-sm font-medium">Email Notifications</Label>
                        <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications" className="text-sm font-medium">Push Notifications</Label>
                        <Switch id="push-notifications" defaultChecked/>
                    </div>
                 </div>
              )}
              {option.title !== "Appearance" && option.title !== "Notification Preferences" && (
                <Button variant="outline" className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">
                  Manage {option.title.split(" ")[0]}
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
      
      <motion.div variants={itemVariants}>
        <Separator className="my-6 dark:bg-slate-700/50" />
        <Button variant="destructive" className="w-full sm:w-auto">
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;
  