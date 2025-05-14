
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Menu, Sun, Moon, Users, Bell, Settings, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { useFamilyStore } from '@/stores/familyStore';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from '@/components/ui/use-toast';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { family: familyMembers, currentProfileId, setCurrentProfile, addMember } = useFamilyStore();
  const { toast } = useToast();

  React.useEffect(() => {
    if (familyMembers.length === 0) {
      addMember({ name: 'Main Household', avatar: `https://avatar.vercel.sh/mainhousehold.png?size=128` });
    }
    if (!currentProfileId && familyMembers.length > 0) {
      setCurrentProfile(familyMembers[0].id);
    }
  }, [familyMembers, currentProfileId, setCurrentProfile, addMember]);

  const currentProfile = familyMembers.find(member => member.id === currentProfileId) || familyMembers[0] || { name: 'Family', avatar: 'https://avatar.vercel.sh/family.png?size=128' };

  const handleProfileSwitch = (profileId) => {
    setCurrentProfile(profileId);
    toast({
      title: "Profile Switched",
      description: `Switched to ${familyMembers.find(p => p.id === profileId)?.name}'s profile.`,
    });
  };

  const notifications = [
    { id: 1, text: "Budget alert: Groceries overspent by $23.50.", time: "10m ago", read: false },
    { id: 2, text: "New chore: 'Clean your room' assigned to Alex.", time: "1h ago", read: false },
    { id: 3, text: "Medication reminder: Vitamin C for Sarah in 30 mins.", time: "2h ago", read: true },
  ];


  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-secondary/10 dark:from-slate-900 dark:via-slate-950 dark:to-primary/5 transition-colors duration-500 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="glassmorphic shadow-md sticky top-0 z-40 transition-colors duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden mr-2 text-foreground/80 hover:text-primary transition-colors futuristic-glow-primary"
                >
                  <Menu size={24} />
                </Button>
                <Link to="/" className="text-xl font-bold gradient-text tracking-tight hover:opacity-80 transition-opacity">
                  PushpSetu
                </Link>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative futuristic-glow-accent">
                      <Bell className="h-5 w-5 text-foreground/70 hover:text-primary transition-colors" />
                      {notifications.some(n => !n.read) && (
                        <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 glassmorphic">
                    <DropdownMenuLabel className="flex justify-between items-center">
                      <span>Notifications</span>
                      <Button variant="link" size="sm" className="p-0 h-auto text-xs">Mark all as read</Button>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.map(n => (
                       <DropdownMenuItem key={n.id} className={`flex flex-col items-start ${!n.read ? 'font-semibold' : ''}`}>
                        <p className="text-sm whitespace-normal">{n.text}</p>
                        <p className={`text-xs ${!n.read ? 'text-accent' : 'text-muted-foreground'}`}>{n.time}</p>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                     <DropdownMenuItem className="justify-center">
                        <Button variant="link" size="sm">View all notifications</Button>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="futuristic-glow-primary">
                      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground/70 hover:text-primary" />
                      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground/70 hover:text-primary" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glassmorphic">
                    <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 px-2 py-1 h-auto futuristic-glow-primary">
                      <Avatar className="h-8 w-8 border-2 border-primary/30 dark:border-accent/30">
                        <AvatarImage src={currentProfile.avatar} alt={currentProfile.name} />
                        <AvatarFallback className="bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent">
                          {currentProfile.name ? currentProfile.name.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground/90 hidden sm:inline">{currentProfile.name}</span>
                      <Users className="h-4 w-4 text-foreground/70 hidden sm:inline" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60 glassmorphic">
                    <DropdownMenuLabel>Switch Profile</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    {familyMembers.map(member => (
                       <DropdownMenuItem key={member.id} onClick={() => handleProfileSwitch(member.id)} className={member.id === currentProfileId ? 'bg-primary/10 dark:bg-accent/10' : ''}>
                         <Avatar className="h-7 w-7 mr-2 border border-border/50">
                           <AvatarImage src={member.avatar} alt={member.name} />
                           <AvatarFallback className="text-xs bg-secondary dark:bg-slate-700">{member.name.charAt(0).toUpperCase()}</AvatarFallback>
                         </Avatar>
                         <span>{member.name}</span>
                       </DropdownMenuItem>
                    ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link to="/settings#family-profiles"> 
                            <UserCircle className="mr-2 h-4 w-4" /> Manage Profiles
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/settings">
                            <Settings className="mr-2 h-4 w-4" /> Account Settings
                        </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-b from-transparent via-background/5 to-primary/5 dark:from-transparent dark:via-slate-950/5 dark:to-primary/10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
  