import { ProductsTable } from "@/components/products-table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PRODUCTS_STAT = [
  {
    category: "all",
    count: 8,
  },
  {
    category: "active",
    count: 6,
  },
  {
    category: "archived",
    count: 2,
  },
];

export default function ProductsPage() {
  return (
    <div className="max-w-screen-lg mx-auto space-y-3">
      <header className="flex items-center justify-between py-4">
        <h1>Products</h1>
        <div className="flex items-center justify-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="space-x-1">
                <PlusIcon className="text-white" />
                New product
              </Button>
            </SheetTrigger>
            <SheetContent className="space-y-[32px]">
              <SheetHeader>
                <SheetTitle>as</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="flex flex-col flex-1 gap-[24px]">
                <div className="grid gap-[10px]">
                  <Label htmlFor="sheet-demo-name">Name</Label>
                  <p className="text-[#8e8e8e] text-sm">
                    Enter name of the product that will be displayed
                  </p>

                  <Input id="sheet-demo-name" value="Enter product name" />
                </div>
                <div className="grid gap-[10px]">
                  <Label htmlFor="sheet-demo-username">Description</Label>
                  <p className="text-[#8e8e8e] text-sm">
                    Enter name of the product that will be displayed
                  </p>
                  <Textarea placeholder="Type your message here." />
                </div>

                <div className="flex flex-col items-start justify-start gap-[10px]">
                  <Label htmlFor="sheet-demo-name">Product Image</Label>
                  <p className="text-[#8e8e8e] text-sm">
                    Enter name of the product that will be displayed
                  </p>

                  <Button
                    variant="tertiary"
                    id="sheet-demo-name"
                    defaultValue="Upload Image"
                    className="w-auto"
                  >
                    <Plus />
                    Upload Image
                  </Button>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
                <Button type="submit">Save changes</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex items-center justify-between space-x-2 py-2">
        {PRODUCTS_STAT.map((product, index) => (
          <Card
            key={index}
            className="flex-1 shadow-[0_0px_2px_0px_rgba(28,40,64,.18),0_1px_3px_0px_rgba(24,41,75,0.04)] p-1"
          >
            <CardHeader>
              <CardTitle>{product.count}</CardTitle>
              <CardDescription className="capitalize">
                {product.category}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <ProductsTable />
    </div>
  );
}
