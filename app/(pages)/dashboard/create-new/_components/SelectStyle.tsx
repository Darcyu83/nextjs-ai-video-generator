import Image from "next/image";
import { useState } from "react";

interface IProps {
  onUserSelect: (fieldName: string, fieldValue: string) => void;
}

function SelectStyle({ onUserSelect }: IProps) {
  const styleOptions = [
    { name: "Realistic", image: "/images/real.jpg" },
    { name: "Cartoon", image: "/images/cartoon.webp" },
    { name: "Fantasy", image: "/images/fantasy.jpeg" },
    { name: "Historic", image: "/images/historic.jpg" },
    { name: "Cartoon1", image: "/images/cartoon.webp" },
  ] as const;

  const [selectedOption, setSelectedOption] =
    useState<(typeof styleOptions)[number]["name"]>();

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500">Select your video style</p>

      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
        {styleOptions.map((option) => {
          return (
            <div
              key={option.name}
              className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl border-4
                ${
                  selectedOption === option.name
                    ? "border-primary"
                    : "border-transparent"
                }`}
              onClick={() => {
                setSelectedOption(option.name);
                onUserSelect("imageStyle", option.name);
              }}
            >
              <Image
                className="h-48 object-cover rounded-lg w-full"
                src={option.image}
                alt="video style sample"
                width={100}
                height={100}
              />

              <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">
                {option.name}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectStyle;
