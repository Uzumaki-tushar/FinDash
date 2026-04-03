import React, { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export default function Visualizations() {
  const { transactions, isDarkMode } = useStore();

  // Combine by date for LineChart
  const lineData = useMemo(() => {
    const sorted = [...transactions].sort((a,b) => new Date(a.date) - new Date(b.date));
    let runningBalance = 0;
    
    // Grouping by date
    const grouped = sorted.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = 0;
      }
      acc[curr.date] += (curr.type === 'Income' ? curr.amount : -curr.amount);
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, dailyNet]) => {
      runningBalance += dailyNet;
      // formatting date basically
      const dateObj = new Date(date);
      const shortDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
      return { date: shortDate, Balance: runningBalance };
    });
  }, [transactions]);

  // Combine expenses by category for Donut 
  const pieData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    return Object.entries(grouped)
        .map(([name, value]) => ({ name, value }))
        .sort((a,b) => b.value - a.value); // sort largest
  }, [transactions]);

  // Use slightly simpler colors inside recharts for max compatibility
  const COLORS = ['#0ea5e9', '#f472b6', '#10b981', '#f59e0b', '#3b82f6'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border shadow-lg rounded-lg p-3 text-sm z-50 relative">
          <p className="font-semibold mb-1">{label}</p>
          <p className="text-primary font-medium">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-6 xl:grid-cols-2 mt-6">
      <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col xl:col-span-1 min-h-[400px]">
        <h3 className="font-semibold mb-1">Balance Trend</h3>
        <p className="text-xs text-muted-foreground mb-6">Your total balance history</p>
        
        <div className="flex-1 w-full mt-4">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={lineData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#333' : '#e5e7eb'} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'currentColor' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'currentColor' }}
                tickFormatter={(value) => `$${value}`}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="Balance" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col xl:col-span-1 min-h-[400px]">
        <h3 className="font-semibold mb-1">Spending by Category</h3>
        <p className="text-xs text-muted-foreground mb-6">Where your money goes</p>
        
        <div className="flex-1 w-full mt-4">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="40%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))' }}
                 itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend 
                verticalAlign="bottom"
                layout="horizontal"
                iconType="circle"
                wrapperStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
