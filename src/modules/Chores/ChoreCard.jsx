
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, User, Edit2, Trash2, Award, Info, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ChoreCard = ({ chore, onToggleStatus, onDelete, onEdit }) => {
  const getStatusInfo = () => {
    switch (chore.status) {
      case 'completed':
        return { icon: <CheckCircle className="text-green-400" />, text: 'Completed', color: 'text-green-400', bg: 'bg-green-500/10 dark:bg-green-600/20', glow: 'shadow-green-500/30' };
      case 'in_progress':
        return { icon: <Clock className="text-sky-400 animate-spin-slow" />, text: 'In Progress', color: 'text-sky-400', bg: 'bg-sky-500/10 dark:bg-sky-600/20', glow: 'shadow-sky-500/30' };
      default: // pending
        return { icon: <Clock className="text-amber-400" />, text: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10 dark:bg-amber-600/20', glow: 'shadow-amber-500/30' };
    }
  };
  const statusInfo = getStatusInfo();

  const cardVariants = {
    rest: { scale: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
    hover: { scale: 1.03, boxShadow: `0 10px 20px rgba(0,0,0,0.2), ${statusInfo.glow.replace('shadow-','')}` }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <motion.div
        layout
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className={`shadow-lg rounded-xl overflow-hidden glassmorphic border ${statusInfo.glow} group transition-all duration-300 ease-out`}>
          <CardHeader className={`p-4 border-b border-border/30 dark:border-slate-700/50 relative ${statusInfo.bg}`}>
            <CardTitle className={`text-lg font-semibold ${statusInfo.color} truncate`}>{chore.title}</CardTitle>
            <CardDescription className="text-xs flex items-center gap-1.5 text-muted-foreground dark:text-slate-400">
              <User size={12} /> {chore.assignedTo} 
              <span className="mx-1">&bull;</span>
              <Award size={12} /> {chore.points} pts
            </CardDescription>
            {chore.description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-primary">
                    <Info size={14}/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="glassmorphic max-w-xs">
                  <p className="text-sm">{chore.description}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className={`flex items-center justify-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full ${statusInfo.bg} ${statusInfo.color} border border-current/30`}>
              {statusInfo.icon}
              <span className="uppercase tracking-wider">{statusInfo.text}</span>
            </div>
            <p className="text-sm text-center text-muted-foreground dark:text-slate-400">Due: {new Date(chore.dueDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
            
            <div className="flex justify-between items-center pt-3 border-t border-border/20 dark:border-slate-700/40">
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-sky-500" onClick={() => onEdit && onEdit(chore)}><Edit2 size={16} /></Button></TooltipTrigger>
                  <TooltipContent className="glassmorphic"><p>Edit Chore</p></TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500" onClick={() => onDelete(chore.id)}><Trash2 size={16} /></Button></TooltipTrigger>
                  <TooltipContent className="glassmorphic"><p>Delete Chore</p></TooltipContent>
                </Tooltip>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant={chore.status === 'completed' ? "outline" : "default"}
                    className={`h-8 text-xs futuristic-glow-${chore.status === 'completed' ? 'accent' : 'primary'} ${chore.status === 'completed' ? 'border-amber-500/50 text-amber-500 hover:bg-amber-500/10' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white'}`}
                    onClick={() => onToggleStatus(chore.id, chore.status)}
                  >
                    {chore.status === 'pending' && <><CheckCircle size={14} className="mr-1.5"/>Start</>}
                    {chore.status === 'in_progress' && <><CheckCircle size={14} className="mr-1.5"/>Mark Done</>}
                    {chore.status === 'completed' && <><RotateCcw size={14} className="mr-1.5"/>Reopen</>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="glassmorphic">
                  {chore.status === 'pending' && <p>Start this chore</p>}
                  {chore.status === 'in_progress' && <p>Mark as completed</p>}
                  {chore.status === 'completed' && <p>Reopen this chore</p>}
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
};

export default ChoreCard;
  