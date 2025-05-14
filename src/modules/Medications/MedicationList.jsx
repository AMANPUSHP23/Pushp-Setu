
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Pill, History, BellDot, CheckSquare, XSquare, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddMedicationForm from '@/modules/Medications/AddMedicationForm';
import { useToast } from '@/components/ui/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MedicationList = () => {
  const [isAddFormOpen, setIsAddFormOpen] = React.useState(false);
  const [editingMedication, setEditingMedication] = React.useState(null);
  const { toast } = useToast();
  const [medications, setMedications] = React.useState([
    { id: 1, name: "Vitamin D3", dosage: "1 tablet (5000 IU)", frequency: "Daily", time: "Morning with breakfast", forMember: "Alex", status: "on_schedule", notes: "Boosts immune system." },
    { id: 2, name: "Metformin XR", dosage: "500mg", frequency: "Twice Daily", time: "8 AM, 8 PM with meals", forMember: "Sarah", status: "refill_needed", notes: "For blood sugar control. Refill due next week." },
    { id: 3, name: "Amoxicillin", dosage: "250mg", frequency: "Every 8 hours", time: "As needed for infection", forMember: "Michael", status: "completed_course", notes: "Finished course on 2025-05-01." },
    { id: 4, name: "Ibuprofen", dosage: "200mg", frequency: "As needed for pain", time: "Max 3 times/day", forMember: "General", status: "on_schedule", notes: "Keep for headaches or minor pain." },
  ]);

  const familyMembers = ["Alex", "Sarah", "Michael", "Demo User", "General"];

  const handleAddOrUpdateMedication = (medData) => {
    if (editingMedication) {
      setMedications(meds => meds.map(m => m.id === editingMedication.id ? { ...m, ...medData } : m));
      toast({ title: "Medication Updated!", description: `${medData.name} details have been updated.` });
    } else {
      setMedications(prevMeds => [...prevMeds, { ...medData, id: Date.now(), status: 'on_schedule' }]);
      toast({ title: "Medication Added!", description: `${medData.name} has been added to the list.` });
    }
    setEditingMedication(null);
    setIsAddFormOpen(false);
  };

  const handleEditMedication = (med) => {
    setEditingMedication(med);
    setIsAddFormOpen(true);
  };
  
  const handleDeleteMedication = (medId) => {
     setMedications(meds => meds.filter(m => m.id !== medId));
     toast({ title: "Medication Removed", description: "The medication has been removed from the list.", variant: "destructive" });
  };

  const markMedicationTaken = (medId) => {
    // This would typically update a log and possibly the medication's status
    const med = medications.find(m => m.id === medId);
    toast({ title: "Medication Logged", description: `${med.name} marked as taken.` });
  };

  const markMedicationSkipped = (medId) => {
    const med = medications.find(m => m.id === medId);
    toast({ title: "Medication Logged", description: `${med.name} marked as skipped.`, variant: "destructive" });
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale:0.95 },
    visible: { y: 0, opacity: 1, scale:1, transition: {type: "spring", stiffness:120, damping:15} }
  };

  const getStatusInfo = (status) => {
    if (status === "refill_needed") return { text: "Refill Needed", color: "text-orange-400", bg: "bg-orange-500/10 dark:bg-orange-600/20", icon: <AlertTriangle size={14} /> };
    if (status === "completed_course") return { text: "Course Completed", color: "text-green-400", bg: "bg-green-500/10 dark:bg-green-600/20", icon: <CheckSquare size={14}/> };
    return { text: "On Schedule", color: "text-sky-400", bg: "bg-sky-500/10 dark:bg-sky-600/20", icon: <Pill size={14}/> };
  };

  return (
    <TooltipProvider delayDuration={100}>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight holographic-text">Medication Hub</h1>
          <p className="text-muted-foreground">Manage all family medications, schedules, and reminders.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10 futuristic-glow-primary">
            <History className="mr-2 h-4 w-4" /> View Log
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-lg futuristic-glow-accent" onClick={() => {setEditingMedication(null); setIsAddFormOpen(true)}}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Medication
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glassmorphic shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl futuristic-glow-primary group">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg"><BellDot className="text-red-400 animate-pulse group-hover:text-red-300"/>Active Reminders</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p><strong className="text-foreground/80 dark:text-slate-300">3</strong> active medication reminders.</p>
            <p className="text-xs text-muted-foreground dark:text-slate-400">Next: Metformin for Sarah at 8:00 AM</p>
            <Button variant="link" className="p-0 h-auto text-primary dark:text-accent text-sm mt-1">Manage Reminders &rarr;</Button>
          </CardContent>
        </Card>
        <Card className="glassmorphic shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl futuristic-glow-primary group">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg"><Pill className="text-teal-400 group-hover:animate-pulse"/>Medication Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>Total <strong className="text-foreground/80 dark:text-slate-300">{medications.length}</strong> medications tracked.</p>
            <p className="text-xs text-muted-foreground dark:text-slate-400">{medications.filter(m => m.status === 'refill_needed').length} items need refill.</p>
          </CardContent>
        </Card>
         <Card className="glassmorphic shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl futuristic-glow-primary group">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Missed Dose Tracking</CardTitle>
            <CardDescription className="text-xs">Ensure adherence to schedules.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-muted-foreground dark:text-slate-400">No missed doses in the last 24 hours. Great job!</p>
            <Button variant="link" className="p-0 h-auto text-primary dark:text-accent text-sm mt-1">View Full History &rarr;</Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4 tracking-tight text-foreground dark:text-slate-200">Current Medications ({medications.length})</h2>
        {medications.length > 0 ? (
          <div className="space-y-4">
            {medications.map((med) => {
              const status = getStatusInfo(med.status);
              return (
              <motion.div key={med.id} variants={itemVariants}>
                <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl glassmorphic border ${status.glow}`}>
                  <CardHeader className={`p-4 border-b border-border/30 dark:border-slate-700/50 ${status.bg}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className={`text-xl font-semibold ${status.color}`}>{med.name}</CardTitle>
                            <CardDescription className="text-xs text-muted-foreground dark:text-slate-400">For: {med.forMember}</CardDescription>
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border border-current/30 ${status.bg} ${status.color}`}>
                            {status.icon}
                            <span className="uppercase tracking-wider">{status.text}</span>
                        </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-sm"><strong className="text-foreground/80 dark:text-slate-300">Dosage:</strong> {med.dosage}</p>
                    <p className="text-sm"><strong className="text-foreground/80 dark:text-slate-300">Schedule:</strong> {med.frequency} at {med.time}</p>
                    {med.notes && <p className="text-xs italic text-muted-foreground dark:text-slate-400 bg-secondary/30 dark:bg-slate-700/30 p-2 rounded-md">Note: {med.notes}</p>}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-border/20 dark:border-slate-700/40 mt-3">
                        <Button size="sm" variant="outline" className="text-xs h-auto p-1.5 border-green-500/50 text-green-500 hover:bg-green-500/10 futuristic-glow-primary" onClick={() => markMedicationTaken(med.id)}>
                            <CheckSquare size={14} className="mr-1.5"/> Taken
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-auto p-1.5 border-red-500/50 text-red-500 hover:bg-red-500/10 futuristic-glow-accent" onClick={() => markMedicationSkipped(med.id)}>
                            <XSquare size={14} className="mr-1.5"/> Skipped
                        </Button>
                        <div className="flex-grow"/>
                        <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-sky-500" onClick={() => handleEditMedication(med)}><Pill size={16} /></Button></TooltipTrigger><TooltipContent className="glassmorphic"><p>Edit Details</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500" onClick={() => handleDeleteMedication(med.id)}><History size={16} /></Button></TooltipTrigger><TooltipContent className="glassmorphic"><p>Delete (Log)</p></TooltipContent></Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )})}
          </div>
        ) : (
          <motion.div variants={itemVariants} className="text-center py-10 glassmorphic rounded-xl">
            <Pill size={48} className="mx-auto text-primary dark:text-accent mb-4" />
            <p className="text-lg font-semibold text-muted-foreground">No medications added yet.</p>
            <p className="text-sm text-muted-foreground">Click "Add Medication" to start tracking.</p>
          </motion.div>
        )}
      </motion.div>
      <AddMedicationForm 
        isOpen={isAddFormOpen} 
        setIsOpen={setIsAddFormOpen} 
        onSave={handleAddOrUpdateMedication} 
        medicationData={editingMedication}
        familyMembers={familyMembers}
      />
    </motion.div>
    </TooltipProvider>
  );
};

export default MedicationList;
  