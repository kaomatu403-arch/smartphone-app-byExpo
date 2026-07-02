import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MonthCalendar from "@/components/MonthCalendar";
import WeekCalendar from "@/components/WeekCalendar";
import Timetable from "@/components/Timetable";
import { Colors } from "@/constants/colors";

// ---------------------------------------------------------
// 【モックデータ】
// 後で差し替えポイント：
//   ここを DB や状態管理から取得した値に置き換えるだけでOK。
//   形式: { 日にち: タスク件数 } の Record<number, number>
// ---------------------------------------------------------
const MOCK_TASK_COUNTS: Record<number, number> = {
  1: 1,
  3: 1,
  10: 1,
  17: 1,
  19: 4, // 件数が多い → 濃いバッジ
  20: 1,
  24: 1,
  31: 1,
};

export default function Index() {
  const taskCounts = MOCK_TASK_COUNTS;
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {/* モード切り替えボタン（確認用） */}
        <View style={styles.headerControls}>
          <TouchableOpacity 
            style={styles.toggleButton} 
            onPress={() => setIsEditMode(!isEditMode)}
          >
            <Text style={styles.toggleButtonText}>
              {isEditMode ? "時間割編集を終了" : "時間割を追加する"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 時間割（枠のみ） */}
        <Timetable isEditMode={isEditMode} />

        {/* 週表示カレンダー */}
        <WeekCalendar taskCounts={taskCounts} />

        {/* 月表示カレンダー */}
        <MonthCalendar taskCounts={taskCounts} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 16,
  },
  headerControls: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  toggleButton: {
    backgroundColor: Colors.background.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  toggleButtonText: {
    color: Colors.purple.primary,
    fontWeight: "700",
    fontSize: 14,
  },
});