import React from "react";
import { FlipWords } from "./flip-words";

export function FlipWordsDemo() {
  const words = ["Ajio", "Amazon", "Myntra"];

  return (
    <div className=" flex justify-center items-center px-4">
      <div className="text-xl md:text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Find the best from 
        <FlipWords words={words} /> 
      </div>
    </div>
  );
}
