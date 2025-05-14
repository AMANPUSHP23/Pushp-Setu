import React from 'react';
import { Button } from '@/components/ui/button';
import useAppStore from '@/stores/appStore';

const mealTypes = [
  { type: 'breakfast', label: 'Breakfast' },
  { type: 'lunch', label: 'Lunch' },
  { type: 'dinner', label: 'Dinner' },
];

const getToday = () => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
};

const TodaysMealHighlights = ({ onViewFullPlan }) => {
  const { meals } = useAppStore();
  const today = getToday();

  const getMealStatus = (meal) => {
    // You can expand this logic for more statuses
    if (!meal) return { status: 'Planned', color: 'text-green-400' };
    if (meal.name && meal.name.toLowerCase().includes('prep')) return { status: 'Prep Needed', color: 'text-orange-400' };
    return { status: 'Planned', color: 'text-green-400' };
  };

  return (
    <div className="rounded-2xl bg-card/80 dark:bg-slate-800/50 p-6 shadow-xl border border-border/30">
      <h2 className="gradient-text text-2xl mb-1">Today's Meal Highlights</h2>
      <p className="text-muted-foreground mb-4">Delicious and planned for you.</p>
      <div className="space-y-2">
        {mealTypes.map(({ type, label }) => {
          const meal = meals.find(m => m.day === today && m.type === type);
          const status = getMealStatus(meal);
          return (
            <div key={type} className="flex justify-between items-center text-sm">
              <span className="font-bold text-foreground/90 dark:text-slate-200">{label}:</span>
              <span>{meal ? meal.name : 'Not Planned'}</span>
              <span className={`ml-2 text-xs font-semibold ${status.color}`}>{status.status}</span>
            </div>
          );
        })}
      </div>
      <Button
        variant="outline"
        className="mt-6 w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10"
        onClick={onViewFullPlan}
      >
        View Full Meal Plan
      </Button>
    </div>
  );
};

export default TodaysMealHighlights; 