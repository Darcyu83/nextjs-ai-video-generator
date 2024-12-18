"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface IProps {
  children: ReactNode;
}

interface IContextProps {
  videoData?: VideoData;
  setVideoDataParams: (params: Partial<VideoData>) => void;
}

export interface VideoScript {
  ContentText: string;
  imagePrompt: string;
}

const a = {
  text: "The",
  start: 280,
  end: 416,
  confidence: 0.99923,
  speaker: null,
};
export interface CaptionProps {
  text: string;
  start: number;
  end: number;
  confidence: number;
  speaker: null;
}

export interface VideoData {
  videoScript: VideoScript[];
  audioFileUrl: string;
  captions: CaptionProps[];
  imageList: string[];
}

const VideoDataContext = createContext<IContextProps | null>(null);

const initialValues: VideoData = {
  audioFileUrl: "",
  captions: [],
  imageList: [],
  videoScript: [],
};
export const useVideoDataContext = () => {
  const ctx = useContext(VideoDataContext);

  if (!ctx) {
    throw new Error(
      "useVideoDataContext must be used within a VideoDataProvider"
    );
  }

  return ctx;
};

function VideoDataContextProvider({ children }: IProps) {
  const [videoData, setVideoData] = useState<VideoData>();

  const setVideoDataParams = (params: Partial<VideoData>) => {
    setVideoData((prev) =>
      !prev
        ? { ...initialValues, ...params }
        : {
            ...prev,
            ...params,
          }
    );
  };
  return (
    <VideoDataContext.Provider value={{ videoData, setVideoDataParams }}>
      {children}
    </VideoDataContext.Provider>
  );
}

export default VideoDataContextProvider;
