import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import useAppStore from '@/stores/appStore';

const getChoreGroups = (chores) => {
  // Group chores by title (or use a category field if available)
  const groups = {};
  chores.forEach(chore => {
    const key = chore.title; // Change to chore.category if you have categories
    if (!groups[key]) groups[key] = [];
    groups[key].push(chore);
  });
  return groups;
};

const ChoreProgressOverview = ({ onManageAll }) => {
  const { chores } = useAppStore();
  const groups = getChoreGroups(chores);

  return (
    <div className="rounded-2xl bg-card/80 dark:bg-slate-800/50 p-6 shadow-xl border border-border/30">
      <h2 className="gradient-text text-2xl mb-1">Chore Progress Overview</h2>
      <p className="text-muted-foreground mb-4">Stay on top of household tasks.</p>
      <div className="space-y-3">
        {Object.entries(groups).map(([type, chores]) => {
          const completed = chores.filter(c => c.status === 'completed').length;
          const percent = chores.length > 0 ? Math.round((completed / chores.length) * 100) : 0;
          return (
            <div key={type}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground/80 dark:text-slate-300">{type}</span>
                <span className="font-semibold text-primary">{percent}%</span>
              </div>
              <div className="w-full bg-secondary dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-sky-400 to-blue-500 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1, ease: 'circOut' }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Button
        variant="outline"
        className="mt-6 w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10"
        onClick={onManageAll}
      >
        Manage All Chores
      </Button>
    </div>
  );
};

export default ChoreProgressOverview; 