
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionForm from '@/components/transactions/TransactionForm';

const AddTransaction: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add Transaction</h1>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTransaction;
