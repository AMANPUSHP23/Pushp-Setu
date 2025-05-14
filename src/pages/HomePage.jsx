import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Clock, Zap, Users, BarChart3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ChoreProgressOverview from '@/components/ChoreProgressOverview';
import TodaysMealHighlights from '@/components/TodaysMealHighlights';

const HomePage = () => {
  const navigate = useNavigate();
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1] 
      }
    })
  };

  const quickStats = [
    { title: "Upcoming Tasks", value: "5", icon: <Clock className="h-6 w-6 text-sky-400" />, bgColor: "bg-sky-500/10 dark:bg-sky-500/20", borderColor: "border-sky-500/30", link: "/chores" },
    { title: "Pending Bills", value: "2", icon: <AlertTriangle className="h-6 w-6 text-rose-400" />, bgColor: "bg-rose-500/10 dark:bg-rose-500/20", borderColor: "border-rose-500/30", link: "/budget" },
    { title: "Groceries Needed", value: "12 items", icon: <CheckCircle className="h-6 w-6 text-emerald-400" />, bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20", borderColor: "border-emerald-500/30", link: "/meals" },
  ];

  const featureCards = [
    { title: "Family Hub", description: "Connect and coordinate with all family members.", icon: <Users className="h-10 w-10 text-primary" />, link: "/emergency-info" },
    { title: "Smart Budgeting", description: "Track expenses and manage finances effortlessly.", icon: <BarChart3 className="h-10 w-10 text-accent" />, link: "/budget" },
    { title: "Task Automation", description: "Simplify your daily routines with smart task management.", icon: <Zap className="h-10 w-10 text-yellow-400" />, link: "/chores" },
  ];

  // Handler for Manage All Chores button
  const handleManageAllChores = () => {
    navigate('/chores');
  };

  // Handler for View Full Meal Plan button
  const handleViewFullMealPlan = () => {
    navigate('/meals');
  };

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "circOut" }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
          <span className="gradient-text">Elevate Your Household</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          PushpSetu brings harmony to your home with intelligent management of chores, meals, finances, and more.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {quickStats.map((stat, index) => (
          <motion.custom
            key={stat.title}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            component={Card}
            className={`shadow-xl hover:shadow-2xl transition-all duration-300 ${stat.bgColor} border ${stat.borderColor} rounded-2xl overflow-hidden group`}
          >
            <Link to={stat.link} className="block hover:bg-white/5 dark:hover:bg-black/10 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5 px-5">
                <CardTitle className="text-base font-semibold text-foreground/90 dark:text-slate-200">{stat.title}</CardTitle>
                <span className="p-2 rounded-lg bg-background/50 dark:bg-slate-800/50 shadow-inner group-hover:scale-110 transition-transform">
                  {stat.icon}
                </span>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="text-3xl font-bold text-foreground dark:text-white">{stat.value}</div>
                <p className="text-xs text-muted-foreground dark:text-slate-400">View Details &rarr;</p>
              </CardContent>
            </Link>
          </motion.custom>
        ))}
      </div>

      <motion.div 
        variants={cardVariants} 
        initial="hidden" 
        animate="visible" 
        custom={quickStats.length}
        className="grid gap-6 lg:grid-cols-2"
      >
        <ChoreProgressOverview onManageAll={handleManageAllChores} />
        <TodaysMealHighlights onViewFullPlan={handleViewFullMealPlan} />
      </motion.div>

      <div className="text-center py-8">
        <h2 className="text-3xl font-bold tracking-tight mb-8 gradient-text">Discover PushpSetu Features</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featureCards.map((feature, index) => (
             <motion.custom
             key={feature.title}
             variants={cardVariants}
             initial="hidden"
             animate="visible"
             custom={quickStats.length + 2 + index}
             component={Card}
             className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-card/80 dark:bg-slate-800/50 backdrop-blur-md border border-border/30 group p-1"
           >
            <Link to={feature.link} className="block p-5 hover:bg-white/5 dark:hover:bg-black/10 transition-colors rounded-xl">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>
              <CardTitle className="text-xl font-semibold mb-2 text-foreground dark:text-slate-100">{feature.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground dark:text-slate-400">{feature.description}</CardDescription>
            </Link>
           </motion.custom>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: (quickStats.length + 2 + featureCards.length) * 0.1, duration: 0.7 }}
        className="text-center mt-10"
      >
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-lg hover:shadow-primary/50 dark:hover:shadow-accent/50 text-base px-10 py-6 rounded-xl"
          onClick={() => navigate('/hub')}
        >
          Explore Your Household Hub
        </Button>
      </motion.div>
    </div>
  );
};

export default HomePage;
  