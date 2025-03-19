"use client";

import Bars3 from "./bars3";
import { useUserSession } from "@/hooks/useUserSession";
import { MenuItems } from "@/utils/RawData";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function MobileMenu() {
  const { session } = useUserSession();

  const handleAddContent = () => {};

  return (
    <Dialog>
      <DialogTrigger>
        <Bars3 size="lg" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left my-5 font-quicksand font-medium text-2xl">
            Secondary Brain
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-3">
              <div className="flex justify-center items-center gap-3">
                {session && (
                  <div className="flex flex-col gap-3">
                    {MenuItems.map((menu, index) => (
                      <Link href={menu.url} key={index}>
                        <div className="flex items-center gap-2 text-xl">
                          <menu.icon size={20} />
                          {menu.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Button onClick={handleAddContent} className="mt-5">
                Add Content
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
