import { ReactNode } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const result = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!result?.session?.userId) {
    redirect("/auth/sign-in");
  }

  return <>{children}</>;
}
