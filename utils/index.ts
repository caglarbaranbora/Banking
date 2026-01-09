import { CategoryStats, Transaction } from '@/types';
import { endOfMonth, format, isWithinInterval, parseISO, startOfMonth } from 'date-fns';

/**
 * Format currency with symbol
 */
export const formatCurrency = (amount: number, symbol: string = '$'): string => {
  return `${symbol}${Math.abs(amount).toFixed(2)}`;
};

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculate total for transactions
 */
export const calculateTotal = (transactions: Transaction[]): number => {
  return transactions.reduce((sum, transaction) => {
    const amount = transaction.type === 'income' ? transaction.amount : -transaction.amount;
    return sum + amount;
  }, 0);
};

/**
 * Filter transactions by date range
 */
export const filterTransactionsByDateRange = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): Transaction[] => {
  return transactions.filter((transaction) => {
    const transactionDate = parseISO(transaction.date);
    return isWithinInterval(transactionDate, { start: startDate, end: endDate });
  });
};

/**
 * Get transactions for current month
 */
export const getCurrentMonthTransactions = (transactions: Transaction[]): Transaction[] => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  return filterTransactionsByDateRange(transactions, start, end);
};

/**
 * Group transactions by category and calculate stats
 */
export const getCategoryStats = (
  transactions: Transaction[],
  categories: { id: string; name: string }[]
): CategoryStats[] => {
  const categoryMap = new Map<string, { total: number; count: number }>();
  
  transactions.forEach((transaction) => {
    const existing = categoryMap.get(transaction.category) || { total: 0, count: 0 };
    categoryMap.set(transaction.category, {
      total: existing.total + transaction.amount,
      count: existing.count + 1,
    });
  });

  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  return Array.from(categoryMap.entries()).map(([categoryId, data]) => {
    const category = categories.find((c) => c.id === categoryId);
    return {
      categoryId,
      categoryName: category?.name || 'Unknown',
      total: data.total,
      percentage: total > 0 ? (data.total / total) * 100 : 0,
      transactionCount: data.count,
    };
  }).sort((a, b) => b.total - a.total);
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

/**
 * Validate amount input
 */
export const isValidAmount = (value: string): boolean => {
  const regex = /^\d+(\.\d{0,2})?$/;
  return regex.test(value) && parseFloat(value) > 0;
};

/**
 * Parse amount from string
 */
export const parseAmount = (value: string): number => {
  return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
};