# データベースER図 (v2.0)

改訂版 `database_design.md` に基づくエンティティ・リレーションシップ（ER）図です。

```mermaid
erDiagram
    %% リレーションシップ
    classes ||--o{ tasks : "1:多 ON DELETE CASCADE"
    task_locations ||--o{ tasks : "1:多 ON DELETE SET NULL"
    tasks ||--o{ task_reminders : "1:多 ON DELETE CASCADE"

    %% テーブル定義
    classes {
        INTEGER id PK "AUTOINCREMENT"
        TEXT name "NOT NULL"
        TEXT teacher_name
        INTEGER day_of_week "NOT NULL"
        INTEGER period "NOT NULL"
        TEXT url
        TEXT room
        TEXT color_code
    }

    task_locations {
        INTEGER id PK "AUTOINCREMENT"
        TEXT name "NOT NULL, UNIQUE"
    }

    tasks {
        INTEGER id PK "AUTOINCREMENT"
        TEXT name "NOT NULL"
        INTEGER class_id FK "-> classes.id CASCADE"
        INTEGER location_id FK "-> task_locations.id SET NULL"
        TEXT format "NOT NULL, CHECK"
        TEXT created_at "NOT NULL, ISO 8601"
        TEXT due_date "NOT NULL, ISO 8601"
        TEXT updated_at "NOT NULL, ISO 8601"
        TEXT details
        INTEGER is_completed "DEFAULT 0"
        INTEGER is_recurring "DEFAULT 0"
        TEXT recurrence_interval "DEFAULT weekly"
    }

    task_reminders {
        INTEGER id PK "AUTOINCREMENT"
        INTEGER task_id FK "-> tasks.id CASCADE"
        TEXT remind_type "NOT NULL"
        TEXT remind_at "NOT NULL, ISO 8601"
        TEXT notification_id
    }
```

### 制約一覧

| テーブル | 制約 | 説明 |
|:---|:---|:---|
| `classes` | `UNIQUE (day_of_week, period)` | 同じ曜日・時限の授業重複を防止 |
| `tasks` | `CHECK (format IN (...))` | タスク形式を許容値に制限 |
| `task_reminders` | `UNIQUE (task_id, remind_type)` | 同一タスクへの同種通知の重複を防止 |

### インデックス一覧

| テーブル | インデックス名 | 対象カラム |
|:---|:---|:---|
| `tasks` | `idx_tasks_class_id` | `class_id` |
| `tasks` | `idx_tasks_due_date` | `due_date` |
| `tasks` | `idx_tasks_is_completed` | `is_completed` |
| `task_reminders` | `idx_reminders_task_id` | `task_id` |
