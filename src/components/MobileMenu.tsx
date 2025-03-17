"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
import { Button } from "./ui/button";

export default function MobileMenu() {
  const { session, status } = useUserSession();
  const handleClick = () => {
    signOut();
  };

  const handleAddContent = () => {};

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
            <div className="flex flex-col text-center gap-4">
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
                <div className="flex flex-col gap-3">
                  <div className="flex justify-center items-center gap-3">
                    <p className="font-quicksand text-lg">
                      Hello,{" "}
                      <span className="font-semibold">
                        {session.user.fullName}
                      </span>
                    </p>
                    <Button onClick={handleClick} variant="outline">
                      <Exit size="md" />
                      Logout
                    </Button>
                  </div>
                  <Button onClick={handleAddContent}>Add Content</Button>
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
