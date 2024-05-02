import type { Metadata } from "next";
import fonts from "@/utils/fonts";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Magnidia",
  description: "Event Ticketing and Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
