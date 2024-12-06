"use client";
import { useState } from "react";
import SelectDuration from "./_components/SelectDuration";
import SelectStyle from "./_components/SelectStyle";
import SelectTopic from "./_components/SelectTopic";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";

interface IProps {}

type FormData = {
  topic?: string;
  imageStyle?: string;
  duration?: number;
};

function CreateNewVideo(props: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [videoScript, setVideoScript] = useState<
    {
      ContentText: string;
      imagePrompt: string;
    }[]
  >([]);

  const [audioFileUrl, setAudioFileUrl] = useState<string>();
  const onHandleInputchange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  // Get Video Script
  const getVideoScript = async () => {
    if (!formData.duration) return;
    setIsLoading(true);

    const prompt = `Write a script to generate ${formData.duration} video on topic : ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and Content Text as field.`;
    console.log("getVideoScript ==== ", prompt);
    const res = await axios.post("/api/dashboard/get-video-script", { prompt });
    // const result = await axios.get("/api/chart/by-id/100");
    console.log("getVideoScript ==== ", res.data);
    setVideoScript(res.data.result);
    await generateAudioFile(res.data.result);

    setIsLoading(false);
  };

  const generateAudioFile = async (
    _videoScript: {
      ContentText: string;
      imagePrompt: string;
    }[]
  ) => {
    if (!_videoScript) return;

    let script = "";
    const uuid = uuidv4();

    _videoScript.forEach((item) => {
      script = script + item.ContentText + " ";
    });

    console.log("generateAudioFile ==== script", script);

    const response = await axios.post("/api/audio/generate-audio", {
      text: script,
      id: uuid,
    });

    console.log("generateAudioFile ==== response.data.result", response.data);
    setAudioFileUrl(response.data.result);

    await generateAudioCaption(response.data.result);
  };

  const generateAudioCaption = async (audioFileUrl: string) => {
    setIsLoading(true);

    const res = await axios.post("/api/caption/generate-caption", {
      audioFileUrl,
    });

    console.log("Video speech to text", res.data.result);

    setIsLoading(false);
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

      <CustomLoading loading={isLoading} />
    </div>
  );
}

export default CreateNewVideo;
