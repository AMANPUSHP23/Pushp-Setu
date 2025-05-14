import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Bell, TrendingUp, TrendingDown, PieChart, Settings2, AlertOctagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpenseForm from '@/modules/Budget/ExpenseForm'; 
import SpendingChart from '@/modules/Budget/SpendingChart';
import { useToast } from '@/components/ui/use-toast';
import useAppStore from '@/stores/appStore';

const BudgetDashboard = () => {
  const [isExpenseFormOpen, setIsExpenseFormOpen] = React.useState(false);
  const { toast } = useToast();
  
  const { 
    transactions, 
    addTransaction,
    updateTransaction,
    deleteTransaction,
    settings 
  } = useAppStore();

  const handleAddTransaction = (newTransaction) => {
    addTransaction(newTransaction);
    toast({
      title: "Transaction Added!",
      description: `${newTransaction.type === 'income' ? 'Income' : 'Expense'} of $${newTransaction.amount} for ${newTransaction.category} recorded.`,
    });
  };

  const handleUpdateTransaction = (id, updates) => {
    updateTransaction(id, updates);
    toast({
      title: "Transaction Updated!",
      description: "The transaction has been updated successfully.",
    });
  };

  const handleDeleteTransaction = (id) => {
    deleteTransaction(id);
    toast({
      title: "Transaction Deleted!",
      description: "The transaction has been removed.",
      variant: "destructive"
    });
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  const billReminders = [
    { id: 1, name: "Rent Payment", dueDate: "2025-06-01", amount: 1200, status: "upcoming" },
    { id: 2, name: "Electricity Bill", dueDate: "2025-05-15", amount: 75, status: "due_soon" },
    { id: 3, name: "Internet Bill", dueDate: "2025-05-20", amount: 60, status: "upcoming" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness:120, damping:15 } }
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight holographic-text">Financial Command Center</h1>
          <p className="text-muted-foreground">Oversee your family's financial well-being.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10 futuristic-glow-primary">
            <Settings2 className="mr-2 h-4 w-4" /> Budget Settings
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-lg futuristic-glow-accent" onClick={() => setIsExpenseFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glassmorphic shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl futuristic-glow-primary group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80 dark:text-slate-300">Total Balance</CardTitle>
            <PieChart className="h-5 w-5 text-primary dark:text-accent group-hover:animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground dark:text-white">${totalBalance.toFixed(2)}</div>
            <p className={`text-xs ${totalIncome > totalExpenses ? 'text-green-500' : 'text-red-500'}`}>
                {totalIncome > totalExpenses ? '+' : ''}${(totalIncome - totalExpenses - 201).toFixed(2)} from last month (example)
            </p>
          </CardContent>
        </Card>
        <Card className="glassmorphic shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl futuristic-glow-primary group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80 dark:text-slate-300">Monthly Income</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-400 group-hover:animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">+${totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground dark:text-slate-400">Mainly from Salary</p>
          </CardContent>
        </Card>
        <Card className="glassmorphic shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl futuristic-glow-primary group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80 dark:text-slate-300">Monthly Expenses</CardTitle>
            <TrendingDown className="h-5 w-5 text-red-400 group-hover:animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">-${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground dark:text-slate-400">Groceries highest category</p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
        <Card className="glassmorphic shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl lg:col-span-1">
          <CardHeader>
            <CardTitle className="gradient-text text-xl">Spending Analytics</CardTitle>
            <CardDescription>Visualize your expenses by category.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            <SpendingChart transactions={transactions} />
          </CardContent>
        </Card>
        <Card className="glassmorphic shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl text-foreground dark:text-slate-200 flex items-center gap-2"><Bell className="text-amber-500" />Bill Reminders</CardTitle>
            <CardDescription>Stay on top of upcoming payments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-72 overflow-y-auto">
            {billReminders.map(bill => (
              <div key={bill.id} className={`p-3 rounded-lg flex justify-between items-center border ${bill.status === 'due_soon' ? 'border-red-500/50 bg-red-500/10 futuristic-glow-accent' : 'border-border/30 bg-secondary/50 dark:bg-slate-700/40'}`}>
                <div>
                  <p className={`font-semibold ${bill.status === 'due_soon' ? 'text-red-400' : 'text-foreground/90 dark:text-slate-200'}`}>{bill.name}</p>
                  <p className="text-xs text-muted-foreground dark:text-slate-400">Due: {bill.dueDate} - Amount: ${bill.amount}</p>
                </div>
                <Button size="sm" variant={bill.status === 'due_soon' ? 'destructive' : 'outline'} className="text-xs h-auto py-1 px-2">
                  {bill.status === 'due_soon' ? <AlertOctagon size={14} className="mr-1.5"/> : null}
                  Pay Now
                </Button>
              </div>
            ))}
             {billReminders.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No upcoming bill reminders.</p>}
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants} className="lg:col-span-2">
           <Card className="glassmorphic shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl text-foreground dark:text-slate-200">Recent Transactions</CardTitle>
              <CardDescription>Last few financial activities.</CardDescription>
            </CardHeader>
            <CardContent className="max-h-80 overflow-y-auto">
              <ul className="space-y-3">
                {transactions.slice(-5).reverse().map(t => (
                  <li key={t.id} className="flex justify-between items-center text-sm p-3 rounded-lg bg-secondary/50 dark:bg-slate-700/40 hover:bg-secondary/70 dark:hover:bg-slate-700/60 transition-colors">
                    <div>
                      <span className="font-medium text-foreground/90 dark:text-slate-200">{t.category}</span>
                      <p className="text-xs text-muted-foreground dark:text-slate-400">{new Date(t.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`font-semibold text-lg ${t.type === 'income' ? 'text-green-400 futuristic-glow-primary' : 'text-red-400 futuristic-glow-accent'}`}>
                      {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                    </span>
                  </li>
                ))}
                 {transactions.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No transactions yet.</p>}
              </ul>
              {transactions.length > 5 && <Button variant="link" className="p-0 h-auto text-primary dark:text-accent mt-3 text-sm">View All Transactions &rarr;</Button>}
            </CardContent>
          </Card>
        </motion.div>

      <ExpenseForm 
        isOpen={isExpenseFormOpen} 
        setIsOpen={setIsExpenseFormOpen} 
        onAddTransaction={handleAddTransaction} 
      />
    </motion.div>
  );
};

export default BudgetDashboard;
  