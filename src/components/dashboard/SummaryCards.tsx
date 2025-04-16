import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, CreditCard, DollarSign, TrendingDown } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';

interface SummaryCardsProps {
  month?: number;
  year?: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ 
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear()
}) => {
  const { transactions, categories } = useFinance();
  
  // Filter transactions for current month
  const currentMonthTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return txDate.getMonth() + 1 === month && txDate.getFullYear() === year;
  });
  
  // Calculate total income, expenses and balance
  const totalIncome = currentMonthTransactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalExpenses = currentMonthTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const balance = totalIncome - totalExpenses;

  // Find top spending category
  const categorySpending: Record<string, number> = {};
  currentMonthTransactions
    .filter(tx => tx.type === 'expense')
    .forEach(tx => {
      if (!categorySpending[tx.categoryId]) {
        categorySpending[tx.categoryId] = 0;
      }
      categorySpending[tx.categoryId] += tx.amount;
    });
    
  let topCategoryId = '';
  let topCategoryAmount = 0;
  
  Object.entries(categorySpending).forEach(([categoryId, amount]) => {
    if (amount > topCategoryAmount) {
      topCategoryId = categoryId;
      topCategoryAmount = amount;
    }
  });
  
  const topCategory = categories.find(c => c.id === topCategoryId);

  // Format numbers as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Month names for display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Income
          </CardTitle>
          <span className="h-4 w-4 text-green-600 font-bold">₹</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
          <p className="text-xs text-muted-foreground">
            {monthNames[month - 1]} {year}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Expenses
          </CardTitle>
          <CreditCard className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
          <p className="text-xs text-muted-foreground">
            {monthNames[month - 1]} {year}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Monthly Balance
          </CardTitle>
          {balance >= 0 ? (
            <ArrowUpIcon className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-600" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(balance)}
          </div>
          <p className="text-xs text-muted-foreground">
            {balance >= 0 ? 'Surplus' : 'Deficit'}
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Top Spending Category
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          {topCategory ? (
            <>
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: topCategory.color }} 
                />
                <div className="text-2xl font-bold">{topCategory.name}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(topCategoryAmount)}
              </p>
            </>
          ) : (
            <div className="text-lg">No expenses this month</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
