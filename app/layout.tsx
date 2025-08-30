import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StacksPay",
  description:
    "StacksPay is stripe on steroids for the Stacks ecosystem. With StacksPay, you can accept payments in Bitcoin and Stacks, send payouts, and manage your business finances all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased w-screen h-screen overflow-hidden`}
      >
        <SidebarProvider className="flex h-full w-full items-start justify-start">
          <AppSidebar>
            {/*   // this fixes an issue with not having children in the sidebar */}
            <></>
          </AppSidebar>

          <div className="h-full flex-1">{children}</div>
        </SidebarProvider>
      </body>
    </html>
  );
}
