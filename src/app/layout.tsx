import React from 'react';
import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';


export const metadata: Metadata = {
  title: "Dinamo CRUD Posts",
  description: "Generated by create rewan mohamed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
      <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
