import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAppSelector } from "@/store/hooks";
import {
  formatCurrency,
  formatDate,
  getCurrentMonthTransactions,
} from "@/utils";
import { router } from "expo-router";
import { ArrowDownLeft, ArrowUpRight, Plus } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const transactions = useAppSelector((state) => state.transactions.items);
  const categories = useAppSelector((state) => state.categories.items);
  const { currencySymbol } = useAppSelector((state) => state.settings);

  const monthTransactions = getCurrentMonthTransactions(transactions);

  const totalIncome = monthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = monthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const recentTransactions = transactions.slice(0, 5);

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="py-6 flex-row justify-between items-center">
          <View className="flex-col">
            <Text className="text-3xl font-bold text-gray-900 dark:text-white">
              Budget Tracker
            </Text>
            <Text className="text-gray-600 dark:text-gray-400 mt-1">
              {formatDate(new Date(), "MMMM yyyy")}
            </Text>
          </View>
          {/* Floating Add Button */}
          <TouchableOpacity
            onPress={() => router.push("../modal")}
            className="bg-blue-500 w-16 h-16 rounded-full items-center justify-center shadow-lg"
            style={{
              shadowColor: "#6366F1",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Plus size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <GlassCard className="mb-6" style={{ borderRadius: 36, padding: 16 }}>
          <View className="items-center py-4">
            <Text className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Current Balance
            </Text>
            <Text
              className={`text-4xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatCurrency(balance, currencySymbol)}
            </Text>
          </View>

          <View className="flex-row justify-around mt-6 pt-6 border-t border-white/20">
            {/* Income */}
            <View className="items-center">
              <View className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-2">
                <ArrowDownLeft size={20} color="#10B981" />
              </View>
              <Text className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                Income
              </Text>
              <Text className="text-green-600 font-semibold">
                {formatCurrency(totalIncome, currencySymbol)}
              </Text>
            </View>

            {/* Expense */}
            <View className="items-center">
              <View className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-2">
                <ArrowUpRight size={20} color="#EF4444" />
              </View>
              <Text className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                Expense
              </Text>
              <Text className="text-red-600 font-semibold">
                {formatCurrency(totalExpense, currencySymbol)}
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Recent Transactions */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Transactions
            </Text>
            <TouchableOpacity onPress={() => router.push("/explore")}>
              <Text className="text-primary text-sm">See All</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.length === 0 ? (
            <GlassCard>
              <View className="items-center py-8">
                <Text className="text-gray-500 dark:text-gray-400 text-center">
                  No transactions yet{"\n"}Tap + to add your first transaction
                </Text>
              </View>
            </GlassCard>
          ) : (
            recentTransactions.map((transaction) => {
              const category = categories.find(
                (c) => c.id === transaction.category
              );
              return (
                <GlassCard key={transaction.id} className="mb-3">
                  <View className="flex-row items-center">
                    <CategoryIcon
                      icon={category?.icon || "help-circle"}
                      color={category?.color || "#6B7280"}
                      size={20}
                    />

                    <View className="flex-1 ml-3">
                      <Text className="text-gray-900 dark:text-white font-medium">
                        {transaction.description}
                      </Text>
                      <Text className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        {formatDate(transaction.date, "MMM dd")} •{" "}
                        {category?.name}
                      </Text>
                    </View>

                    <Text
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount, currencySymbol)}
                    </Text>
                  </View>
                </GlassCard>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
