import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Providers } from "./providers";
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
    <html lang="en" suppressHydrationWarning data-theme="light">
      <body
        className={classnames(
          rubik.className,
          "h-screen max-h-screen overscroll-none"
        )}
      >
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
