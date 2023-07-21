import { HistoriesProvider, SelectHistoryProvider } from "@/hooks/store/context/historiesContext";

export const metadata = {
  title: "回答履歴",
  description: "一般ユーザー回答履歴ページ",
};

export default function HistoriesLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      <SelectHistoryProvider>
      <HistoriesProvider>
        {children}
      </HistoriesProvider>
      </SelectHistoryProvider>
    </>
  );
}
