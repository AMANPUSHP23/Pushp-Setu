import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, ListChecks, Utensils, BarChart3, Settings } from 'lucide-react';

const hubFeatures = [
  {
    title: 'Chores & Tasks',
    description: 'View and manage all household chores and responsibilities.',
    icon: <ListChecks className="h-8 w-8 text-primary" />, link: '/chores'
  },
  {
    title: 'Meal Planner',
    description: 'Plan meals, view recipes, and manage your grocery list.',
    icon: <Utensils className="h-8 w-8 text-accent" />, link: '/meals'
  },
  {
    title: 'Smart Budgeting',
    description: 'Track expenses, manage bills, and view your family budget.',
    icon: <BarChart3 className="h-8 w-8 text-green-500" />, link: '/budget'
  },
  {
    title: 'Family Hub',
    description: 'Connect and coordinate with all family members.',
    icon: <Users className="h-8 w-8 text-purple-500" />, link: '/emergency-info'
  },
  {
    title: 'Settings',
    description: 'Customize your PushpSetu experience.',
    icon: <Settings className="h-8 w-8 text-yellow-500" />, link: '/settings'
  },
];

const HouseholdHubPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 gradient-text">Your Household Hub</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Access all your household management features in one place. Jump to chores, meals, budgeting, family, and more!
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hubFeatures.map(feature => (
          <Card key={feature.title} className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-card/80 dark:bg-slate-800/50 border border-border/30 group">
            <Link to={feature.link} className="block p-6 hover:bg-white/5 dark:hover:bg-black/10 transition-colors rounded-xl">
              <CardHeader className="flex flex-row items-center gap-4 mb-2">
                {feature.icon}
                <CardTitle className="text-xl font-semibold text-foreground dark:text-slate-100">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground dark:text-slate-400">{feature.description}</CardDescription>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HouseholdHubPage; 