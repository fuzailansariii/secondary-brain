"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserSession } from "@/app/hook/useUserSession";
import { MenuItems, authenticationRoutes } from "@/utils/RawData";
import { User2, ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const { session } = useUserSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="w-64 min-h-screen bg-gray-100 border-r flex flex-col justify-between fixed">
      {/* Header */}
      <div className="p-4 text-2xl font-bold border-b">Secondary Brain</div>

      {/* Menu Items */}
      <nav className="flex-grow p-4 space-y-2">
        {MenuItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            <item.icon size={18} />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        {session ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-200 transition"
            >
              <div className="flex items-center gap-2">
                <User2 size={18} />
                <span>{session.user.fullName}</span>
              </div>
              <ChevronDown size={16} />
            </button>

            {dropdownOpen && (
              <div className="absolute bottom-12 left-0 w-full bg-white border rounded shadow-md">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => alert("Add Content Clicked")}
                >
                  Add Content
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {authenticationRoutes.map((menu) => (
              <Link
                key={menu.title}
                href={menu.url}
                className="w-full text-center px-4 py-2 bg-white border rounded hover:bg-gray-200 transition"
              >
                {menu.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
