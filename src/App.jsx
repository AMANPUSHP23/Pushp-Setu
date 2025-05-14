
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '@/routes';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { useFamilyStore } from '@/stores/familyStore';

function App() {
  const family = useFamilyStore(state => state.family); 
  React.useEffect(() => {
    if (family.length === 0) {
      console.log("Initializing with default family member for demo purposes.");
      useFamilyStore.getState().addMember({ id: 'default-user', name: 'Demo User', avatar: 'https://images.unsplash.com/photo-1487637987171-9a3af0e6eb18' });
    }
  }, [family]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="pushpsetu-theme">
      <Router>
        <AppRoutes />
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
  