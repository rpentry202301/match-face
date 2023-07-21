import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";

export const metadata = {
  title: "タスク設定",
  description: "管理者タスク設定ページ",
};

export default function TaskRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserSelectProvider>{children}</UserSelectProvider>
}
