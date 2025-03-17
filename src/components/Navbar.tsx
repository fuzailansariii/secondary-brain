"use client";
import React from "react";
import { authenticationRoutes, MenuItems } from "../utils/RawData";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { useUserSession } from "@/app/hook/useUserSession";
import { signOut } from "next-auth/react";
import Exit from "./exit";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react"; // Spinner icon (optional)

export default function Navbar() {
  const { session, status } = useUserSession();

  const handleClick = () => {
    signOut();
  };

  return (
    <div className="m-2 p-2 flex justify-between items-center">
      <Link href="/" className="text-2xl m-2 font-quicksand cursor-pointer">
        Secondary Brain
      </Link>

      <div>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center mx-10">
          {status === "loading" ? (
            <Loader2 className="animate-spin text-primary" size={24} />
          ) : !session ? (
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
            <div className="flex justify-center items-center gap-3">
              <p className="font-quicksand text-lg">
                Hello,{" "}
                <span className="font-semibold">{session.user.fullName}</span>
              </p>
              <Button onClick={handleClick} variant="outline">
                <Exit size="md" />
                Logout
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden block items-center">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
