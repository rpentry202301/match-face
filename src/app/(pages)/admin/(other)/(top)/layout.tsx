export const metadata = {
    title: "トップ",
    description: "管理者トップページ",
  };
  
  export default function TopLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <>{children}</>;
  }
  