import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Zap, Award, Filter, RotateCcw, CheckSquare, ListFilter, Calendar, Settings2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChoreCard from '@/modules/Chores/ChoreCard'; 
import AssignTaskModal from '@/modules/Chores/AssignTaskModal';
import AssignTaskModalV2 from '@/modules/Chores/AssignTaskModalV2';
import { useToast } from '@/components/ui/use-toast';
import useAppStore from '@/stores/appStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RedeemRewardsModal from '@/components/RedeemRewardsModal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';

const ChoresDashboard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalV2Open, setIsModalV2Open] = React.useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("dueDate");
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [timeRange, setTimeRange] = React.useState("week");
  const [isRewardsModalOpen, setIsRewardsModalOpen] = React.useState(false);
  const [rewardsModalOpenFor, setRewardsModalOpenFor] = React.useState(null);
  
  const { 
    chores, 
    addChore, 
    updateChore, 
    deleteChore,
    familyMembers,
    getLifetimePoints,
    resetAll
  } = useAppStore();

  const availablePoints = useAppStore(state => {
    const completedPoints = state.chores.filter(c => c.status === 'completed').reduce((sum, c) => sum + (c.points || 0), 0);
    const spent = state.rewardHistory.reduce((sum, r) => sum + r.points, 0);
    return Math.max(completedPoints - spent, 0);
  });

  const totalPoints = chores.filter(c => c.status === 'completed').reduce((sum, c) => sum + (c.points || 0), 0);
  const lifetimePoints = getLifetimePoints();

  // Calculate date ranges for filtering
  const getDateRange = (range) => {
    const now = new Date();
    const start = new Date();
    
    switch(range) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        return { start, end: now };
      case 'week':
        start.setDate(now.getDate() - 7);
        return { start, end: now };
      case 'month':
        start.setMonth(now.getMonth() - 1);
        return { start, end: now };
      default:
        return { start: new Date(0), end: now };
    }
  };

  // Calculate chore statistics
  const calculateChoreStats = () => {
    const { start, end } = getDateRange(timeRange);
    
    const filteredChores = chores.filter(chore => {
      const choreDate = new Date(chore.dueDate);
      return choreDate >= start && choreDate <= end;
    });

    const totalChores = filteredChores.length;
    const completedChores = filteredChores.filter(c => c.status === 'completed').length;
    const inProgressChores = filteredChores.filter(c => c.status === 'in_progress').length;
    const pendingChores = filteredChores.filter(c => c.status === 'pending').length;
    
    const completionRate = totalChores > 0 ? (completedChores / totalChores) * 100 : 0;
    
    // Calculate points earned in the selected time range
    const pointsEarned = filteredChores
      .filter(c => c.status === 'completed')
      .reduce((sum, chore) => sum + (chore.points || 0), 0);

    // Calculate average completion time
    const completedChoresWithDates = filteredChores.filter(c => c.status === 'completed' && c.completedAt);
    const avgCompletionTime = completedChoresWithDates.length > 0
      ? completedChoresWithDates.reduce((sum, chore) => {
          const assignedDate = new Date(chore.dueDate);
          const completedDate = new Date(chore.completedAt);
          return sum + (completedDate - assignedDate);
        }, 0) / completedChoresWithDates.length
      : 0;

    return {
      totalChores,
      completedChores,
      inProgressChores,
      pendingChores,
      completionRate,
      pointsEarned,
      avgCompletionTime
    };
  };

  const stats = calculateChoreStats();

  const handleAddChore = (newChore) => {
    addChore(newChore);
    toast({
      title: "Chore Added!",
      description: `${newChore.title} has been assigned to ${newChore.assignedTo}.`,
      variant: "default"
    });
  };
  
  const toggleChoreStatus = (choreId, currentStatus) => {
    let newStatus;
    if (currentStatus === "pending") newStatus = "in_progress";
    else if (currentStatus === "in_progress") newStatus = "completed";
    else newStatus = "pending";

    // Prevent reopening if it would make available points negative
    if (currentStatus === 'completed' && newStatus === 'pending') {
      const completedPoints = chores.filter(c => c.status === 'completed').reduce((sum, c) => sum + (c.points || 0), 0);
      const spent = useAppStore.getState().rewardHistory.reduce((sum, r) => sum + r.points, 0);
      const thisChore = chores.find(c => c.id === choreId);
      if (spent > (completedPoints - (thisChore.points || 0))) {
        toast({
          title: "Cannot Reopen Chore",
          description: "You have already redeemed rewards for these points. Complete more chores before reopening.",
          variant: "destructive"
        });
        return;
      }
    }

    const updates = { 
      status: newStatus,
      ...(newStatus === 'completed' && { completedAt: new Date().toISOString() })
    };

    updateChore(choreId, updates);
    const updatedChore = chores.find(c => c.id === choreId);
    console.log('Chore after status change:', { ...updatedChore, ...updates });
    toast({
      title: "Chore Updated!",
      description: `Status of chore changed to ${newStatus.replace("_", " ")}.`,
    });
  };

  const handleDeleteChore = (choreId) => {
    deleteChore(choreId);
    toast({
      title: "Chore Deleted!",
      description: `The chore has been removed.`,
      variant: "destructive"
    });
  }

  const handleBulkUpdate = (choreIds, updates) => {
    choreIds.forEach(id => {
      updateChore(id, updates);
    });
    toast({
      title: "Chores Updated!",
      description: `${choreIds.length} chores have been updated.`,
    });
  };

  const handleBulkDelete = (choreIds) => {
    choreIds.forEach(id => {
      deleteChore(id);
    });
    toast({
      title: "Chores Deleted!",
      description: `${choreIds.length} chores have been removed.`,
      variant: "destructive"
    });
  };

  const filteredChores = chores.filter(chore => {
    if (filterStatus === "all") return true;
    return chore.status === filterStatus;
  });

  const sortedAndFilteredChores = React.useMemo(() => {
    return filteredChores
      .filter(chore => 
        chore.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chore.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "dueDate":
            return new Date(a.dueDate) - new Date(b.dueDate);
          case "title":
            return a.title.localeCompare(b.title);
          case "status":
            return a.status.localeCompare(b.status);
          case "assignedTo":
            return a.assignedTo.localeCompare(b.assignedTo);
          default:
            return 0;
        }
      });
  }, [filteredChores, searchQuery, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale:0.95 },
    visible: { y: 0, opacity: 1, scale:1, transition: { type: "spring", stiffness:120, damping:15 } }
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight holographic-text">Chores & Tasks Center</h1>
          <p className="text-muted-foreground">Streamline household responsibilities with clarity.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10 futuristic-glow-primary"
            onClick={() => setIsManageModalOpen(true)}
          >
            <Settings2 className="mr-2 h-4 w-4" /> Manage All Chores
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10 futuristic-glow-primary">
                <Calendar className="mr-2 h-4 w-4" /> {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glassmorphic w-48">
              <DropdownMenuLabel>Time Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={timeRange === 'today'} onCheckedChange={() => setTimeRange('today')}>Today</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={timeRange === 'week'} onCheckedChange={() => setTimeRange('week')}>This Week</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={timeRange === 'month'} onCheckedChange={() => setTimeRange('month')}>This Month</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10 futuristic-glow-primary">
                <ListFilter className="mr-2 h-4 w-4" /> Filter ({filterStatus})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glassmorphic w-48">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={filterStatus === 'all'} onCheckedChange={() => setFilterStatus('all')}>All</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={filterStatus === 'pending'} onCheckedChange={() => setFilterStatus('pending')}>Pending</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={filterStatus === 'in_progress'} onCheckedChange={() => setFilterStatus('in_progress')}>In Progress</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={filterStatus === 'completed'} onCheckedChange={() => setFilterStatus('completed')}>Completed</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-lg futuristic-glow-accent">
                <PlusCircle className="mr-2 h-4 w-4" /> Assign Chore
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glassmorphic w-48">
              <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                <div className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>Quick Assign</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsModalV2Open(true)}>
                <div className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4" />
                  <span>Advanced Assign</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glassmorphic shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl futuristic-glow-primary group">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg"><Zap className="text-yellow-400 group-hover:animate-pulse"/>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p><strong className="text-foreground/80 dark:text-slate-300">Pending:</strong> {stats.pendingChores} tasks</p>
            <p><strong className="text-foreground/80 dark:text-slate-300">In Progress:</strong> {stats.inProgressChores} tasks</p>
            <p><strong className="text-foreground/80 dark:text-slate-300">Completed:</strong> {stats.completedChores} tasks</p>
            <p><strong className="text-foreground/80 dark:text-slate-300">Total:</strong> {stats.totalChores} tasks</p>
          </CardContent>
        </Card>
        <Card className="glassmorphic shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl futuristic-glow-accent group">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg"><Award className="text-amber-500 group-hover:animate-bounce"/>Rewards Hub</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Motivate with points and rewards!</p>
            <div className="flex items-center gap-2 mt-1">
              <strong>Points Earned:</strong>
              <span className="text-accent font-bold">{lifetimePoints}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p><strong>Points Earned</strong> is your lifetime total from completed chores. <br /><strong>Points Available</strong> is what you can spend on rewards.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <strong>Points Available:</strong>
              <span className={`font-bold ${availablePoints === 0 ? 'text-red-500' : 'text-primary'}`}>{availablePoints}</span>
            </div>
            <p className="text-sm text-muted-foreground">Avg. completion time: {stats.avgCompletionTime > 0 ? Math.round(stats.avgCompletionTime / (1000 * 60 * 60)) + ' hours' : 'N/A'}</p>
            <Button variant="link" className="p-0 h-auto text-primary dark:text-accent text-sm mt-1" onClick={() => setIsRewardsModalOpen(true)}>
              Redeem Rewards &rarr;
            </Button>
            {availablePoints === 0 && (
              <div className="text-xs text-yellow-500 mt-2">Complete chores to earn more points and unlock rewards!</div>
            )}
          </CardContent>
        </Card>
         <Card className="glassmorphic shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl md:col-span-2 lg:col-span-1 futuristic-glow-primary group">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Progress</CardTitle>
            <CardDescription className="text-xs">Visual dashboard for chore completion.</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
             <div className="w-full bg-secondary dark:bg-slate-700 rounded-full h-5 mb-1 overflow-hidden border border-border/50">
                <motion.div 
                    className="bg-gradient-to-r from-sky-400 to-blue-500 h-full rounded-full flex items-center justify-center text-xs font-medium text-sky-950" 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.completionRate}%` }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                >
                {stats.totalChores > 0 ? `${Math.round(stats.completionRate)}%` : '0%'}
                </motion.div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
                {stats.completedChores} of {stats.totalChores} tasks completed.
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-muted-foreground">Completion Rate: <span className="text-foreground">{Math.round(stats.completionRate)}%</span></p>
              <p className="text-xs text-muted-foreground">Efficiency: <span className="text-foreground">{stats.avgCompletionTime > 0 ? Math.round(stats.avgCompletionTime / (1000 * 60 * 60)) + ' hours' : 'N/A'}</span></p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue={familyMembers[0]?.id?.toString() || ''} className="w-full">
        <TabsList className="mb-6">
          {familyMembers.map(member => (
            <TabsTrigger key={member.id} value={member.id.toString()}>{member.name}</TabsTrigger>
          ))}
        </TabsList>
        {familyMembers.map(member => {
          // Filter chores for this member
          const memberChores = chores.filter(c => c.assignedTo === member.name);
          // Points logic for this member
          const completedPoints = memberChores.filter(c => c.status === 'completed').reduce((sum, c) => sum + (c.points || 0), 0);
          const spent = useAppStore.getState().rewardHistory.filter(r => r.assignedTo === member.name).reduce((sum, r) => sum + r.points, 0);
          const availablePoints = Math.max(completedPoints - spent, 0);
          const lifetimePoints = memberChores.reduce((sum, c) => sum + (c.status === 'completed' ? c.points || 0 : 0), 0); // For now, same as completedPoints
          return (
            <TabsContent key={member.id} value={member.id.toString()} className="space-y-8">
              <Card className="mb-4">
                <CardHeader className="flex flex-row items-center gap-4">
                  <img
                    src={member.avatar || `https://avatar.vercel.sh/${encodeURIComponent(member.name)}.png?size=64`}
                    alt={member.name}
                    className="h-12 w-12 rounded-full border border-border/40 shadow-md bg-background"
                  />
                  <div>
                    <CardTitle>{member.name}'s Rewards Hub</CardTitle>
                    <CardDescription>Motivate with points and rewards!</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mt-1">
                    <strong>Points Earned:</strong>
                    <span className="text-accent font-bold">{lifetimePoints}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <strong>Points Available:</strong>
                    <span className={`font-bold ${availablePoints === 0 ? 'text-red-500' : 'text-primary'}`}>{availablePoints}</span>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-primary dark:text-accent text-sm mt-1" onClick={() => setRewardsModalOpenFor(member.id)}>
                    Redeem Rewards &rarr;
                  </Button>
                  <RedeemRewardsModal open={rewardsModalOpenFor === member.id} onOpenChange={open => setRewardsModalOpenFor(open ? member.id : null)} assignedTo={member.name} />
                </CardContent>
              </Card>
              <h2 className="text-2xl font-semibold mb-4 tracking-tight text-foreground dark:text-slate-200">{member.name}'s Chores ({memberChores.length})</h2>
              {memberChores.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {memberChores.map((chore) => (
                    <motion.div key={chore.id} variants={itemVariants}>
                      <ChoreCard 
                        chore={chore} 
                        onToggleStatus={toggleChoreStatus} 
                        onDelete={handleDeleteChore} 
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div variants={itemVariants} className="text-center py-10 glassmorphic rounded-xl flex flex-col items-center justify-center gap-4">
                  <CheckSquare size={48} className="mx-auto text-green-500 mb-4" />
                  <p className="text-lg font-semibold text-muted-foreground">All caught up on chores!</p>
                  <p className="text-sm text-muted-foreground">Time to relax or add some new tasks.</p>
                  <Button 
                    className="mt-4 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-lg"
                    onClick={() => setIsModalOpen(true)}
                  >
                    + Assign New Chore
                  </Button>
                </motion.div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      <AssignTaskModal 
        isOpen={isModalOpen} 
        setIsOpen={setIsModalOpen} 
        onAddChore={handleAddChore} 
        familyMembers={familyMembers} 
      />

      <AssignTaskModalV2 
        isOpen={isModalV2Open} 
        setIsOpen={setIsModalV2Open} 
        onAddChore={handleAddChore} 
        familyMembers={familyMembers} 
      />

      <Dialog open={isManageModalOpen} onOpenChange={setIsManageModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage All Chores</DialogTitle>
            <DialogDescription>
              View, filter, and manage all chores in one place.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search by title or assignee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-[200px]">
                <Label htmlFor="sort">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="assignedTo">Assigned To</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAndFilteredChores.map((chore) => (
                    <TableRow key={chore.id}>
                      <TableCell className="font-medium">{chore.title}</TableCell>
                      <TableCell>{chore.assignedTo}</TableCell>
                      <TableCell>{new Date(chore.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          chore.status === 'completed' ? 'success' :
                          chore.status === 'in_progress' ? 'warning' :
                          'secondary'
                        }>
                          {chore.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{chore.points || 0}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleChoreStatus(chore.id, chore.status)}
                          >
                            {chore.status === 'completed' ? 'Reset' : 'Complete'}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteChore(chore.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {sortedAndFilteredChores.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No chores found matching your search criteria.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <RedeemRewardsModal open={isRewardsModalOpen} onOpenChange={setIsRewardsModalOpen} />
      <Button onClick={resetAll} variant="destructive" className="mb-4">Reset All (Dev Only)</Button>
    </motion.div>
  );
};

export default ChoresDashboard;
  