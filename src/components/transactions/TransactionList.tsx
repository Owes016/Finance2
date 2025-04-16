
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Transaction, Category } from '@/types';
import { useFinance } from '@/context/FinanceContext';

interface TransactionListProps {
  transactions: Transaction[];
  showActions?: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions,
  showActions = true 
}) => {
  const { getCategoryById, deleteTransaction } = useFinance();
  const navigate = useNavigate();

  const formatAmount = (amount: number, type: 'income' | 'expense'): string => {
    return `${type === 'income' ? '+' : '-'} $${amount.toFixed(2)}`;
  };

  const handleEdit = (id: string) => {
    navigate(`/add-transaction?id=${id}`);
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            {showActions && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => {
              const category = getCategoryById(transaction.categoryId);
              return (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {format(new Date(transaction.date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category?.color }}
                      />
                      {category?.name}
                    </div>
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {formatAmount(transaction.amount, transaction.type)}
                  </TableCell>
                  {showActions && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(transaction.id)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={showActions ? 5 : 4} className="text-center py-4">
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionList;
