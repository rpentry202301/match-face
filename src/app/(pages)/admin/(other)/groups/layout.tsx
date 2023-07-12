export const metadata = {
  title: {
    default: "グループ一覧",
    // Todo: 正式なアプリ名に差し替え
    template: `%s | 管理者画面 | Match Face`,
  },
  description: "管理者グループ一覧ページ",
};

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
