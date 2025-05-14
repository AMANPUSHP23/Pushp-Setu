
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logging out...");
    setTimeout(() => {
      navigate('/'); 
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1] 
        }}
        className="p-8 md:p-12 bg-card/80 dark:bg-slate-800/60 backdrop-blur-lg shadow-2xl rounded-xl border border-border/30 max-w-md w-full"
      >
        <LogOut className="h-16 w-16 text-primary dark:text-accent mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-foreground dark:text-slate-100 mb-3">Leaving So Soon?</h1>
        <p className="text-md text-muted-foreground dark:text-slate-400 mb-8">
          Are you sure you want to log out of PushpSetu? All unsaved changes might be lost.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10 flex-1"
            asChild
          >
            <Link to="/"><Home className="mr-2 h-4 w-4" /> Stay Logged In</Link>
          </Button>
          <Button 
            size="lg" 
            variant="destructive"
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90 transition-opacity shadow-lg hover:shadow-red-500/50 flex-1"
          >
            <LogOut className="mr-2 h-4 w-4" /> Confirm Log Out
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default LogoutPage;
  