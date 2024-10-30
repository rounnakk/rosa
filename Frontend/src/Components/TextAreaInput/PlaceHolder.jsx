"use client";

import React from "react";
import { PlaceholdersAndVanishInput } from "./placeholder-and-vanish-input";

export function PlaceHolder({handleChatSubmit}) {
  const placeholders = [
    "Enter a prompt...",
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  

  return (
    <div className="">
    
      <PlaceholdersAndVanishInput
        handleChatSubmit={handleChatSubmit}
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
