export const metadata = {
  title: {
    default: "認証メール送信",
    // Todo: 正式なアプリ名に差し替え
    template: `%s | Match Face`,
  },
  description: "パスワード変更用認証メール送信画面",
};

export default function RemindLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
