import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { initDatabase } from "../database/init";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SQLiteProvider } from "expo-sqlite";

// 準備ができるまでスプラッシュ画面を隠さない
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function setupApp() {
      try {
        // アプリ起動時の準備処理（SQLiteProviderが初期化を行うためDB処理は不要）
        // 念のため少しだけ遅延を入れてからスプラッシュを隠す
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.error("アプリ起動準備中にエラーが発生しました", e);
      } finally {
        setIsReady(true);
        // 初期化が終わったらスプラッシュ画面を消す
        await SplashScreen.hideAsync();
      }
    }

    setupApp();
  }, []);

  if (!isReady) {
    // 準備中は何も表示しない（裏でスプラッシュ画面が表示され続ける）
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName="app.db" onInit={initDatabase}>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </BottomSheetModalProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
