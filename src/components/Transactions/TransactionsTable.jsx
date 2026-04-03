import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Search, Plus, Filter, Trash2, ShieldAlert, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function TransactionsTable() {
  const { transactions, deleteTransaction, role, addTransaction } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newCategory, setNewCategory] = useState('');
  const [newType, setNewType] = useState('Expense');
  const [newAmount, setNewAmount] = useState('');

  const filteredData = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchFilter = filterType === 'All' || t.type === filterType;
      return matchSearch && matchFilter;
    });
  }, [transactions, searchTerm, filterType]);

  const handleOpenModal = () => {
    if (role !== 'Admin') return;
    setIsModalOpen(true);
  };

  const handleSaveTransaction = () => {
    if (!newDate || !newCategory || !newAmount) return;
    addTransaction({
      date: newDate,
      category: newCategory,
      type: newType,
      amount: parseFloat(newAmount)
    });
    setNewCategory('');
    setNewAmount('');
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden mt-6 flex flex-col">
      {/* Toolbar */}
      <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/20">
        <div className="flex items-center gap-2 max-w-sm w-full relative">
          <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 w-full text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-background border rounded-lg p-1">
            {['All', 'Income', 'Expense'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                  filterType === type ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {type}
              </button>
            ))}
          </div>
          
          <div className="relative group">
            <button
              onClick={handleOpenModal}
              disabled={role !== 'Admin'}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all shadow-sm",
                role === 'Admin' 
                  ? "bg-primary hover:bg-primary/90 hover:shadow" 
                  : "bg-muted-foreground/30 cursor-not-allowed opacity-70"
              )}
            >
              <Plus className="w-4 h-4" /> Add
            </button>

            {/* Tooltip for Viewer */}
            {role !== 'Admin' && (
              <div className="absolute top-full mt-2 right-0 w-48 p-2 bg-popover text-popover-foreground text-xs rounded-md shadow-xl border border-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-orange-500 shrink-0" />
                You need Admin permissions to add transactions.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              <th className="px-6 py-4 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredData.length > 0 ? filteredData.map((txn) => (
              <tr key={txn.id} className="hover:bg-muted/30 transition-colors group">
                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{txn.date}</td>
                <td className="px-6 py-4 font-medium whitespace-nowrap">{txn.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-semibold",
                    txn.type === 'Income' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                  )}>
                    {txn.type}
                  </span>
                </td>
                <td className={cn(
                  "px-6 py-4 text-right font-medium whitespace-nowrap",
                  txn.type === 'Income' ? "text-emerald-500" : "text-foreground"
                )}>
                  {txn.type === 'Income' ? '+' : '-'}${txn.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap relative">
                  <div className="flex justify-center group/btn relative">
                    <button 
                      onClick={() => deleteTransaction(txn.id)}
                      disabled={role !== 'Admin'}
                      className={cn(
                        "p-1.5 rounded-md transition-colors",
                        role === 'Admin' 
                          ? "text-muted-foreground hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 focus:opacity-100" 
                          : "text-muted-foreground/30 cursor-not-allowed"
                      )}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {/* Tooltip for Viewer inline */}
                    {role !== 'Admin' && (
                       <div className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded-md shadow-xl border border-border opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none z-10 flex items-start gap-2">
                         <ShieldAlert className="w-4 h-4 text-orange-500 shrink-0" />
                         Admins only can delete.
                       </div>
                    )}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-xl p-6 w-full max-w-md shadow-2xl border border-border flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Add New Transaction</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Type</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setNewType('Expense')}
                    className={cn(
                      "flex-1 py-2 text-sm rounded-lg border font-medium transition-colors", 
                      newType === 'Expense' ? "bg-rose-500/10 text-rose-500 border-rose-500/30" : "bg-background text-muted-foreground hover:bg-muted"
                    )}
                  >
                    Expense
                  </button>
                  <button 
                    onClick={() => setNewType('Income')}
                    className={cn(
                      "flex-1 py-2 text-sm rounded-lg border font-medium transition-colors", 
                      newType === 'Income' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" : "bg-background text-muted-foreground hover:bg-muted"
                    )}
                  >
                    Income
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Date</label>
                <input 
                  type="date" 
                  max={new Date().toISOString().split('T')[0]}
                  value={newDate} 
                  onChange={e => setNewDate(e.target.value)} 
                  className="w-full p-2.5 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ colorScheme: document.documentElement?.classList.contains('dark') ? 'dark' : 'light' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
                <input 
                  type="text" 
                  placeholder="e.g. Groceries, Salary, Utilities" 
                  value={newCategory} 
                  onChange={e => setNewCategory(e.target.value)} 
                  className="w-full p-2.5 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Amount ($)</label>
                <input 
                  type="number" 
                  min="0"
                  step="0.01"
                  placeholder="0.00" 
                  value={newAmount} 
                  onChange={e => setNewAmount(e.target.value)} 
                  className="w-full p-2.5 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onKeyDown={e => e.key === 'Enter' && handleSaveTransaction()}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveTransaction}
                disabled={!newDate || !newCategory || !newAmount}
                className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
