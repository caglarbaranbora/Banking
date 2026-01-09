import { SettingsState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SettingsState = {
  currency: 'USD',
  currencySymbol: '$',
  theme: 'auto',
  notifications: true,
  biometrics: false,
  onboardingCompleted: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<{ currency: string; symbol: string }>) => {
      state.currency = action.payload.currency;
      state.currencySymbol = action.payload.symbol;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
      state.theme = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    toggleBiometrics: (state) => {
      state.biometrics = !state.biometrics;
    },
    completeOnboarding: (state) => {
      state.onboardingCompleted = true;
    },
    resetSettings: (state) => {
      return initialState;
    },
  },
});

export const {
  setCurrency,
  setTheme,
  toggleNotifications,
  toggleBiometrics,
  completeOnboarding,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;