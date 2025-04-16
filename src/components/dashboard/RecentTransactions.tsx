
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFinance } from '@/context/FinanceContext';
import { Transaction } from '@/types';
import TransactionList from '../transactions/TransactionList';

const RecentTransactions: React.FC = () => {
  const { transactions } = useFinance();
  
  // Sort transactions by date (most recent first)
  const sortedTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5); // Get only the 5 most recent transactions
  
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <TransactionList transactions={sortedTransactions} showActions={false} />
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
