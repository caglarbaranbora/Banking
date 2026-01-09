export type TransactionType = 'income' | 'expense';
export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'yearly';
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: TransactionType;
}
export interface Transaction {
  id: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
  date: string;
  createdAt: string; 
  updatedAt: string;
}
export interface Budget {
  id: string;
  category: string;
  limit: number;
  period: PeriodType;
  spent: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
export interface MonthlyStats {
  month: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}
export interface CategoryStats {
  categoryId: string;
  categoryName: string;
  total: number;
  percentage: number;
  transactionCount: number;
}
export interface User {
  id: string;
  name: string;
  email: string;
  currency: string;
  createdAt: string;
}
export interface AppSettings {
  currency: string;
  currencySymbol: string;
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  biometrics: boolean;
}
export interface TransactionsState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
}
export interface BudgetsState {
  items: Budget[];
  loading: boolean;
  error: string | null;
}
export interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}
export interface SettingsState extends AppSettings {
  onboardingCompleted: boolean;
}
export interface RootState {
  transactions: TransactionsState;
  budgets: BudgetsState;
  categories: CategoriesState;
  settings: SettingsState;
}
export interface TransactionFormData {
  amount: string;
  category: string;
  type: TransactionType;
  description: string;
  date: Date;
}
export interface BudgetFormData {
  category: string;
  limit: string;
  period: PeriodType;
  startDate: Date;
}
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
export interface ApiError {
  message: string;
  code: string;
  details?: any;
}