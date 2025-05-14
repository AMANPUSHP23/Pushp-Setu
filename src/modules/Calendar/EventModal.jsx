
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

const EventModal = ({ isOpen, setIsOpen, eventData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Saved/Updated");
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
              <DialogTitle className="text-2xl font-bold gradient-text">{eventData ? 'Edit Event' : 'Add New Event'}</DialogTitle>
              <DialogDescription>
                {eventData ? 'Update the details for this event.' : 'Schedule a new event for the family.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid gap-2">
                <Label htmlFor="event-title" className="text-foreground/80 dark:text-slate-300">Event Title</Label>
                <Input id="event-title" defaultValue={eventData?.title} placeholder="e.g., Family Movie Night" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-date" className="text-foreground/80 dark:text-slate-300">Date</Label>
                  <Input id="event-date" type="date" defaultValue={eventData?.date || new Date().toISOString().substring(0,10)} className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-time" className="text-foreground/80 dark:text-slate-300">Time</Label>
                  <Input id="event-time" type="time" defaultValue={eventData?.time} className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event-location" className="text-foreground/80 dark:text-slate-300">Location (Optional)</Label>
                <Input id="event-location" defaultValue={eventData?.location} placeholder="e.g., Living Room or Cinema" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event-description" className="text-foreground/80 dark:text-slate-300">Description (Optional)</Label>
                <Textarea id="event-description" defaultValue={eventData?.description} placeholder="Add any details or notes..." rows={3} className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
              {/* Add recurring options, reminders, color coding later */}
            </form>
            <DialogFooter className="mt-2">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">Cancel</Button>
              <Button type="submit" onClick={handleSubmit} className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-md">{eventData ? 'Save Changes' : 'Add Event'}</Button>
            </DialogFooter>
          </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
  