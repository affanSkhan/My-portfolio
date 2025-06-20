"use client";

import { Dispatch, SetStateAction } from "react";

interface ToggleProps {
  view: string;
  setView: Dispatch<SetStateAction<string>>;
  options: string[];
}

export default function Toggle({ view, setView, options = [] }: ToggleProps) {
  if (!options || options.length < 2) {
    return <p className="text-red-500">Toggle requires at least two options</p>;
  }

  return (
    <div className="inline-flex bg-zinc-100 dark:bg-zinc-700 rounded-full p-1 border border-zinc-300 dark:border-zinc-600">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setView(option)}
          className={`px-4 py-1 rounded-full transition-all duration-300 text-sm font-medium ${
            view === option
              ? "bg-white dark:bg-zinc-900 text-black dark:text-white shadow"
              : "text-zinc-600 dark:text-zinc-300"
          }`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}
