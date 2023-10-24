import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Providers } from "./providers";

const rubik = Rubik({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Devorum",
  description: "Forum for Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
