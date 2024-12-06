"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";

interface IProps {
  onUserSelect: (fieldName: string, fieldValue: string) => void;
}

function SelectTopic({ onUserSelect }: IProps) {
  const options = [
    "Custom Prompt",
    "Random AI Story",
    "Scary Story",
    "Historical Facts",
    "Bed Time Story",
    "Motivational",
    "Fun Facts",
  ] as const;

  const [selectedOption, setSelectedOption] =
    useState<(typeof options)[number]>();
  return (
    <div style={{}}>
      <h2 className="font-bold text-2xl text-primary">Content</h2>
      <p className="text-gray-500">What is the topic of your video?</p>

      <Select
        onValueChange={(value: (typeof options)[number]) => {
          setSelectedOption(value);
          value !== "Custom Prompt" && onUserSelect("topic", value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            return (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {selectedOption === "Custom Prompt" && (
        <Textarea
          className="mt-3"
          onChange={(e) => {
            onUserSelect("topic", e.target.value);
          }}
          placeholder="Write prompt on which you want to generate video"
        />
      )}
    </div>
  );
}

export default SelectTopic;
