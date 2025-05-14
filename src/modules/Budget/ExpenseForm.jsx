
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming Select is created
import { motion, AnimatePresence } from 'framer-motion';

const ExpenseForm = ({ isOpen, setIsOpen, transactionData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transaction Saved/Updated");
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
          <DialogContent className="sm:max-w-md bg-card/90 dark:bg-slate-900/90 backdrop-blur-lg border-border/50 dark:border-slate-800/50 shadow-2xl rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold gradient-text">{transactionData ? 'Edit Transaction' : 'Add New Transaction'}</DialogTitle>
              <DialogDescription>
                {transactionData ? 'Update the details of this transaction.' : 'Log a new income or expense.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type" className="text-foreground/80 dark:text-slate-300">Type</Label>
                  <Select defaultValue={transactionData?.type || "expense"}>
                    <SelectTrigger id="type" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount" className="text-foreground/80 dark:text-slate-300">Amount</Label>
                  <Input id="amount" type="number" step="0.01" defaultValue={transactionData?.amount} placeholder="e.g., 50.00" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-foreground/80 dark:text-slate-300">Category</Label>
                <Input id="category" defaultValue={transactionData?.category} placeholder="e.g., Groceries, Salary" className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date" className="text-foreground/80 dark:text-slate-300">Date</Label>
                <Input id="date" type="date" defaultValue={transactionData?.date || new Date().toISOString().substring(0,10)} className="bg-background/70 dark:bg-slate-800/70 border-border/70 dark:border-slate-700/70" />
              </div>
            </form>
            <DialogFooter className="mt-2">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">Cancel</Button>
              <Button type="submit" onClick={handleSubmit} className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-md">{transactionData ? 'Save Changes' : 'Add Transaction'}</Button>
            </DialogFooter>
          </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ExpenseForm;
  