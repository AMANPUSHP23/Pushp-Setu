import React from 'react';
import { motion } from 'framer-motion';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const SpendingChart = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const dataMap = new Map();

  expenses.forEach(expense => {
    if (dataMap.has(expense.category)) {
      dataMap.set(expense.category, dataMap.get(expense.category) + expense.amount);
    } else {
      dataMap.set(expense.category, expense.amount);
    }
  });

  const chartData = Array.from(dataMap, ([name, value]) => ({ name, value }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28'];

  if (chartData.length === 0) {
    return (
      <div className="p-4 rounded-lg bg-secondary/30 dark:bg-slate-700/30 h-80 flex flex-col justify-center items-center text-center">
        <h4 className="text-md font-semibold mb-2 text-foreground/80 dark:text-slate-300">Spending by Category</h4>
        <p className="text-sm text-muted-foreground">No expense data available to display chart.</p>
        <img  alt="Abstract data visualization graphic" className="w-32 h-32 opacity-50 mt-4" src="https://images.unsplash.com/photo-1516383274235-5f42d6c6426d" />
      </div>
    );
  }
  

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            innerRadius={50}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="focus:outline-none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsla(var(--card)/0.8)',
              borderColor: 'hsla(var(--border)/0.5)',
              borderRadius: 'var(--radius)',
              backdropFilter: 'blur(4px)',
            }}
            itemStyle={{ color: 'hsl(var(--card-foreground))' }}
          />
          <Legend 
             wrapperStyle={{ fontSize: '0.8rem' }}
             formatter={(value, entry) => <span style={{ color: 'hsl(var(--muted-foreground))' }}>{value}</span>}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
  