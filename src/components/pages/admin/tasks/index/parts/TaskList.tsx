"use client";
import { useJobsFilter } from "@/hooks/store/context/TasksContext";
import { Task } from "@/types/admin/tasks/register/types";
import { useState } from "react";

// Todo: タスクリストを非同期通信で取得
const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [jobsFilter, setJobsFilter] = useJobsFilter();

  return (
    <div>
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
          {taskList.map((task) => (
            <tr key={task.id}>
              <td className="border-2 border-deep-gray p-2 text-center">
                {task.project_name}
              </td>
              <td className="border-2 border-deep-gray p-2 text-center">
                {task.question.length}
              </td>
              <td className="border-2 border-deep-gray p-2 text-center">
                {task.department}
              </td>
              <td className="border-2 border-deep-gray p-2 text-center">
                {/* 回答ユーザーは3名まで表示。それ以降は"..."で省略 */}
                {task.users.length > 3
                  ? task.users.slice(0, 3).join("、") + "..."
                  : task.users.join("、")}
              </td>
              <td className="border-2 border-deep-gray p-2 text-center">
                {task.answer_deadline}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
