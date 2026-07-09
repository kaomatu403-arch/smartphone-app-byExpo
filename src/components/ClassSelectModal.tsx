import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Timetable from './Timetable';

interface ClassSelectModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectClass: (course: any | null) => void;
}

export default function ClassSelectModal({ visible, onClose, onSelectClass }: ClassSelectModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose} // Android hardware back button
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerSide}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>キャンセル</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>授業を選択</Text>
          </View>
          <View style={styles.headerSide} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
          <Text style={styles.description}>
            追加する課題の対象となる授業を選んでください。
          </Text>

          <TouchableOpacity 
            style={styles.noClassButton}
            onPress={() => onSelectClass(null)}
          >
            <Ionicons name="layers-outline" size={20} color={Colors.purple.primary} />
            <Text style={styles.noClassButtonText}>授業に紐付けない（一般課題）</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>または時間割から選択</Text>
            <View style={styles.divider} />
          </View>

          {/* 時間割コンポーネントを再利用（選択モード） */}
          <Timetable 
            isSelectMode={true} 
            onSelectClass={(course) => onSelectClass(course)} 
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: Colors.background.white,
  },
  headerSide: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  closeButton: {
    padding: 8,
    marginLeft: -8, // パディング分のズレを補正して左端にぴったり合わせる
  },
  closeButtonText: {
    fontSize: 14, // 指定通り文字を少し小さく
    color: Colors.purple.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: Colors.text.secondary,
    fontSize: 14,
  },
  noClassButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.white,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.purple.primary,
    gap: 8,
  },
  noClassButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.purple.primary,
  },
});
