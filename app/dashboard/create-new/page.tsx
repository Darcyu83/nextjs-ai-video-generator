"use client";
import { useState } from "react";
import SelectDuration from "./_components/SelectDuration";
import SelectStyle from "./_components/SelectStyle";
import SelectTopic from "./_components/SelectTopic";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface IProps {}

type FormData = {
  topic?: string;
  imageStyle?: string;
  duration?: number;
};

function CreateNewVideo(props: IProps) {
  const [formData, setFormData] = useState<FormData>({});
  const onHandleInputchange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  // Get Video Script
  const getVideoScript = async () => {
    if (!formData.duration) return;

    const prompt = `Write a script to generate ${formData.duration} video on topic : ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and Content Text as field.`;
    console.log("getVideoScript ==== ", prompt);
    // const result = await axios.post("/api/get-video-script", { prompt });
    const result = await axios.get("/api/chart/by-id/100");
    console.log("getVideoScript ==== ", result);
  };

  const onCreateClickHandler = () => {
    getVideoScript();
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        CreateNewVideo
      </h2>

      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputchange} />
        {/* Select style */}
        <SelectStyle onUserSelect={onHandleInputchange} />
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputchange} />
        {/* Create Button */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Craete Short Video
        </Button>
      </div>
    </div>
  );
}

export default CreateNewVideo;
