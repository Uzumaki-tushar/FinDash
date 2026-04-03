import { create } from 'zustand';

const initialTransactions = [
  { id: '1', date: '2023-10-01', amount: 3000, category: 'Salary', type: 'Income' },
  { id: '2', date: '2023-10-02', amount: 1200, category: 'Rent', type: 'Expense' },
  { id: '3', date: '2023-10-05', amount: 150, category: 'Food', type: 'Expense' },
  { id: '4', date: '2023-10-08', amount: 60, category: 'Utilities', type: 'Expense' },
  { id: '5', date: '2023-10-12', amount: 200, category: 'Freelance', type: 'Income' },
  { id: '6', date: '2023-10-15', amount: 45, category: 'Entertainment', type: 'Expense' },
  { id: '7', date: '2023-10-18', amount: 300, category: 'Groceries', type: 'Expense' },
  { id: '8', date: '2023-10-20', amount: 80, category: 'Transport', type: 'Expense' },
  { id: '9', date: '2023-10-22', amount: 500, category: 'Bonus', type: 'Income' },
  { id: '10', date: '2023-10-25', amount: 120, category: 'Dining Out', type: 'Expense' },
  { id: '11', date: '2023-11-01', amount: 3000, category: 'Salary', type: 'Income' },
  { id: '12', date: '2023-11-03', amount: 1200, category: 'Rent', type: 'Expense' },
  { id: '13', date: '2023-11-05', amount: 220, category: 'Groceries', type: 'Expense' },
  { id: '14', date: '2023-11-08', amount: 90, category: 'Utilities', type: 'Expense' },
  { id: '15', date: '2023-11-12', amount: 55, category: 'Entertainment', type: 'Expense' },
  { id: '16', date: '2023-11-15', amount: 300, category: 'Freelance', type: 'Income' },
  { id: '17', date: '2023-11-18', amount: 110, category: 'Shopping', type: 'Expense' },
  { id: '18', date: '2023-11-20', amount: 60, category: 'Transport', type: 'Expense' },
  { id: '19', date: '2023-11-22', amount: 200, category: 'Gift', type: 'Income' },
  { id: '20', date: '2023-11-25', amount: 180, category: 'Dining Out', type: 'Expense' },
  { id: '21', date: '2023-11-28', amount: 45, category: 'Subscriptions', type: 'Expense' },
];

export const useStore = create((set) => ({
  role: 'Admin', // 'Admin' | 'Viewer'
  isDarkMode: false,
  transactions: initialTransactions,

  toggleRole: () => set((state) => ({ role: state.role === 'Admin' ? 'Viewer' : 'Admin' })),
  
  toggleTheme: () => set((state) => {
    const nextTheme = !state.isDarkMode;
    if (nextTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: nextTheme };
  }),

  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(t => t.id !== id)
  })),

  addTransaction: (transaction) => set((state) => ({
    transactions: [{ ...transaction, id: crypto.randomUUID() }, ...state.transactions].sort((a,b) => new Date(b.date) - new Date(a.date))
  }))
}));
