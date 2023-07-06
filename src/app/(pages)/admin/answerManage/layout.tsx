import Header from "@/components/elements/header/Header";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
  };
  
  export default function RootLayout({
    children,
    header,
  }: {
    children: React.ReactNode;
    header: React.ReactNode;
  }) {
    return (
      <>
        <header className="bg-orange"><Header/></header>
        <div>{children}</div>
      </>
    );
  }
