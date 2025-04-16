
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, Wallet, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/dashboard',
    },
    {
      name: 'Transactions',
      icon: <Receipt className="h-5 w-5" />,
      path: '/transactions',
    },
    {
      name: 'Budgets',
      icon: <Wallet className="h-5 w-5" />,
      path: '/budgets',
    },
    {
      name: 'Charts',
      icon: <PieChart className="h-5 w-5" />,
      path: '/charts',
    },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-16">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="px-4 mb-6">
          <Link to="/add-transaction">
            <Button className="w-full bg-finance-teal hover:bg-finance-teal/90">
              <Plus className="h-4 w-4 mr-2" /> Add Transaction
            </Button>
          </Link>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'group flex items-center px-4 py-3 text-base font-medium rounded-md',
                location.pathname === item.path
                  ? 'bg-finance-gray text-finance-teal'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-finance-teal'
              )}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
