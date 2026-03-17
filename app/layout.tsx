import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "背景移除工具",
  description: "快速移除图片背景，基于 remove.bg API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
