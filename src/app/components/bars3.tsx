import React, { useState } from "react";

interface BarsSizeProps {
  size: "sm" | "md" | "lg";
  onClick?: () => void;
  isOpen: boolean;
}

const sizeProp = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export default function Bars3({ size, onClick, isOpen }: BarsSizeProps) {
  return (
    <div onClick={onClick}>
      {!isOpen ? (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={sizeProp[size]}
          >
            <path
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      ) : (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={sizeProp[size]}
          >
            <path strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      )}
    </div>
  );
}
