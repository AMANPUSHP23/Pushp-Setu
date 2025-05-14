
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, Download, ShieldCheck, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MedicalDetailsForm from '@/modules/EmergencyInfo/MedicalDetailsForm';
import EmergencyCard from '@/modules/EmergencyInfo/EmergencyCard';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FamilyProfileList = () => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedProfile, setSelectedProfile] = React.useState(null);

  const familyMembers = [
    { id: 1, name: "Alice Smith", dob: "1990-05-15", bloodType: "O+", allergies: "Peanuts, Penicillin", medications: "Vitamin D", emergencyContactName: "John Smith", emergencyContactPhone: "555-1234", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" },
    { id: 2, name: "Bob Johnson", dob: "1988-11-20", bloodType: "A-", allergies: "None", medications: "Metformin", emergencyContactName: "Jane Johnson", emergencyContactPhone: "555-5678", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const handleEditProfile = (profile) => {
    setSelectedProfile(profile);
    setIsFormOpen(true);
  };
  
  const handleAddNewProfile = () => {
    setSelectedProfile(null);
    setIsFormOpen(true);
  };


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight gradient-text">Emergency Info</h1>
          <p className="text-muted-foreground">Manage vital health profiles for your family.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">
            <Download className="mr-2 h-4 w-4" /> Export All (PDF)
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-md" onClick={handleAddNewProfile}>
            <UserPlus className="mr-2 h-4 w-4" /> Add Profile
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
         <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-card/80 dark:bg-slate-800/60 backdrop-blur-md border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-green-500"/>Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Your family's health information is stored securely and is only accessible by you.</p>
            <Button variant="link" className="p-0 h-auto text-primary dark:text-accent mt-1">Learn More &rarr;</Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-card/80 dark:bg-slate-800/60 backdrop-blur-md border border-border/30">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Printable emergency cards for each profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Generate a PDF for any profile to carry in a wallet or share with caregivers.</p>
            <Button variant="outline" size="sm" className="mt-2 border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">Generate Example Card</Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4 tracking-tight text-foreground dark:text-slate-200">Family Profiles</h2>
        {familyMembers.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {familyMembers.map((profile, index) => (
              <motion.div key={profile.id} variants={itemVariants} custom={index}>
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-card/70 dark:bg-slate-800/50 backdrop-blur-sm border border-border/20 overflow-hidden">
                  <CardHeader className="flex flex-row items-center gap-4 bg-secondary/20 dark:bg-slate-700/30 p-4">
                     <Avatar className="h-16 w-16 border-2 border-primary/50 dark:border-accent/50">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    <div>
                      <CardTitle className="text-xl text-primary dark:text-accent">{profile.name}</CardTitle>
                      <CardDescription className="text-xs">DOB: {profile.dob} | Blood Type: {profile.bloodType}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-sm"><strong className="text-foreground/80 dark:text-slate-300">Allergies:</strong> {profile.allergies || "None"}</p>
                    <p className="text-sm"><strong className="text-foreground/80 dark:text-slate-300">Current Medications:</strong> {profile.medications || "None"}</p>
                    <p className="text-sm"><strong className="text-foreground/80 dark:text-slate-300">Emergency Contact:</strong> {profile.emergencyContactName} ({profile.emergencyContactPhone})</p>
                    <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="text-xs h-auto p-1.5 border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10" onClick={() => handleEditProfile(profile)}>
                            <Edit3 className="mr-1 h-3 w-3"/> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs h-auto p-1.5 text-primary dark:text-accent">View Full Card</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No family profiles added yet. Start by adding a new profile.</p>
        )}
      </motion.div>
      <MedicalDetailsForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} profileData={selectedProfile} />
      {/* Placeholder for EmergencyCard display/modal */}
    </motion.div>
  );
};

export default FamilyProfileList;
  