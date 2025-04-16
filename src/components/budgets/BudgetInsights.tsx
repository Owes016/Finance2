
import React from 'react';
import { AlertCircle, CheckCircle, PieChart } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useFinance } from '@/context/FinanceContext';

interface BudgetInsightsProps {
  month: number;
  year: number;
}

const BudgetInsights: React.FC<BudgetInsightsProps> = ({ month, year }) => {
  const { budgets, categories, getActualSpending } = useFinance();
  
  const filteredBudgets = budgets.filter(
    (budget) => budget.month === month && budget.year === year
  );
  
  const insights = filteredBudgets.map((budget) => {
    const category = categories.find((c) => c.id === budget.categoryId);
    const actual = getActualSpending(budget.categoryId, month, year);
    const difference = budget.amount - actual;
    const percentageUsed = (actual / budget.amount) * 100;
    
    return {
      categoryName: category?.name || 'Unknown',
      budgetAmount: budget.amount,
      actualAmount: actual,
      difference,
      percentageUsed,
      isOverBudget: difference < 0,
      color: category?.color || '#888888',
    };
  });
  
  // Sort by most concerning (highest percentage of budget used)
  const sortedInsights = [...insights].sort((a, b) => b.percentageUsed - a.percentageUsed);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Budget Insights</h3>
      
      {sortedInsights.length === 0 ? (
        <Alert>
          <PieChart className="h-4 w-4" />
          <AlertTitle>No budget data</AlertTitle>
          <AlertDescription>
            Set up budgets to see insights about your spending habits.
          </AlertDescription>
        </Alert>
      ) : (
        sortedInsights.map((insight, index) => (
          <Alert
            key={index}
            variant={insight.isOverBudget ? "destructive" : "default"}
            className={insight.isOverBudget ? "border-red-500" : "border-green-500"}
          >
            {insight.isOverBudget ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertTitle className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: insight.color }}
              />
              {insight.categoryName}
            </AlertTitle>
            <AlertDescription>
              {insight.isOverBudget ? (
                <span>
                  You've exceeded your {insight.categoryName} budget by{' '}
                  <span className="font-semibold">
                    ${Math.abs(insight.difference).toFixed(2)}
                  </span>{' '}
                  ({Math.round(insight.percentageUsed)}% of budget used)
                </span>
              ) : (
                <span>
                  You've used{' '}
                  <span className="font-semibold">
                    ${insight.actualAmount.toFixed(2)}
                  </span>{' '}
                  of your ${insight.budgetAmount.toFixed(2)} {insight.categoryName} budget
                  ({Math.round(insight.percentageUsed)}%)
                </span>
              )}
            </AlertDescription>
          </Alert>
        ))
      )}
    </div>
  );
};

export default BudgetInsights;
