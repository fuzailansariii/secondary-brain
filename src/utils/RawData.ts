import { FaHashtag, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";
import { IconType } from "react-icons/lib";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";

interface MenuItemsProps {
  icon: IconType;
  title: string;
  url: string;
}
interface AuthenticationRoutesProps {
  title: string;
  url: string;
}

interface FeaturesCardDataProps {
  title: string;
  description: string;
}

export const MenuItems: MenuItemsProps[] = [
  { icon: FaXTwitter, title: "Tweets", url: "/" },
  { icon: FaYoutube, title: "Videos", url: "/" },
  { icon: GrDocumentText, title: "Documents", url: "/" },
  { icon: PiLinkSimpleHorizontalBold, title: "Links", url: "/" },
  { icon: FaHashtag, title: "Tags", url: "/" },
];

export const authenticationRoutes: AuthenticationRoutesProps[] = [
  {
    title: "Register",
    url: "/register",
  },
  {
    title: "Login",
    url: "/login",
  },
];

export const featuresCardData: FeaturesCardDataProps[] = [
  {
    title: "Save Any Link",
    description: "Store links from YouTube, Twitter (X), blogs, and more.",
  },
  {
    title: "Organized Recall",
    description: "Everything you save is ready to be viewed when you need it.",
  },
  {
    title: "Distraction-Free",
    description: "No ads, no clutter—just the content you care about.",
  },
];
