"use client";
import { useEffect, useRef, useState } from "react";
import SelectDuration from "./_components/SelectDuration";
import SelectStyle from "./_components/SelectStyle";
import SelectTopic from "./_components/SelectTopic";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import {
  useVideoDataContext,
  VideoData,
} from "@/app/_context/VideoDataContextProvider";
import { db } from "@/configs/db";
import { VideoDataTable } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";

const imageUrls = [
  "https://firebasestorage.googleapis.com/v0/b/nextjs-ai-video-generato-24256.firebasestorage.app/o/nextjs-ai-video-files%2F1733729985313.png?alt=media&token=d3f69e3d-58d8-4152-8282-0048bb631cb0",
  "https://firebasestorage.googleapis.com/v0/b/nextjs-ai-video-generato-24256.firebasestorage.app/o/nextjs-ai-video-files%2F1733729986394.png?alt=media&token=1e10aace-50c4-4182-8625-8f88b055454b",
  "https://firebasestorage.googleapis.com/v0/b/nextjs-ai-video-generato-24256.firebasestorage.app/o/nextjs-ai-video-files%2F1733729987250.png?alt=media&token=f4600a06-e50d-4e55-9fcc-d5ffd14cbfad",
  "https://firebasestorage.googleapis.com/v0/b/nextjs-ai-video-generato-24256.firebasestorage.app/o/nextjs-ai-video-files%2F1733729988233.png?alt=media&token=241bfe71-6f04-46b7-9a23-877cd00120d8",
];

interface IProps {}

type FormData = {
  topic?: string;
  imageStyle?: string;
  duration?: number;
};

// Generate Video Script with AI -> Gemini AI
// Covert Video Script to Audio MP3 -> Google Cloud Text to Speech
// Save Audio MP3 file to Firebase Storage -> Firebase storage
// Generate Captions With video file URL -> Assembly AI
// Generate AI Image from Image Prompt -> Image Prompt then save images to Firebase Storage
// Save to Database

function CreateNewVideo(props: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  // const [videoScript, setVideoScript] = useState<
  //   {
  //     ContentText: string;
  //     imagePrompt: string;
  //   }[]
  // >([]);
  // const [captions, setCaptions] = useState<string>();
  // const [audioFileUrl, setAudioFileUrl] = useState<string>();
  // const [imageList, setImageList] = useState<string[]>();

  const { videoData, setVideoDataParams } = useVideoDataContext();
  const { user } = useUser();
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
    // setVideoScript(res.data.result);

    if (res.data.result) {
      setVideoDataParams({
        videoScript: res.data.result,
      });
    }

    await generateAudioFile(res.data.result);

    await generateImage(res.data.result);

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

    console.log("generateAudioFile ==== firebase storage path", response.data);
    // setAudioFileUrl(response.data.result);

    if (response.data.result) {
      setVideoDataParams({
        audioFileUrl: response.data.result,
      });
    }

    await generateAudioCaption(response.data.result);
  };

  const generateAudioCaption = async (audioFileUrl: string) => {
    setIsLoading(true);

    const res = await axios.post("/api/caption/generate-caption", {
      audioFileUrl,
    });

    console.log("Video speech to text", res.data.result);

    // setCaptions(res?.data?.result);
    if (res.data.result) {
      setVideoDataParams({
        captions: res.data.result,
      });
    }
  };

  const onCreateClickHandler = () => {
    getVideoScript();
  };

  const generateImage = async (
    _videoScript: {
      ContentText: string;
      imagePrompt: string;
    }[]
  ) => {
    console.log("generateImage --- _videoScript", _videoScript);
    let images: string[] = [];

    // for (let item of _videoScript) {

    // trycatch 사용해야함 .
    //   const response = await axios.post("/api/image/generate-image", {
    //     prompt: item.imagePrompt,
    //   });

    //   images.push(response.data.result);
    //   console.log(
    //     "request --- response --- image",
    //     item.imagePrompt,
    //     response.data.result
    //   );
    // }

    const response = await axios.post("/api/image/generate-image", {
      prompt: _videoScript[0].imagePrompt,
    });

    console.log("images --- images --- images", response.data.images);
    if (response.data.images) {
      setVideoDataParams({
        imageList: response.data.images,
      });
    }
    // setImageList(response.data.images);
  };

  const isDBSavingRef = useRef(false);
  useEffect(() => {
    console.log("videoData ==== ", user?.primaryEmailAddress, videoData);

    if (!videoData) return;
    const { audioFileUrl, captions, imageList, videoScript } = videoData;

    if (
      !isDBSavingRef.current &&
      !!user?.primaryEmailAddress &&
      !!audioFileUrl &&
      !!captions[0] &&
      !!imageList[0] &&
      !!videoScript[0]
    ) {
      isDBSavingRef.current = true;
      saveVideoData(user.primaryEmailAddress.emailAddress, videoData);
    }
  }, [videoData, user]);

  const saveVideoData = async (userEmail: string, videoData: VideoData) => {
    console.log("saveVideoData ==== ", userEmail, videoData);

    try {
      setIsLoading(true);
      const response = await db
        .insert(VideoDataTable)
        .values({
          audioFileUrl: videoData.audioFileUrl,
          captions: videoData.captions,
          videoScript: videoData.videoScript,
          imageList: videoData.imageList,
          createdBy: userEmail,
        })
        .returning({ id: VideoDataTable.id });

      console.log("db saved ==== ", response);
    } catch (error) {
      alert("Error:: DB saving " + error);
    } finally {
      isDBSavingRef.current = false;
      setIsLoading(false);
    }
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

      <div>
        AAA::
        {videoData?.imageList?.map((url, idx) => {
          return (
            <Image
              key={idx}
              src={url}
              alt={"image generated"}
              width={100}
              height={100}
            />
          );
        })}
      </div>

      <CustomLoading loading={isLoading} />
    </div>
  );
}

export default CreateNewVideo;
