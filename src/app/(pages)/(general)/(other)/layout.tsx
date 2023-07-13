export default function Layout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-orange h-10">{header}</header>
      <div>{children}</div>
    </>
  );
}
