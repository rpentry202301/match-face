export const metadata = {
    title: {
      // Todo: 正式なアプリ名に差し替え
      template: `%s | 管理者画面 | Match Face`,
    }
  };
  
  export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <>{children}</>;
  }
  