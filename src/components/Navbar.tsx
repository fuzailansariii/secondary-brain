"use client";
import React from "react";
import { MenuItems } from "../utils/RawData";
import Link from "next/link";
import { useUserSession } from "@/hooks/useUserSession";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import avatarImage from "@/assets/UserAvatar.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { session, status } = useUserSession();

  const handleLogout = () => {
    signOut();
  };

  const userInitial = session?.user?.fullName
    ? session.user.fullName.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="flex justify-between items-center md:mx-16 mx-2 shadow-lg md:my-8 my-4 md:px-8 px-4 md:py-4 py-2 rounded-full sticky top-2 z-50">
      {/* Logo/Title */}
      <div>
        <Link
          href="/"
          className="md:text-2xl text-xl font-quicksand cursor-pointer"
        >
          Secondary Brain
        </Link>
      </div>

      {/* Menu Items */}
      <div className="hidden md:flex gap-7 items-center mx-16">
        {status === "loading"
          ? null
          : session &&
            MenuItems.map((menu, index) => (
              <Link
                key={index}
                href={menu.url}
                className="text-lg font-quicksand font-medium cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <menu.icon />
                  {menu.title}
                </div>
              </Link>
            ))}
      </div>

      {/* Authentication menu */}
      <div className="flex items-center gap-3">
        {!session ? (
          <>
            <Link href="/login">
              <Button variant="outline" className="rounded-full">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="default" className="rounded-full">
                Register
              </Button>
            </Link>
          </>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={avatarImage.src}
                    width={35}
                    height={35}
                    className="rounded-full"
                    alt="User Avatar"
                  />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mt-2">
                <DropdownMenuLabel>{session.user.fullName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="md:hidden block">
              <MobileMenu />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
