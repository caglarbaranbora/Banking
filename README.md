# Budget Tracker - Setup Instructions

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

## Installation Steps

### 1. Install Dependencies

First, update your `package.json` with the new dependencies provided, then run:

```bash
npm install
```

Or if using yarn:

```bash
yarn install
```

### 2. Install Additional Required Packages

Make sure these packages are installed:

```bash
npx expo install @react-native-async-storage/async-storage
npx expo install expo-blur
```

### 3. Create Folder Structure

Create the following folder structure in your project:

```
src/
├── components/
│   ├── ui/
│   │   ├── GlassCard.tsx
│   │   └── CategoryIcon.tsx
│   ├── budget/
│   └── transaction/
├── store/
│   ├── slices/
│   │   ├── transactionsSlice.ts
│   │   ├── budgetsSlice.ts
│   │   ├── categoriesSlice.ts
│   │   └── settingsSlice.ts
│   ├── index.ts
│   └── hooks.ts
├── types/
│   └── index.ts
├── utils/
│   └── index.ts
└── constants/
    └── index.ts
```

### 4. Create Configuration Files

Create these files in your project root:

**tailwind.config.js** - Already provided
**global.css** - Already provided

### 5. Update TypeScript Configuration

If you don't have one, create `tsconfig.json`:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 6. Configure NativeWind

Create `nativewind-env.d.ts` in your project root:

```typescript
/// <reference types="nativewind/types" />
```

### 7. Update app.json

Add the following to your `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "newArchEnabled": true
          },
          "android": {
            "newArchEnabled": true
          }
        }
      ]
    ]
  }
}
```

### 8. Start the Development Server

```bash
npx expo start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code with Expo Go app on your device

## File Placement Guide

Place the provided code files in these locations:

1. **Progress Documentation** → `PROGRESS.md` (root)
2. **Types** → `src/types/index.ts`
3. **Redux Store** → `src/store/index.ts`
4. **Redux Hooks** → `src/store/hooks.ts`
5. **Redux Slices** → `src/store/slices/`
6. **Constants** → `src/constants/index.ts`
7. **Utils** → `src/utils/index.ts`
8. **Components** → `src/components/ui/`
9. **Updated Layout** → `app/_layout.tsx`
10. **Updated Home** → `app/(tabs)/index.tsx`
11. **Tailwind Config** → `tailwind.config.js` (root)
12. **Global CSS** → `global.css` (root)

## Verification Checklist

After setup, verify:

- [ ] All dependencies installed without errors
- [ ] TypeScript compilation successful
- [ ] Expo dev server starts without errors
- [ ] App loads on iOS/Android simulator
- [ ] Home screen displays correctly with glass effect (iOS)
- [ ] Redux DevTools (if installed) shows store state
- [ ] No console errors or warnings

## Troubleshooting

### Metro Bundler Issues
```bash
npx expo start --clear
```

### iOS Build Issues
```bash
cd ios && pod install && cd ..
npx expo run:ios
```

### Android Build Issues
```bash
npx expo run:android
```

### NativeWind Not Working
Make sure `global.css` is imported in `_layout.tsx` and Metro is restarted.

### Persistent Storage Not Working
Check if `@react-native-async-storage/async-storage` is properly installed.

## Next Steps

After successful setup:

1. ✅ Verify all screens load
2. ✅ Test Redux state persistence (close and reopen app)
3. ✅ Check glass effect on iOS
4. 🔄 Start implementing modal for adding transactions
5. 🔄 Build transaction list screen
6. 🔄 Add charts and statistics

## Notes

- **iOS Glass Effect**: Only works on iOS devices/simulator. Android will show a semi-transparent fallback.
- **Redux Persist**: First launch may take a moment to hydrate state.
- **Hot Reload**: Changes to Redux slices may require app restart.

## Support

If you encounter issues:
1. Check `PROGRESS.md` for current development status
2. Verify all dependencies are installed
3. Clear Metro cache: `npx expo start --clear`
4. Check Expo documentation: https://docs.expo.dev

---

*Setup guide created: January 2026*