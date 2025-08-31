import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import Header from "@/components/header";

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
        suppressHydrationWarning
        className={`${inter.className} antialiased w-screen h-screen overflow-hidden`}
      >
        <SidebarProvider className="flex h-full w-full items-start justify-start">
          <AppSidebar>
            {/*   // this fixes an issue with not having children in the sidebar */}
            <></>
          </AppSidebar>

          <div className="h-full flex-1 flex flex-col">
            <Header />

            <main className="w-full h-full mx-auto overflow-y-scroll pb-16 p-2">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
