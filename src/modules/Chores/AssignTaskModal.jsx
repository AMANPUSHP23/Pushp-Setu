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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FamilyMemberModal from '@/components/FamilyMemberModal';
import useAppStore from '@/stores/appStore';
import { toast } from '@/components/ui/use-toast';

const choreSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  dueDate: z.string().refine((date) => new Date(date) >= new Date(new Date().toDateString()), {
    message: "Due date cannot be in the past.",
  }),
  points: z.coerce.number().min(0, "Points cannot be negative").max(100, "Points cannot exceed 100"),
});


const AssignTaskModal = ({ isOpen, setIsOpen, onAddChore, familyMembers, choreData }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(choreSchema),
    defaultValues: choreData || {
      title: "",
      description: "",
      dueDate: new Date().toISOString().split('T')[0],
      points: 10,
    }
  });

  const [isFamilyModalOpen, setIsFamilyModalOpen] = React.useState(false);
  const { familyMembers: appFamilyMembers, addFamilyMember } = useAppStore();
  const [selectedMembers, setSelectedMembers] = React.useState([]);

  React.useEffect(() => {
    if (choreData) {
      reset(choreData);
    } else {
      reset({
        title: "",
        description: "",
        dueDate: new Date().toISOString().split('T')[0],
        points: 10,
      });
    }
  }, [choreData, reset, isOpen]);


  const processSubmit = (data) => {
    if (selectedMembers.length === 0) {
      toast({ title: "Please select at least one person to assign the chore.", variant: "destructive" });
      return;
    }
    selectedMembers.forEach(memberName => {
      onAddChore({ ...data, assignedTo: memberName, status: 'pending' });
    });
    setIsOpen(false);
    reset();
    setSelectedMembers([]);
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
            <DialogContent className="sm:max-w-[520px] glassmorphic shadow-2xl rounded-xl border futuristic-glow-primary">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold holographic-text">{choreData ? "Edit Chore" : "Assign New Chore"}</DialogTitle>
                <DialogDescription className="text-muted-foreground dark:text-slate-400">
                  {choreData ? "Update the details for this chore." : "Fill in the details below to assign a new chore."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(processSubmit)} className="grid gap-5 py-4 max-h-[70vh] overflow-y-auto pr-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="chore-title" className="text-foreground/80 dark:text-slate-300">Chore Title</Label>
                  <Input id="chore-title" {...register("title")} placeholder="e.g., Clean the kitchen" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70 futuristic-glow-accent focus:futuristic-glow-primary" />
                  {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="chore-description" className="text-foreground/80 dark:text-slate-300">Description (Optional)</Label>
                  <Textarea id="chore-description" {...register("description")} placeholder="Add any specific instructions..." className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-1.5">
                        <Label htmlFor="assign-to" className="text-foreground/80 dark:text-slate-300">Assign To</Label>
                        {appFamilyMembers.length === 0 ? (
                          <div className="flex flex-col gap-2">
                            <p className="text-sm text-muted-foreground">No family members found. Add one to assign chores.</p>
                            <Button type="button" onClick={() => setIsFamilyModalOpen(true)} className="w-full">+ Add Family Member</Button>
                          </div>
                        ) : (
                          <select 
                            multiple
                            value={selectedMembers}
                            onChange={e => setSelectedMembers(Array.from(e.target.selectedOptions, option => option.value))}
                            className="w-full rounded-lg border border-primary/40 bg-background/80 dark:bg-slate-800/80 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition-all shadow-sm"
                            style={{ minHeight: '3.5rem' }}
                          >
                            {appFamilyMembers.map(member => (
                              <option key={member.id} value={member.name}>{member.name}</option>
                            ))}
                          </select>
                        )}
                    </div>
                    <div className="grid gap-1.5">
                        <Label htmlFor="due-date" className="text-foreground/80 dark:text-slate-300">Due Date</Label>
                        <Input id="due-date" type="date" {...register("dueDate")} className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                        {errors.dueDate && <p className="text-xs text-red-500">{errors.dueDate.message}</p>}
                    </div>
                </div>
                 <div className="grid gap-1.5">
                  <Label htmlFor="points" className="text-foreground/80 dark:text-slate-300">Points/Reward (0-100)</Label>
                  <Input id="points" type="number" {...register("points")} className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                  {errors.points && <p className="text-xs text-red-500">{errors.points.message}</p>}
                </div>
              </form>
              <DialogFooter className="mt-2">
                <Button variant="outline" onClick={() => {setIsOpen(false); reset();}} className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10 futuristic-glow-primary">Cancel</Button>
                <Button type="submit" onClick={handleSubmit(processSubmit)} className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-lg futuristic-glow-accent">{choreData ? "Save Changes" : "Assign Chore"}</Button>
              </DialogFooter>
            </DialogContent>
          </motion.div>
        </Dialog>
      )}
      <FamilyMemberModal
        open={isFamilyModalOpen}
        onOpenChange={setIsFamilyModalOpen}
        onAdd={name => addFamilyMember({ name })}
      />
    </AnimatePresence>
  );
};
// Helper to get form values for controlled Select component
const getValues = () => ({}); 
// This is a mock, react-hook-form's getValues would be used if the Select was directly registered.
// For Shadcn's Select, you often handle value changes with onValueChange and update form state manually or via Controller.
// For simplicity here, assuming `assignedTo` in defaultValues for the SelectTrigger works.

export default AssignTaskModal;
  