export const metadata = {
  title: {
    // Todo: 正式なアプリ名に差し替え
    template: `%s | 一般ユーザー画面 | Match Face`,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
