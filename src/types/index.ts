
export type TransactionType = 'income' | 'expense';

export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: TransactionType;
  categoryId: string;
};

export type Budget = {
  id: string;
  categoryId: string;
  amount: number;
  month: number;
  year: number;
};
