
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, CalendarDays, Users, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventModal from '@/modules/Calendar/EventModal';

const CalendarPage = () => {
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(new Date());

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

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 = Sunday

  const renderCalendarGrid = () => {
    const totalDays = daysInMonth(currentDate);
    const startingDay = firstDayOfMonth(currentDate);
    const grid = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) { 
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          week.push(<td key={`empty-${j}`} className="p-2 h-20 border border-border/20 dark:border-slate-700/30"></td>);
        } else if (dayCounter <= totalDays) {
          const isToday = dayCounter === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
          week.push(
            <td key={`day-${dayCounter}`} className={`p-2 h-20 border border-border/20 dark:border-slate-700/30 relative group hover:bg-secondary/30 dark:hover:bg-slate-700/40 transition-colors ${isToday ? 'bg-primary/10 dark:bg-primary/20' : ''}`}>
              <span className={`text-sm font-medium ${isToday ? 'text-primary dark:text-accent font-bold' : 'text-foreground/80 dark:text-slate-300'}`}>{dayCounter}</span>
              {/* Placeholder for events */}
              {dayCounter % 5 === 0 && <div className="mt-1 text-xs text-blue-500 truncate">Team Meeting</div>}
              <Button size="xs" variant="ghost" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto" onClick={() => setIsEventModalOpen(true)}><PlusCircle size={14}/></Button>
            </td>
          );
          dayCounter++;
        } else {
          week.push(<td key={`empty-fill-${j}`} className="p-2 h-20 border border-border/20 dark:border-slate-700/30"></td>);
        }
      }
      grid.push(<tr key={`week-${i}`}>{week}</tr>);
      if (dayCounter > totalDays && i >= Math.floor((totalDays + startingDay -1) / 7) ) break; 
    }
    return grid;
  };
  
  const changeMonth = (offset) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight gradient-text">Family Calendar</h1>
          <p className="text-muted-foreground">Coordinate schedules and plan events together.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">
            <Filter className="mr-2 h-4 w-4" /> Filter View
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-md" onClick={() => setIsEventModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-card/80 dark:bg-slate-800/60 backdrop-blur-md border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarDays className="text-blue-500"/>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Tomorrow:</strong> Soccer Practice (5 PM)</p>
            <p><strong>May 15:</strong> Movie Night</p>
            <Button variant="link" className="p-0 h-auto text-primary dark:text-accent mt-1">View All &rarr;</Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-card/80 dark:bg-slate-800/60 backdrop-blur-md border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="text-green-500"/>Shared With</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This calendar is shared with <strong>4 family members</strong>.</p>
            <Button variant="link" className="p-0 h-auto text-primary dark:text-accent mt-1">Manage Sharing &rarr;</Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-card/80 dark:bg-slate-800/60 backdrop-blur-md border border-border/30">
          <CardHeader>
            <CardTitle>Google Calendar Sync</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Connect your Google Calendar for seamless integration.</p>
            <Button variant="outline" size="sm" className="mt-2 border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">Connect Google Calendar</Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl bg-card/80 dark:bg-slate-800/60 backdrop-blur-md border border-border/30">
          <CardHeader className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => changeMonth(-1)}>&lt;</Button>
              <CardTitle className="text-xl md:text-2xl gradient-text">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => changeMonth(1)}>&gt;</Button>
            </div>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())} className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">Today</Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed border-collapse">
                <thead>
                  <tr>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                      <th key={day} className="p-2 text-xs font-medium text-muted-foreground uppercase border-b border-border/30 dark:border-slate-700/50 w-1/7">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {renderCalendarGrid()}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <EventModal isOpen={isEventModalOpen} setIsOpen={setIsEventModalOpen} />
    </motion.div>
  );
};

export default CalendarPage;
  