
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useFinance } from '@/context/FinanceContext';

interface MonthlyExpenseChartProps {
  year?: number;
}

const MonthlyExpenseChart: React.FC<MonthlyExpenseChartProps> = ({ 
  year = new Date().getFullYear() 
}) => {
  const { transactions } = useFinance();
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Filter transactions for the selected year and type is expense
  const yearTransactions = transactions.filter(
    (tx) => 
      new Date(tx.date).getFullYear() === year &&
      tx.type === 'expense'
  );
  
  // Group transactions by month
  const monthlyData = monthNames.map((month, index) => {
    const monthTransactions = yearTransactions.filter(
      (tx) => new Date(tx.date).getMonth() === index
    );
    
    const totalAmount = monthTransactions.reduce(
      (sum, tx) => sum + tx.amount, 0
    );
    
    return {
      name: month,
      expenses: totalAmount,
    };
  });

  return (
    <div className="w-full h-[400px]">
      <h3 className="text-lg font-medium mb-2">Monthly Expenses ({year})</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip 
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Expenses']} 
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Bar dataKey="expenses" fill="#0d9488" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenseChart;
