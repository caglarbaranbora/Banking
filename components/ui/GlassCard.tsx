import { GlassView } from 'expo-glass-effect';
import React from 'react';
import { Platform, View, ViewStyle } from 'react-native';
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  style?: ViewStyle;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  intensity = 50,
  tint = 'light',
  style,
}) => {
  // Use BlurView on iOS for glass effect, regular View on Android
  if (Platform.OS === 'ios') {
    return (
      <GlassView
        className={`rounded-2xl overflow-hidden border border-white/20 ${className}`}
        style={style}
      >
        <View className="p-4">
          {children}
        </View>
      </GlassView>
    );
  }

  // Android fallback with semi-transparent background
  return (
    <View
      className={`rounded-2xl bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 ${className}`}
      style={style}
    >
      <View className="p-4">
        {children}
      </View>
    </View>
  );
};