import Image from "next/image";
import React from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode; // or JSX.Element
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <Image src="/icons/House.svg" alt="Home" width={18} height={18} />,
  },
  {
    label: "Products",
    href: "/products",
    icon: (
      <Image src="/icons/Package.svg" alt="Products" width={18} height={18} />
    ),
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: (
      <Image
        src="/icons/CurrencyBTC.svg"
        alt="Transactions"
        width={18}
        height={18}
      />
    ),
  },
  {
    label: "Customers",
    href: "/customers",
    icon: <Image src="/icons/Users.svg" alt="Users" width={18} height={18} />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Image src="/icons/Gear.svg" alt="Gear" width={18} height={18} />,
  },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  {
    label: "Docs",
    href: "/docs",
    icon: <Image src="/icons/BookOpen.svg" alt="Docs" width={18} height={18} />,
  },
  {
    label: "Support",
    href: "/support",
    icon: (
      <Image src="/icons/Headset.svg" alt="Support" width={18} height={18} />
    ),
  },
];
