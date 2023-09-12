import { TasksType } from "@/types/admin/tasks/types";

/**
 * @author Hayato Kobayashi
 * @todo_1 レスポンシブ対応
 */
const TaskList = ({ tasks }: { tasks: TasksType[] }) => {
  if (tasks.length === 0) return (
    <div>表示するデータがありません</div>
  )

  return (
    <div data-testid="data-table">
      <table className="border-collapse border-2 border-deep-gray text-sm">
        <thead className="bg-light-gray">
          <tr>
            <th className="border-2 border-deep-gray p-2 text-center w-72">
              案件名
            </th>
            <th className="border-2 border-deep-gray p-2 text-center w-16">
              質問数
            </th>
            <th className="border-2 border-deep-gray p-2 text-center w-16">
              職種
            </th>
            <th className="border-2 border-deep-gray p-2 text-center w-72">
              回答ユーザー
            </th>
            <th className="border-2 border-deep-gray p-2 text-center w-28">
              期日
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border-2 border-deep-gray p-2 text-center">
                {task.project.name}
              </td>
              <td className="border-2 border-deep-gray p-2 text-center">
                {task.questionCount}
              </td>
              <td
                className="border-2 border-deep-gray p-2 text-center"
                data-testid={`task-data-${task.department}`}
              >
                {task.department.name}
              </td>
              <td className="border-2 border-deep-gray p-2 text-center">
                {/* 回答ユーザーは3名まで表示。それ以降は"..."で省略 */}
                {task.answerUserList.length > 3
                  ? task.answerUserList   // ex)テスト太郎、テスト次郎、テスト三郎...
                      .slice(0, 3)
                      .map((user, i) =>
                        i !== 3 ? (
                          <span key={user.userId}>{user.userName}、</span>
                        ) : (
                          <span key={user.userId}>{user.userName}...</span>
                        )
                      )
                  : task.answerUserList.map((user, i) => (    // ex)テスト太郎、テスト次郎、テスト三郎
                      <span key={user.userId}>
                        {user.userName}
                        {i + 1 !== task.answerUserList.length && "、"}
                      </span>
                    ))}
              </td>
              <td className="border-2 border-deep-gray p-2 text-center">
                {task.deadline.toString().slice(0, 10)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
