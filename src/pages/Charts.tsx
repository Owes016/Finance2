
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MonthlyExpenseChart from '@/components/charts/MonthlyExpenseChart';
import CategoryPieChart from '@/components/charts/CategoryPieChart';

const Charts: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  
  const years = Array.from(
    { length: 5 },
    (_, i) => currentYear - 2 + i
  );
  
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Charts</h1>
      
      <Tabs defaultValue="monthly" className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Expenses</TabsTrigger>
            <TabsTrigger value="category">Category Breakdown</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <TabsContent value="monthly" className="mt-0">
              <Select 
                value={selectedYear.toString()} 
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TabsContent>
            
            <TabsContent value="category" className="mt-0 flex gap-2">
              <Select 
                value={selectedMonth.toString()} 
                onValueChange={(value) => setSelectedMonth(parseInt(value))}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={selectedYear.toString()} 
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TabsContent>
          </div>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <TabsContent value="monthly">
              <MonthlyExpenseChart year={selectedYear} />
            </TabsContent>
            
            <TabsContent value="category">
              <CategoryPieChart month={selectedMonth} year={selectedYear} />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default Charts;
