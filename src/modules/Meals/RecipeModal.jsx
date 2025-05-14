
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

const RecipeModal = ({ isOpen, setIsOpen, recipeData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe Saved/Updated");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
          <DialogContent className="sm:max-w-lg bg-card/90 dark:bg-slate-900/90 backdrop-blur-lg border-border/50 dark:border-slate-800/50 shadow-2xl rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold gradient-text">{recipeData ? 'Edit Recipe' : 'Add New Recipe'}</DialogTitle>
              <DialogDescription>
                {recipeData ? 'Update the details of your recipe.' : 'Share your culinary creations with the family.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid gap-2">
                <Label htmlFor="recipe-name" className="text-foreground/80 dark:text-slate-300">Recipe Name</Label>
                <Input id="recipe-name" defaultValue={recipeData?.name} placeholder="e.g., Spaghetti Carbonara" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ingredients" className="text-foreground/80 dark:text-slate-300">Ingredients</Label>
                <Textarea id="ingredients" defaultValue={recipeData?.ingredients} placeholder="List ingredients, one per line..." rows={4} className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instructions" className="text-foreground/80 dark:text-slate-300">Instructions</Label>
                <Textarea id="instructions" defaultValue={recipeData?.instructions} placeholder="Step-by-step instructions..." rows={6} className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="prep-time" className="text-foreground/80 dark:text-slate-300">Prep Time (mins)</Label>
                    <Input id="prep-time" type="number" defaultValue={recipeData?.prepTime} placeholder="e.g., 15" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="cook-time" className="text-foreground/80 dark:text-slate-300">Cook Time (mins)</Label>
                    <Input id="cook-time" type="number" defaultValue={recipeData?.cookTime} placeholder="e.g., 30" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                </div>
              </div>
               <div className="grid gap-2">
                <Label htmlFor="image-url" className="text-foreground/80 dark:text-slate-300">Image URL (Optional)</Label>
                <Input id="image-url" defaultValue={recipeData?.imageUrl} placeholder="Link to a picture of the dish" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
            </form>
            <DialogFooter className="mt-2">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">Cancel</Button>
              <Button type="submit" onClick={handleSubmit} className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-md">{recipeData ? 'Save Changes' : 'Add Recipe'}</Button>
            </DialogFooter>
          </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default RecipeModal;
  