
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FinanceProvider } from "@/context/FinanceContext";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Transactions from "@/pages/Transactions";
import AddTransaction from "@/pages/AddTransaction";
import Charts from "@/pages/Charts";
import Budgets from "@/pages/Budgets";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FinanceProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/transactions"
              element={
                <MainLayout>
                  <Transactions />
                </MainLayout>
              }
            />
            <Route
              path="/add-transaction"
              element={
                <MainLayout>
                  <AddTransaction />
                </MainLayout>
              }
            />
            <Route
              path="/charts"
              element={
                <MainLayout>
                  <Charts />
                </MainLayout>
              }
            />
            <Route
              path="/budgets"
              element={
                <MainLayout>
                  <Budgets />
                </MainLayout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FinanceProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
