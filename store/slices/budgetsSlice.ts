import { Budget, BudgetsState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BudgetsState = {
  items: [],
  loading: false,
  error: null,
};

const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    addBudget: (state, action: PayloadAction<Budget>) => {
      state.items.push(action.payload);
    },
    updateBudget: (state, action: PayloadAction<Budget>) => {
      const index = state.items.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteBudget: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(b => b.id !== action.payload);
    },
    setBudgets: (state, action: PayloadAction<Budget[]>) => {
      state.items = action.payload;
    },
    updateBudgetSpent: (state, action: PayloadAction<{ id: string; spent: number }>) => {
      const budget = state.items.find(b => b.id === action.payload.id);
      if (budget) {
        budget.spent = action.payload.spent;
      }
    },
    clearBudgets: (state) => {
      state.items = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addBudget,
  updateBudget,
  deleteBudget,
  setBudgets,
  updateBudgetSpent,
  clearBudgets,
  setLoading,
  setError,
} = budgetsSlice.actions;

export default budgetsSlice.reducer;