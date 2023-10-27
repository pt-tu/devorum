import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Providers } from "./Providers.1";
import { Header } from "@/components";
import classnames from "classnames";

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
    <html lang="en" suppressHydrationWarning>
      <body className={classnames(rubik.className, "h-screen max-h-screen")}>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
