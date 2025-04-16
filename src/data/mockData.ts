
import { Transaction, Category, Budget } from '../types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Housing',
    color: '#0ea5e9', // Sky blue
    icon: 'home',
  },
  {
    id: 'cat-2',
    name: 'Food',
    color: '#22c55e', // Green
    icon: 'utensils',
  },
  {
    id: 'cat-3',
    name: 'Transportation',
    color: '#f59e0b', // Amber
    icon: 'car',
  },
  {
    id: 'cat-4',
    name: 'Entertainment',
    color: '#8b5cf6', // Violet
    icon: 'film',
  },
  {
    id: 'cat-5',
    name: 'Shopping',
    color: '#ec4899', // Pink
    icon: 'shopping-bag',
  },
  {
    id: 'cat-6',
    name: 'Utilities',
    color: '#6366f1', // Indigo
    icon: 'zap',
  },
  {
    id: 'cat-7',
    name: 'Healthcare',
    color: '#ef4444', // Red
    icon: 'activity',
  },
  {
    id: 'cat-8',
    name: 'Income',
    color: '#10b981', // Emerald
    icon: 'dollar-sign',
  },
  {
    id: 'cat-9',
    name: 'Other',
    color: '#64748b', // Slate
    icon: 'more-horizontal',
  },
];

export const transactions: Transaction[] = [
  {
    id: 'tx-1',
    amount: 1200,
    description: 'Monthly Rent',
    date: '2025-04-01',
    type: 'expense',
    categoryId: 'cat-1',
  },
  {
    id: 'tx-2',
    amount: 120.5,
    description: 'Grocery Shopping',
    date: '2025-04-05',
    type: 'expense',
    categoryId: 'cat-2',
  },
  {
    id: 'tx-3',
    amount: 55,
    description: 'Gas',
    date: '2025-04-07',
    type: 'expense',
    categoryId: 'cat-3',
  },
  {
    id: 'tx-4',
    amount: 3500,
    description: 'Salary',
    date: '2025-04-01',
    type: 'income',
    categoryId: 'cat-8',
  },
  {
    id: 'tx-5',
    amount: 80.99,
    description: 'Concert Tickets',
    date: '2025-04-10',
    type: 'expense',
    categoryId: 'cat-4',
  },
  {
    id: 'tx-6',
    amount: 65.5,
    description: 'Electric Bill',
    date: '2025-04-15',
    type: 'expense',
    categoryId: 'cat-6',
  },
  {
    id: 'tx-7',
    amount: 45,
    description: 'Doctor Visit Copay',
    date: '2025-03-25',
    type: 'expense',
    categoryId: 'cat-7',
  },
  {
    id: 'tx-8',
    amount: 150,
    description: 'New Clothes',
    date: '2025-03-28',
    type: 'expense',
    categoryId: 'cat-5',
  },
  {
    id: 'tx-9',
    amount: 200,
    description: 'Side Project Income',
    date: '2025-03-15',
    type: 'income',
    categoryId: 'cat-8',
  },
  {
    id: 'tx-10',
    amount: 35.5,
    description: 'Internet Bill',
    date: '2025-03-15',
    type: 'expense',
    categoryId: 'cat-6',
  },
];

export const budgets: Budget[] = [
  {
    id: 'budget-1',
    categoryId: 'cat-1',
    amount: 1200,
    month: 4,
    year: 2025,
  },
  {
    id: 'budget-2',
    categoryId: 'cat-2',
    amount: 500,
    month: 4,
    year: 2025,
  },
  {
    id: 'budget-3',
    categoryId: 'cat-3',
    amount: 200,
    month: 4,
    year: 2025,
  },
  {
    id: 'budget-4',
    categoryId: 'cat-4',
    amount: 150,
    month: 4,
    year: 2025,
  },
  {
    id: 'budget-5',
    categoryId: 'cat-5',
    amount: 300,
    month: 4,
    year: 2025,
  },
  {
    id: 'budget-6',
    categoryId: 'cat-6',
    amount: 250,
    month: 4,
    year: 2025,
  },
  {
    id: 'budget-7',
    categoryId: 'cat-7',
    amount: 100,
    month: 4,
    year: 2025,
  },
];

export const getActualSpending = (categoryId: string, month: number, year: number): number => {
  return transactions
    .filter(
      (transaction) =>
        transaction.categoryId === categoryId &&
        transaction.type === 'expense' &&
        new Date(transaction.date).getMonth() + 1 === month &&
        new Date(transaction.date).getFullYear() === year
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getMonthlyTransactions = (month: number, year: number): Transaction[] => {
  return transactions.filter(
    (transaction) =>
      new Date(transaction.date).getMonth() + 1 === month &&
      new Date(transaction.date).getFullYear() === year
  );
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};
