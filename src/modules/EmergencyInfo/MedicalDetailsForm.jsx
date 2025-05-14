
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

const MedicalDetailsForm = ({ isOpen, setIsOpen, profileData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Saved/Updated");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
          <DialogContent className="sm:max-w-lg bg-card/90 dark:bg-slate-900/90 backdrop-blur-lg border-border/50 dark:border-slate-800/50 shadow-2xl rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold gradient-text">{profileData ? 'Edit Health Profile' : 'Add New Health Profile'}</DialogTitle>
              <DialogDescription>
                {profileData ? 'Update the medical details for this family member.' : 'Enter the vital health information below.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="profile-name" className="text-foreground/80 dark:text-slate-300">Full Name</Label>
                  <Input id="profile-name" defaultValue={profileData?.name} placeholder="e.g., Alice Smith" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dob" className="text-foreground/80 dark:text-slate-300">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue={profileData?.dob} className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="blood-type" className="text-foreground/80 dark:text-slate-300">Blood Type</Label>
                <Input id="blood-type" defaultValue={profileData?.bloodType} placeholder="e.g., O+" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="allergies" className="text-foreground/80 dark:text-slate-300">Allergies</Label>
                <Textarea id="allergies" defaultValue={profileData?.allergies} placeholder="List known allergies, one per line..." rows={3} className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="medications" className="text-foreground/80 dark:text-slate-300">Current Medications</Label>
                <Textarea id="medications" defaultValue={profileData?.medications} placeholder="List current medications, dosages, one per line..." rows={3} className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="emergency-contact-name" className="text-foreground/80 dark:text-slate-300">Emergency Contact Name</Label>
                  <Input id="emergency-contact-name" defaultValue={profileData?.emergencyContactName} placeholder="e.g., John Smith" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="emergency-contact-phone" className="text-foreground/80 dark:text-slate-300">Emergency Contact Phone</Label>
                  <Input id="emergency-contact-phone" type="tel" defaultValue={profileData?.emergencyContactPhone} placeholder="e.g., 555-1234" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                </div>
              </div>
               <div className="grid gap-2">
                <Label htmlFor="avatar-url" className="text-foreground/80 dark:text-slate-300">Avatar Image URL (Optional)</Label>
                <Input id="avatar-url" defaultValue={profileData?.avatar} placeholder="Link to profile picture" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
            </form>
            <DialogFooter className="mt-2">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">Cancel</Button>
              <Button type="submit" onClick={handleSubmit} className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-md">{profileData ? 'Save Changes' : 'Add Profile'}</Button>
            </DialogFooter>
          </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default MedicalDetailsForm;
  