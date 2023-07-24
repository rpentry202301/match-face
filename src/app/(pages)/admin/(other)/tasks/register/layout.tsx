import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";
import { SelectedQuestionProvider } from "@/hooks/store/context/SelectedQuestionContext";

export const metadata = {
  title: "タスク設定",
  description: "管理者タスク設定ページ",
};

export default function TaskRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SelectedQuestionProvider>
      <UserSelectProvider>
        {children}
      </UserSelectProvider>
    </SelectedQuestionProvider>
  )
}
