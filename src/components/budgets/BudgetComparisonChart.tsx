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
  Cell,
} from 'recharts';
import { Budget } from '@/types';
import { useFinance } from '@/context/FinanceContext';

interface BudgetComparisonData {
  name: string;
  budget: number;
  actual: number;
  color: string;
}

interface BudgetComparisonChartProps {
  month: number;
  year: number;
}

const BudgetComparisonChart: React.FC<BudgetComparisonChartProps> = ({ month, year }) => {
  const { budgets, categories, getActualSpending } = useFinance();
  
  const filteredBudgets = budgets.filter(
    (budget) => budget.month === month && budget.year === year
  );
  
  const data: BudgetComparisonData[] = filteredBudgets.map((budget) => {
    const category = categories.find((c) => c.id === budget.categoryId);
    const actual = getActualSpending(budget.categoryId, month, year);
    
    return {
      name: category?.name || 'Unknown',
      budget: budget.amount,
      actual,
      color: category?.color || '#888888',
      // Add variance percentage for tooltip
      variance: ((actual - budget.amount) / budget.amount * 100).toFixed(1)
    };
  });
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const variance = parseFloat(data.variance);
      const isOverBudget = data.actual > data.budget;
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-semibold">{data.name}</p>
          <p>Budget: ₹{data.budget.toFixed(2)}</p>
          <p>Actual: ₹{data.actual.toFixed(2)}</p>
          <p className={`font-medium ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
            {isOverBudget ? 'Over budget' : 'Under budget'} by {Math.abs(variance)}%
          </p>
        </div>
      );
    }
    
    return null;
  };

  // Add month names for readable display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return (
    <div className="w-full h-[400px]">
      <h3 className="text-lg font-medium mb-2">Budget vs. Actual Spending ({monthNames[month - 1]} {year})</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={70}
            tick={{ fontSize: 12 }} 
          />
          <YAxis 
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="budget" 
            fill="#8884d8" 
            name="Budget"
          />
          <Bar 
            dataKey="actual" 
            name="Actual" 
          >
            {data.map((entry, index) => {
              const isOverBudget = entry.actual > entry.budget;
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={isOverBudget ? '#ef4444' : '#22c55e'} 
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetComparisonChart;
