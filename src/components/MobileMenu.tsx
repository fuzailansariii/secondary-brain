"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Bars3 from "./bars3";
import Cross from "./cross";
import { useUserSession } from "@/app/hook/useUserSession";
import { authenticationRoutes } from "@/utils/RawData";
import Link from "next/link";
import Exit from "./exit";
import { signOut } from "next-auth/react";

export default function MobileMenu() {
  const { session, status } = useUserSession();
  const handleClick = () => {
    signOut();
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center">
          <Bars3 size="lg" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <AlertDialogTitle>Secondary Brain</AlertDialogTitle>
              <AlertDialogCancel>
                <Cross size="lg" />
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>

          <AlertDialogDescription>
            <div className="flex gap-4">
              {!session ? (
                authenticationRoutes.map((menu, index) => (
                  <Link
                    key={index}
                    href={menu.url}
                    className="text-lg font-quicksand font-medium cursor-pointer"
                  >
                    {menu.title}
                  </Link>
                ))
              ) : (
                <div>
                  <h1>
                    hello, <span>{session.user.fullName}</span>
                  </h1>
                  <div onClick={handleClick}>
                    <Exit size="lg" />
                  </div>
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
