import React from "react";

export function SaltBtn({ children, onClick, index, className, isAvailable }) {
  return (
    <button
      className={`inline text-[13px] border-[2px] rounded-lg px-3 py-1 ${className} ${isAvailable}`}
      onClick={() => onClick(index)}
    >
      {children}
    </button>
  );
}
