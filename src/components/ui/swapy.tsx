"use client";
import { cn } from "@/lib/utils";

export const DragHandle = ({ className }: { className?: string }) => {
  return (
    <div
      data-swapy-handle
      className={cn(
        "absolute top-2 left-2 cursor-grab  text-gray-500  rounded-md bg-transparent  active:cursor-grabbing  ",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-grip-vertical-icon lucide-grip-vertical opacity-80"
      >
        <circle cx="9" cy="12" r="1" />
        <circle cx="9" cy="5" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="15" cy="19" r="1" />
      </svg>
    </div>
  );
};
