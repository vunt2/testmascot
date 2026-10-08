import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lạc Học — Chim Lạc Mascot Demo",
  description: "Bản demo linh vật Chim Lạc bay đến những vị trí cần hướng dẫn trong ứng dụng học tập Next.js.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
