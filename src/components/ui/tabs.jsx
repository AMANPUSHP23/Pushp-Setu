import * as React from 'react';

const TabsContext = React.createContext();

export function Tabs({ defaultValue, className, children }) {
  const [active, setActive] = React.useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }) {
  return <div className={`flex gap-2 ${className || ''}`}>{children}</div>;
}

export function TabsTrigger({ value, children, className }) {
  const { active, setActive } = React.useContext(TabsContext);
  const isActive = active === value;
  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive ? 'bg-primary text-primary-foreground shadow' : 'bg-secondary text-muted-foreground hover:bg-primary/10'} ${className || ''}`}
      onClick={() => setActive(value)}
      aria-selected={isActive}
      aria-controls={`tab-content-${value}`}
      role="tab"
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }) {
  const { active } = React.useContext(TabsContext);
  if (active !== value) return null;
  return (
    <div id={`tab-content-${value}`} role="tabpanel" className={className}>
      {children}
    </div>
  );
} 