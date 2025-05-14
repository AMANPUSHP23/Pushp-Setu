
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const medicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  dosage: z.string().min(1, "Dosage is required"),
  forMember: z.string().min(1, "Please select a family member"),
  frequency: z.string().min(3, "Frequency is required"),
  time: z.string().min(1, "Time is required"),
  notes: z.string().optional(),
  status: z.string().optional(), // mainly for editing
});


const AddMedicationForm = ({ isOpen, setIsOpen, onSave, medicationData, familyMembers }) => {
  const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(medicationSchema),
    defaultValues: medicationData || {
      name: "",
      dosage: "",
      forMember: "",
      frequency: "",
      time: "",
      notes: ""
    }
  });

  React.useEffect(() => {
    if (medicationData) {
      reset(medicationData);
    } else {
       reset({ name: "", dosage: "", forMember: "", frequency: "", time: "", notes: ""});
    }
  }, [medicationData, reset, isOpen]);


  const processSubmit = (data) => {
    onSave(data);
    reset(); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) reset(); }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
          <DialogContent className="sm:max-w-lg glassmorphic shadow-2xl rounded-xl border futuristic-glow-primary">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold holographic-text">{medicationData ? 'Edit Medication' : 'Add New Medication'}</DialogTitle>
              <DialogDescription className="text-muted-foreground dark:text-slate-400">
                {medicationData ? 'Update the medication details.' : 'Enter the medication information below.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(processSubmit)} className="grid gap-5 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid gap-1.5">
                <Label htmlFor="med-name" className="text-foreground/80 dark:text-slate-300">Medication Name</Label>
                <Input id="med-name" {...register("name")} placeholder="e.g., Amoxicillin" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70 futuristic-glow-accent focus:futuristic-glow-primary" />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="dosage" className="text-foreground/80 dark:text-slate-300">Dosage</Label>
                  <Input id="dosage" {...register("dosage")} placeholder="e.g., 250mg" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                  {errors.dosage && <p className="text-xs text-red-500">{errors.dosage.message}</p>}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="for-member" className="text-foreground/80 dark:text-slate-300">For (Family Member)</Label>
                  <Controller name="forMember" control={control} render={({ field }) => (
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="for-member" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70">
                          <SelectValue placeholder="Select member" />
                        </SelectTrigger>
                        <SelectContent className="glassmorphic">
                          {familyMembers.map(member => (
                            <SelectItem key={member} value={member}>{member}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  )} />
                  {errors.forMember && <p className="text-xs text-red-500">{errors.forMember.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="frequency" className="text-foreground/80 dark:text-slate-300">Frequency</Label>
                  <Input id="frequency" {...register("frequency")} placeholder="e.g., Twice daily" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                  {errors.frequency && <p className="text-xs text-red-500">{errors.frequency.message}</p>}
                </div>
                 <div className="grid gap-1.5">
                  <Label htmlFor="time" className="text-foreground/80 dark:text-slate-300">Time(s)</Label>
                  <Input id="time" {...register("time")} placeholder="e.g., 8 AM & 8 PM" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                  {errors.time && <p className="text-xs text-red-500">{errors.time.message}</p>}
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="notes" className="text-foreground/80 dark:text-slate-300">Notes (Optional)</Label>
                <Textarea id="notes" {...register("notes")} placeholder="e.g., Take with food" rows={3} className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
            </form>
            <DialogFooter className="mt-2">
              <Button variant="outline" onClick={() => {setIsOpen(false); reset();}} className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10 futuristic-glow-primary">Cancel</Button>
              <Button type="submit" onClick={handleSubmit(processSubmit)} className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-lg futuristic-glow-accent">{medicationData ? 'Save Changes' : 'Add Medication'}</Button>
            </DialogFooter>
          </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AddMedicationForm;
  