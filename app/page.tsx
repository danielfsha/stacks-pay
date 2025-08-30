"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("../components/header"), { ssr: false });

export default function Page() {
  return (
    <div>
      <Header />
    </div>
  );
}
