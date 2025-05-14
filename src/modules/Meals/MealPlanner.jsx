import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Download, Utensils, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecipeModal from '@/modules/Meals/RecipeModal';
import GroceryList from '@/modules/Meals/GroceryList';
import { useToast } from '@/components/ui/use-toast';
import useAppStore from '@/stores/appStore';

const MealPlanner = () => {
  const [isRecipeModalOpen, setIsRecipeModalOpen] = React.useState(false);
  const [isGroceryListOpen, setIsGroceryListOpen] = React.useState(false);
  const { toast } = useToast();

  const { 
    meals,
    addMeal,
    updateMeal,
    deleteMeal,
    settings 
  } = useAppStore();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleAddMeal = (day, mealType, meal) => {
    const existingMeal = meals.find(m => m.day === day && m.type === mealType);
    if (existingMeal) {
      updateMeal(existingMeal.id, { ...existingMeal, name: meal });
    } else {
      addMeal({ day, type: mealType, name: meal });
    }
    toast({
      title: "Meal Added!",
      description: `${meal} has been added to ${day}'s ${mealType}.`,
    });
  };

  const handleDeleteMeal = (mealId) => {
    deleteMeal(mealId);
    toast({
      title: "Meal Removed!",
      description: "The meal has been removed from the plan.",
      variant: "destructive"
    });
  };

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

  const getMealForDay = (day, type) => {
    return meals.find(m => m.day === day && m.type === type)?.name;
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight gradient-text">Meal Planner</h1>
          <p className="text-muted-foreground">Plan your delicious and healthy meals for the week.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10" onClick={() => setIsGroceryListOpen(true)}>
            <ShoppingCart className="mr-2 h-4 w-4" /> View Grocery List
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-md" onClick={() => setIsRecipeModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Recipe
          </Button>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-card/80 dark:bg-slate-800/60 backdrop-blur-md border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Utensils className="text-green-500"/>Recipe Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You have <strong>{meals.length}</strong> saved recipes.</p>
            <Button variant="link" className="p-0 h-auto text-primary dark:text-accent mt-1">Browse Recipes &rarr;</Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-card/80 dark:bg-slate-800/60 backdrop-blur-md border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShoppingCart className="text-blue-500"/>Current Grocery List</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground"><strong>23</strong> items on your list.</p>
            <Button variant="link" className="p-0 h-auto text-primary dark:text-accent mt-1" onClick={() => setIsGroceryListOpen(true)}>View & Share List &rarr;</Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-card/80 dark:bg-slate-800/60 backdrop-blur-md border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Download className="text-purple-500"/>Export & Share</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Easily share your meal plan or grocery list.</p>
            <Button variant="outline" size="sm" className="mt-2 border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">Export Plan (PDF)</Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4 tracking-tight text-foreground dark:text-slate-200">Weekly Meal Grid</h2>
        <div className="overflow-x-auto rounded-lg border border-border/30 shadow-md bg-card/50 dark:bg-slate-800/40 backdrop-blur-sm">
          <table className="min-w-full divide-y divide-border/30 dark:divide-slate-700/50">
            <thead className="bg-secondary/30 dark:bg-slate-700/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Day</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Breakfast</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Lunch</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Dinner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20 dark:divide-slate-700/30">
              {days.map(day => (
                <motion.tr key={day} variants={itemVariants} className="hover:bg-secondary/20 dark:hover:bg-slate-700/20 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-foreground dark:text-slate-300">{day}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                    {getMealForDay(day, 'breakfast') || (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-auto p-1 text-xs"
                        onClick={() => handleAddMeal(day, 'breakfast', 'New Breakfast')}
                      >
                        Add +
                      </Button>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                    {getMealForDay(day, 'lunch') || (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-auto p-1 text-xs"
                        onClick={() => handleAddMeal(day, 'lunch', 'New Lunch')}
                      >
                        Add +
                      </Button>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                    {getMealForDay(day, 'dinner') || (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-auto p-1 text-xs"
                        onClick={() => handleAddMeal(day, 'dinner', 'New Dinner')}
                      >
                        Add +
                      </Button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      <RecipeModal 
        isOpen={isRecipeModalOpen} 
        setIsOpen={setIsRecipeModalOpen}
        onAddMeal={handleAddMeal}
      />
      <GroceryList 
        isOpen={isGroceryListOpen} 
        setIsOpen={setIsGroceryListOpen}
        meals={meals}
      />
    </motion.div>
  );
};

export default MealPlanner;
  