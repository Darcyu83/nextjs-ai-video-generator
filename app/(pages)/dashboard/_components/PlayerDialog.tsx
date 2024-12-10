import { VideoData } from "@/app/_context/VideoDataContextProvider";
import RemotionVideo from "@/app/remotion/Composition";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db } from "@/configs/db";
import { VideoDataTable } from "@/configs/schema";

import { Player } from "@remotion/player";
import { eq } from "drizzle-orm";
import { useEffect, useMemo, useState } from "react";

interface IProps {
  playVideo: boolean;
  videoId?: number;
}

export interface VideoDataTbColumns {
  id: number;
  script: VideoData["videoScript"];
  audioFileUrl: string;
  captions: VideoData["captions"];
  imageList: string[] | null;
  createdBy: string;
}

function PlayerDialog({ playVideo, videoId }: IProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState<VideoDataTbColumns>();
  const [durationInFrame, setDurationInFrame] = useState(100);
  useEffect(() => {
    setOpenDialog(playVideo);
    videoId && getVideoData();
  }, [playVideo]);

  const getVideoData = async () => {
    if (!videoId) return;
    const result = await db
      .select()
      .from(VideoDataTable)
      .where(eq(VideoDataTable.id, videoId));

    console.log("getVideoData result ==== ", result, videoId);

    const isValidVideoData = (data: any): data is VideoDataTbColumns => {
      return (
        Array.isArray(data.captions) &&
        Array.isArray(data.script) &&
        typeof data.audioFileUrl === "string" &&
        (data.imageList === null || Array.isArray(data.imageList)) &&
        typeof data.createdBy === "string"
      );
    };

    if (isValidVideoData(result[0])) {
      setVideoData(result[0]);
    }
  };

  const getDurationFrame = (captions: VideoData["captions"], fps: number) => {
    if (!captions) return 0;

    console.log(
      "getDurationFrame ==== ",
      captions,
      captions.length - 1,
      captions[captions.length - 1]
    );
    const frame = (captions[captions.length - 1].end / 1000) * fps;
    return frame;
  };

  const {
    durationInFrames,
    compositionWidth,
    compositionHeight,
    controls,
    fps,
  } = useMemo(() => {
    const videoPlayerConfig = {
      durationInFrames: 120,
      compositionWidth: 300,
      compositionHeight: 450,
      controls: true,
      fps: 30,
    };

    if (videoData?.captions) {
      videoPlayerConfig.durationInFrames = Math.floor(
        getDurationFrame(videoData.captions, videoPlayerConfig.fps)
      );
    }

    return videoPlayerConfig;
  }, [videoData]);

  return (
    <Dialog open={openDialog}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="flex flex-col items-center ">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your video is ready
          </DialogTitle>
          <DialogDescription>AABVB {durationInFrames}</DialogDescription>
          {videoData && (
            <Player
              component={RemotionVideo}
              durationInFrames={durationInFrames}
              compositionWidth={compositionWidth}
              compositionHeight={compositionHeight}
              fps={fps}
              controls={controls}
              inputProps={{ ...videoData }}
            />
          )}

          <div className="flex gap-10 justify-center mt-10">
            <Button variant={"ghost"}>Cancel</Button>
            <Button>Export</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
