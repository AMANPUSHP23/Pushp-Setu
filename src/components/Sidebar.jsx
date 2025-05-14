import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ListChecks, UtensilsCrossed, Wallet, CalendarDays, Pill, ShieldAlert, X, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/chores', icon: ListChecks, label: 'Chores' },
  { href: '/meals', icon: UtensilsCrossed, label: 'Meals' },
  { href: '/budget', icon: Wallet, label: 'Budget' },
  { href: '/calendar', icon: CalendarDays, label: 'Calendar' },
  { href: '/medications', icon: Pill, label: 'Medications' },
  { href: '/emergency-info', icon: ShieldAlert, label: 'Emergency Info' },
];

const SidebarLink = ({ item, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === item.href || (location.pathname.startsWith(item.href) && item.href !== '/');

  return (
    <NavLink
      to={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out group relative overflow-hidden",
        isActive
          ? "bg-primary/15 text-primary shadow-sm dark:bg-primary/20 dark:text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground dark:hover:bg-slate-700/50 dark:hover:text-slate-200"
      )}
    >
      <item.icon className={cn("mr-3 h-5 w-5 transition-colors", isActive ? "text-primary dark:text-primary-foreground" : "text-muted-foreground group-hover:text-foreground dark:group-hover:text-slate-300")} />
      <span className="truncate">{item.label}</span>
      {isActive && (
        <motion.div
          layoutId="active-sidebar-pill"
          className="absolute inset-y-0 left-0 w-1 bg-primary dark:bg-accent rounded-r-full"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
    </NavLink>
  );
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 25 } },
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}

      <motion.aside
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-card dark:bg-slate-900 border-r border-border/50 dark:border-slate-800/50 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 shadow-xl dark:shadow-slate-950/50"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border/50 dark:border-slate-800/50">
          <div className="flex items-center">
            <img  alt="PushpSetu Logo" className="h-8 w-auto mr-2 filter dark:invert" src="https://images.unsplash.com/photo-1677223013989-cd8ebedeadfc" />
            <span className="text-lg font-bold gradient-text tracking-tight">PushpSetu</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-primary" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </Button>
        </div>
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarLink key={item.href} item={item} onClick={() => setIsOpen(false)} />
          ))}
        </nav>
        <Separator className="my-2 dark:bg-slate-700/50" />
        <div className="p-3 space-y-1.5">
            <SidebarLink item={{href: "/settings", icon: Settings, label: "Settings"}} onClick={() => setIsOpen(false)} />
            <SidebarLink item={{href: "/logout", icon: LogOut, label: "Logout"}} onClick={() => setIsOpen(false)} />
        </div>
        <div className="p-4 border-t border-border/50 dark:border-slate-800/50 mt-auto">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} PushpSetu Inc.
          </p>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
  