import './globals.css';
import { Noto_Sans_JP } from 'next/font/google';

const inter = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: `%s | Match Face`
  },
  // description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
