
import React, { createContext, useContext, useState } from 'react';
import { Transaction, Category, Budget } from '../types';
import { categories as initialCategories, transactions as initialTransactions, budgets as initialBudgets } from '../data/mockData';
import { toast } from '@/components/ui/use-toast';

interface FinanceContextType {
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
  getTransactionsByCategory: (categoryId: string) => Transaction[];
  getCategoryById: (id: string) => Category | undefined;
  getBudgetByCategoryId: (categoryId: string, month: number, year: number) => Budget | undefined;
  getActualSpending: (categoryId: string, month: number, year: number) => number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [categories] = useState<Category[]>(initialCategories);
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx-${Date.now()}`,
    };
    setTransactions([...transactions, newTransaction]);
    toast({
      title: "Transaction added",
      description: "Your transaction has been added successfully."
    });
  };

  const updateTransaction = (transaction: Transaction) => {
    setTransactions(
      transactions.map((t) => (t.id === transaction.id ? transaction : t))
    );
    toast({
      title: "Transaction updated",
      description: "Your transaction has been updated successfully."
    });
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast({
      title: "Transaction deleted",
      description: "Your transaction has been deleted successfully."
    });
  };

  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const existingBudget = getBudgetByCategoryId(budget.categoryId, budget.month, budget.year);
    if (existingBudget) {
      updateBudget({ ...existingBudget, amount: budget.amount });
      return;
    }
    
    const newBudget: Budget = {
      ...budget,
      id: `budget-${Date.now()}`,
    };
    setBudgets([...budgets, newBudget]);
    toast({
      title: "Budget added",
      description: "Your budget has been set successfully."
    });
  };

  const updateBudget = (budget: Budget) => {
    setBudgets(
      budgets.map((b) => (b.id === budget.id ? budget : b))
    );
    toast({
      title: "Budget updated",
      description: "Your budget has been updated successfully."
    });
  };

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter((b) => b.id !== id));
    toast({
      title: "Budget deleted",
      description: "Your budget has been deleted successfully."
    });
  };

  const getTransactionsByCategory = (categoryId: string): Transaction[] => {
    return transactions.filter((t) => t.categoryId === categoryId);
  };

  const getCategoryById = (id: string): Category | undefined => {
    return categories.find((c) => c.id === id);
  };

  const getBudgetByCategoryId = (categoryId: string, month: number, year: number): Budget | undefined => {
    return budgets.find(
      (b) => b.categoryId === categoryId && b.month === month && b.year === year
    );
  };

  const getActualSpending = (categoryId: string, month: number, year: number): number => {
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

  const value = {
    transactions,
    categories,
    budgets,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    deleteBudget,
    getTransactionsByCategory,
    getCategoryById,
    getBudgetByCategoryId,
    getActualSpending,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = (): FinanceContextType => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
