
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-finance-teal">FinViz</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative hidden md:block">
              <div className="flex space-x-4">
                <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-finance-teal">
                  Dashboard
                </Link>
                <Link to="/transactions" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-finance-teal">
                  Transactions
                </Link>
                <Link to="/budgets" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-finance-teal">
                  Budgets
                </Link>
                <Link to="/charts" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-finance-teal">
                  Charts
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-sm font-medium text-gray-700 hover:text-finance-teal">
                    Menu <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/dashboard" className="w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/transactions" className="w-full">Transactions</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/budgets" className="w-full">Budgets</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/charts" className="w-full">Charts</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
