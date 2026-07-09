import { Task } from '@/components/TaskList';

/**
 * 指定した期間内の繰り返しタスク（ゴーストタスク）を動的に生成し、元のリストとマージして返します。
 * @param tasks 現在のタスクリスト（未完了タスク）
 * @param startDate 表示期間の開始日
 * @param endDate 表示期間の終了日
 * @returns ゴーストタスクを含んだタスクリスト
 */
export function generateGhostTasksForPeriod(tasks: Task[], startDate: Date, endDate: Date): Task[] {
  const ghostTasks: Task[] = [];
  const oneDayMs = 24 * 60 * 60 * 1000;
  
  const startMs = startDate.getTime();
  const endMs = endDate.getTime();

  for (const task of tasks) {
    if (task.is_recurring === 1 && task.is_completed === 0) {
      const baseDate = new Date(task.due_date);
      let currentGhostDate = new Date(baseDate.getTime() + 7 * oneDayMs);
      
      let safeGuard = 0;
      while (currentGhostDate.getTime() <= endMs && safeGuard < 520) {
        if (currentGhostDate.getTime() >= startMs) {
          ghostTasks.push({
            ...task,
            id: `ghost-${task.id}-${currentGhostDate.getTime()}`,
            due_date: currentGhostDate.toISOString(),
            is_ghost: true
          });
        }
        currentGhostDate = new Date(currentGhostDate.getTime() + 7 * oneDayMs);
        safeGuard++;
      }
    }
  }

  // オリジナルタスクとゴーストタスクを結合
  const allTasks = [...tasks, ...ghostTasks];
  
  // 指定された期間（startMs 〜 endMs）に含まれるものだけを抽出して返す
  return allTasks.filter(t => {
    const time = new Date(t.due_date).getTime();
    return time >= startMs && time <= endMs;
  });
}
