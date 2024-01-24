"use client";
import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import axios from "axios";

export default function FilterTab() {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  const handleIsSelected = (index: any) => {
    if (selectedButtonIndex === index) {
      setSelectedButtonIndex(null);
    } else {
      setSelectedButtonIndex(index);
    }
  };

  return (
    <div className="fixed px-2 z-10 sm:top-[52px] md:top-[60px] lg:right-[230px] md:right-[100px] bg-[#212121f4] text-md text-[#bcbcbc] font-light rounded-br-xl rounded-bl-xl right-2">
      <div className="flex gap-2 flex-col p-4 w-[200px]">
        {["Favorites", "Blue", "Pink", "White", "Green"].map((label, index) => (
          <button
            key={index}
            className="hover:cursor-pointer flex items-center justify-between"
            onClick={() => handleIsSelected(index)}
          >
            <p className="text-left">{label}</p>
            {selectedButtonIndex === index ? <BsCheck2 /> : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
