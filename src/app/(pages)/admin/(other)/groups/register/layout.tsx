import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";

export const metadata = {
    title: "グループ設定",
    description: "管理者グループ設定ページ",
  };
  
  export default function GroupRegisterLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <UserSelectProvider>{children}</UserSelectProvider>;
  }
  