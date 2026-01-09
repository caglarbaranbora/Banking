import { CategoriesState, Category } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Default categories with Lucide icon names (kebab-case)
// These will be converted to PascalCase in the CategoryIcon component
const defaultCategories: Category[] = [
  // Expense Categories
  { id: '1', name: 'Food & Dining', icon: 'utensils', color: '#FF6B6B', type: 'expense' },
  { id: '2', name: 'Transportation', icon: 'car', color: '#4ECDC4', type: 'expense' },
  { id: '3', name: 'Shopping', icon: 'shopping-bag', color: '#95E1D3', type: 'expense' },
  { id: '4', name: 'Entertainment', icon: 'film', color: '#F38181', type: 'expense' },
  { id: '5', name: 'Bills & Utilities', icon: 'receipt', color: '#AA96DA', type: 'expense' },
  { id: '6', name: 'Healthcare', icon: 'heart-pulse', color: '#FCBAD3', type: 'expense' },
  { id: '7', name: 'Education', icon: 'graduation-cap', color: '#A8D8EA', type: 'expense' },
  { id: '8', name: 'Personal', icon: 'user', color: '#FFD93D', type: 'expense' },
  { id: '9', name: 'Travel', icon: 'plane', color: '#6BCB77', type: 'expense' },
  { id: '10', name: 'Other', icon: 'more-horizontal', color: '#B4B4B8', type: 'expense' },
  
  // Income Categories
  { id: '11', name: 'Salary', icon: 'briefcase', color: '#4CAF50', type: 'income' },
  { id: '12', name: 'Freelance', icon: 'laptop', color: '#2196F3', type: 'income' },
  { id: '13', name: 'Investment', icon: 'trending-up', color: '#9C27B0', type: 'income' },
  { id: '14', name: 'Gift', icon: 'gift', color: '#FF9800', type: 'income' },
  { id: '15', name: 'Other Income', icon: 'plus-circle', color: '#607D8B', type: 'income' },
];

const initialState: CategoriesState = {
  items: defaultCategories,
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.items.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.items.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(cat => cat.id !== action.payload);
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addCategory, updateCategory, deleteCategory, setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;