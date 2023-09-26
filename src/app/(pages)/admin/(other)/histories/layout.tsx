import { SelectHistoryProvider } from "@/hooks/store/context/historiesContext";
export const metadata = {
    title: "回答閲覧",
    description: "管理者回答閲覧ページ",
  };
  
export default function HistoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SelectHistoryProvider>
        {children}
    </SelectHistoryProvider>
  );
}
  