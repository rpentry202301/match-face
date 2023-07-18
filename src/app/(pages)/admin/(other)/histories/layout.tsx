import { HistoriesProvider } from "@/hooks/store/context/historiesContext";
export const metadata = {
    title: "回答閲覧",
    description: "管理者回答閲覧ページ",
  };
  
export default function HistoriesLayout({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <>
      <HistoriesProvider>
        {children}
      </HistoriesProvider>
    </>
  );
}
  