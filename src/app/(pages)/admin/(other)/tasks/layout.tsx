import { JobsFilterProvider } from "@/hooks/store/context/TasksContext";

export const metadata = {
  title: {
    default: "タスク一覧",
    // Todo: 正式なアプリ名に差し替え
    template: `%s | 管理者画面 | Match Face`,
  },
  description: "管理者質問・解答の追加/編集ページ",
};

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JobsFilterProvider>
      {children}
    </JobsFilterProvider>
  );
}
