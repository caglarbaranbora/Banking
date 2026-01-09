import * as Icons from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

interface CategoryIconProps {
  icon: string;
  color: string;
  size?: number;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  icon,
  color,
  size = 24,
  className = '',
}) => {
  // Convert icon name from kebab-case to PascalCase
  // e.g., 'shopping-bag' -> 'ShoppingBag'
  const iconName = icon
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') as keyof typeof Icons;

  // Get the icon component
  const IconComponent = Icons[iconName];

  // Fallback to HelpCircle if icon not found
  const Icon = IconComponent || Icons.HelpCircle;

  return (
    <View
      className={`w-12 h-12 rounded-full items-center justify-center ${className}`}
      style={{ backgroundColor: color + '20' }}
    >
      <Icon size={size} color={color} strokeWidth={2} />
    </View>
  );
};