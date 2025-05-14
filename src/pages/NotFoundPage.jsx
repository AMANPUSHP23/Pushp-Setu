
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <AlertTriangle className="h-24 w-24 text-destructive mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-destructive mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-foreground mb-2">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't seem to exist. It might have been moved, deleted, or maybe you just mistyped the URL.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
          <Link to="/">Go Back to Dashboard</Link>
        </Button>
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <img 
          alt="Sad emoji or lost robot illustration"
          className="h-32 w-32 opacity-30"
         src="https://images.unsplash.com/photo-1653850406497-7fbef761b6ac" />
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
  