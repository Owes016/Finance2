import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useFinance } from '@/context/FinanceContext';

interface CategoryPieChartProps {
  month?: number;
  year?: number;
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear(),
}) => {
  const { transactions, categories } = useFinance();

  // Filter transactions by month, year, and type (only expenses)
  const filteredTransactions = transactions.filter(
    (tx) =>
      new Date(tx.date).getMonth() + 1 === month &&
      new Date(tx.date).getFullYear() === year &&
      tx.type === 'expense'
  );

  // Group transactions by category and calculate totals
  const categoryTotals: Record<string, number> = {};

  filteredTransactions.forEach((tx) => {
    if (!categoryTotals[tx.categoryId]) {
      categoryTotals[tx.categoryId] = 0;
    }
    categoryTotals[tx.categoryId] += tx.amount;
  });

  // Prepare data for the pie chart
  const data = Object.entries(categoryTotals).map(([categoryId, total]) => {
    const category = categories.find((c) => c.id === categoryId);
    return {
      name: category?.name || 'Unknown',
      value: total,
      color: category?.color || '#888888',
    };
  });

  // Sort by value descending
  data.sort((a, b) => b.value - a.value);

  // Calculate total spend
  const totalSpend = data.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalSpend) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-semibold">{data.name}</p>
          <p>₹{data.value.toFixed(2)}</p>
          <p>{percentage}% of total</p>
        </div>
      );
    }
    
    return null;
  };

  // Custom legend
  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm mt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.value}: ₹{data.find(d => d.name === entry.value)?.value.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    );
  };

  // Month names for display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="w-full h-[400px]">
      <h3 className="text-lg font-medium mb-2">
        Expense Breakdown by Category ({monthNames[month - 1]} {year})
      </h3>
      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={130}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-center text-gray-500">
            No expense data available for this period.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPieChart;
