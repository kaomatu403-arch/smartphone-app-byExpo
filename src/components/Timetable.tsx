import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

const WEEKDAYS = ["月", "火", "水", "木", "金"];
const PERIODS = [1, 2, 3, 4, 5];

interface TimetableProps {
  /**
   * 時間割を追加・編集するフェーズかどうか
   */
  isEditMode?: boolean;

  /**
   * 追加ボタンが押されたときのコールバック
   * @param day 曜日（例："月"）
   * @param period 時限（例：1）
   */
  onAddCourse?: (day: string, period: number) => void;
}

export default function Timetable({ isEditMode = false, onAddCourse }: TimetableProps) {
  return (
    <View style={styles.container}>
      {/* テーブルのヘッダー行（曜日） */}
      <View style={styles.headerRow}>
        {/* 左上の空白セル */}
        <View style={styles.cornerCell} />
        {WEEKDAYS.map((day, index) => (
          <View key={index} style={styles.headerCell}>
            <Text style={styles.headerText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* テーブルのボディ（時限ごとの行） */}
      {PERIODS.map((period, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {/* 左側の時限セル */}
          <View style={styles.periodCell}>
            <Text style={styles.periodText}>{period}</Text>
          </View>
          {/* 各曜日の枠（授業セル） */}
          {WEEKDAYS.map((day, colIndex) => {
            // TODO: ここで授業データがあるか判定する。現在はデータなしとする。
            const hasCourse = false;

            return (
              <View key={colIndex} style={styles.courseCell}>
                {hasCourse ? (
                  <View>
                    {/* 後でここに授業データを表示する */}
                  </View>
                ) : (
                  // 授業が未登録 かつ 編集モードの場合のみ追加ボタンを表示
                  isEditMode && (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => onAddCourse?.(day, period)}
                    >
                      <Ionicons name="add" size={20} color={Colors.text.secondary} />
                    </TouchableOpacity>
                  )
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.white,
    borderRadius: 16,
    padding: 12,
    // 枠線を少し丸める場合は overflow hidden をつけると綺麗に収まります
    overflow: "hidden",
  },
  // --- 行のスタイル ---
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.light,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.light,
  },
  // --- セルのスタイル ---
  cornerCell: {
    width: 20, // 時限セルの幅に合わせる (30 -> 20)
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4, // ヘッダーの高さを削減 (8 -> 4)
    borderRightWidth: 1,
    borderRightColor: Colors.background.light,
  },
  headerCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4, // ヘッダーの高さを削減 (8 -> 4)
    borderRightWidth: 1,
    borderRightColor: Colors.background.light,
  },
  periodCell: {
    width: 20, // 固定幅 (30 -> 20)
    justifyContent: "center", // 中央揃え
    alignItems: "center",
    minHeight: 110, // 授業枠の高さをさらに拡大 (80 -> 110)
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: Colors.background.light,
  },
  courseCell: {
    flex: 1,
    justifyContent: "center", // コンテンツを中央に
    alignItems: "center",
    minHeight: 110, // 授業枠の高さをさらに拡大 (80 -> 110)
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: Colors.background.light,
  },
  // --- テキストのスタイル ---
  headerText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text.secondary,
  },
  periodText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text.secondary,
  },
  // --- 追加ボタン ---
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.background.light,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
