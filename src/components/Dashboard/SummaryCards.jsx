import React, { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { DollarSign, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function SummaryCards() {
  const { transactions } = useStore();

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'Income') acc.totalIncome += curr.amount;
        if (curr.type === 'Expense') acc.totalExpense += curr.amount;
        acc.balance = acc.totalIncome - acc.totalExpense;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0, balance: 0 }
    );
  }, [transactions]);

  const cards = [
    {
      title: 'Total Balance',
      amount: balance,
      icon: Wallet,
      trend: '+2.5%',
      trendUp: true,
      color: 'text-primary',
      bgBase: 'bg-primary/10',
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: ArrowUpRight,
      trend: '+12.5%',
      trendUp: true,
      color: 'text-emerald-500',
      bgBase: 'bg-emerald-500/10',
    },
    {
      title: 'Total Expenses',
      amount: totalExpense,
      icon: ArrowDownRight,
      trend: '-4.1%',
      trendUp: false,
      color: 'text-rose-500',
      bgBase: 'bg-rose-500/10',
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">{card.title}</h3>
            <div className={cn("p-2 rounded-lg transition-colors duration-300", card.bgBase)}>
              <card.icon className={cn("w-5 h-5", card.color)} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight">
              ${card.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn(
              "flex items-center font-medium",
              card.trendUp ? "text-emerald-500" : "text-rose-500"
            )}>
              {card.trend}
            </span>
            <span>vs last month</span>
          </div>

          {/* Decorative background gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
}
