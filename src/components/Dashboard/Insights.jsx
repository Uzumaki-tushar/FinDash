import React, { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Flame, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Insights() {
  const { transactions } = useStore();

  const { topCategory, totalExpense } = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    
    let top = { name: 'None', amount: 0 };
    let total = 0;
    
    for (const [name, amount] of Object.entries(grouped)) {
      total += amount;
      if (amount > top.amount) {
        top = { name, amount };
      }
    }
    return { topCategory: top, totalExpense: total };
  }, [transactions]);

  // Mock budget limit for progress
  const monthlyBudget = 4000;
  const progressPercent = Math.min((totalExpense / monthlyBudget) * 100, 100);
  const isWarning = progressPercent > 80;

  return (
    <div className="flex flex-col gap-6 mt-6 h-full">
      {/* Top Spending Category */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm mb-1 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" /> Top Spending Category
          </h3>
          <p className="text-2xl font-bold mt-2">{topCategory.name}</p>
          <p className="text-sm text-muted-foreground mt-1">
            ${topCategory.amount.toLocaleString()} this month
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-orange-500" />
        </div>
      </div>

      {/* Monthly Progress */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm flex-1 flex flex-col justify-center">
        <h3 className="font-semibold text-sm mb-4">Monthly Budget Progress</h3>
        
        <div className="flex justify-between text-sm mb-2 font-medium">
          <span>${totalExpense.toLocaleString()} spent</span>
          <span className="text-muted-foreground">${monthlyBudget.toLocaleString()} limit</span>
        </div>
        
        <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              isWarning ? "bg-destructive" : "bg-primary"
            )}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        {isWarning && (
          <p className="text-xs text-destructive mt-3 font-medium flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </span>
            You are approaching your monthly limit!
          </p>
        )}
      </div>
    </div>
  );
}
