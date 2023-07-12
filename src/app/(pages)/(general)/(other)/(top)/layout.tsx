export const metadata = {
  title: "トップ",
  description: "一般ユーザートップページ",
};

export default function TopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
