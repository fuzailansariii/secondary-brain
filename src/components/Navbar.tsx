"use client";
import React from "react";
import { authenticationRoutes } from "../utils/RawData";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { useUserSession } from "@/app/hook/useUserSession";
import { signOut } from "next-auth/react";
import Exit from "./exit";

export default function Navbar() {
  const { session, status } = useUserSession();
  const handleClick = () => {
    signOut();
  };
  return (
    <div className="m-2 p-2 flex justify-between items-center">
      <Link href={"/"} className="text-2xl m-2 font-quicksand cursor-pointer">
        Secondary Brain
      </Link>
      <div>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center mx-10">
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

        {/* Mobile Menu */}
        <div className="md:hidden block items-center">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
