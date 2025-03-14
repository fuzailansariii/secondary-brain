"use client";
import React, { useState } from "react";
import Bars3 from "./bars3";
import { MenuItems } from "../app/utils/RawData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-2">
      <div className="mx-3 flex justify-between items-center">
        <h1 className="text-2xl m-2 font-quicksand">Secondary Brain</h1>
        <Bars3 size="lg" onClick={handleClick} isOpen={isOpen} />
      </div>
      {isOpen ? (
        <div className="my-10">
          {MenuItems.map((menu, index) => (
            <ul key={index} className="">
              <li className="flex items-center gap-5 text-xl">
                <menu.icon />
                <a href="/">{menu.title}</a>
              </li>
            </ul>
          ))}
        </div>
      ) : (
        <div>Hello World!</div>
      )}
    </div>
  );
}
