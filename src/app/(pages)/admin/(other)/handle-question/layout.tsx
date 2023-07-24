import { SelectProvider } from "@/hooks/store/context/HandleQuestionContext";

export const metadata = {
  title: {
    default: "質問・解答の追加/編集",
    // Todo: 正式なアプリ名に差し替え
    template: `%s | 管理者画面 | Match Face`,
  },
  description: "管理者質問・解答の追加/編集ページ",
};

export default function HandleQuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SelectProvider>{children}</SelectProvider>;
}
