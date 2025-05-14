
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GroceryList = ({ isOpen, setIsOpen }) => {
  const [items, setItems] = React.useState([
    { id: 1, name: "Milk", checked: false },
    { id: 2, name: "Eggs", checked: true },
    { id: 3, name: "Bread", checked: false },
  ]);
  const [newItemName, setNewItemName] = React.useState("");

  const handleAddItem = () => {
    if (newItemName.trim() === "") return;
    setItems([...items, { id: Date.now(), name: newItemName, checked: false }]);
    setNewItemName("");
  };

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };
  
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
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
          <DialogContent className="sm:max-w-md bg-card/90 dark:bg-slate-900/90 backdrop-blur-lg border-border/50 dark:border-slate-800/50 shadow-2xl rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold gradient-text">Grocery List</DialogTitle>
              <DialogDescription>
                Manage your shopping items. Check off what you've got!
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  placeholder="Add new item..." 
                  value={newItemName} 
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                  className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70"
                />
                <Button onClick={handleAddItem} size="icon" className="bg-primary hover:bg-primary/90 dark:bg-accent dark:hover:bg-accent/90 text-primary-foreground shrink-0">
                  <PlusCircle size={20} />
                </Button>
              </div>
              <ul className="space-y-2">
                {items.map(item => (
                  <motion.li 
                    key={item.id} 
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center justify-between p-2 rounded-md bg-secondary/50 dark:bg-slate-800/40 hover:bg-secondary/70 dark:hover:bg-slate-700/60 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={`item-${item.id}`} 
                        checked={item.checked} 
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      <Label htmlFor={`item-${item.id}`} className={`text-sm ${item.checked ? 'line-through text-muted-foreground' : 'text-foreground dark:text-slate-200'}`}>
                        {item.name}
                      </Label>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-500" onClick={() => deleteItem(item.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </motion.li>
                ))}
              </ul>
              {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Your grocery list is empty. Add some items!</p>}
            </div>
            <DialogFooter className="mt-2 flex sm:justify-between gap-2">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">
                <Share2 className="mr-2 h-4 w-4" /> Share List
              </Button>
              <Button onClick={() => setIsOpen(false)} className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-md">Done</Button>
            </DialogFooter>
          </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default GroceryList;
  