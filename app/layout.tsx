import type { Metadata } from "next";
import fonts from "@/utils/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Magnidia",
  description: "Event Ticketing and Management Platform",
  icons: {
    icon: "/logo_square.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts}>{children}</body>
    </html>
  );
}
