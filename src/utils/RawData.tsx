import { ReactNode } from "react";
import { FaHashtag, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";
import { IconType } from "react-icons/lib";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";

interface MenuItemsProps {
  icon: IconType;
  title: string;
  url: string;
}

export const MenuItems: MenuItemsProps[] = [
  { icon: FaXTwitter, title: "Tweets", url: "/" },
  { icon: FaYoutube, title: "Videos", url: "/" },
  { icon: GrDocumentText, title: "Documents", url: "/" },
  { icon: PiLinkSimpleHorizontalBold, title: "Links", url: "/" },
  { icon: FaHashtag, title: "Tags", url: "/" },
];

export const authenticationRoutes = [
  {
    title: "Register",
    url: "/register",
  },
  {
    title: "Login",
    url: "/login",
  },
];
