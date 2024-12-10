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
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { VideoDataTbColumns } from "../_types/types";
import { isValidVideoData } from "../_utils/utils";
import { useRouter } from "next/navigation";

interface IProps {
  playVideo: boolean;
  videoId?: number;
  setOpenPlayerDialog?: Dispatch<SetStateAction<boolean>>;
}

function PlayerDialog({ playVideo, videoId, setOpenPlayerDialog }: IProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState<VideoDataTbColumns>();
  const [durationInFrame, setDurationInFrame] = useState(100);

  const router = useRouter();

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
    <Dialog
      open={openDialog}
      onOpenChange={(e) => {
        setOpenPlayerDialog && setOpenPlayerDialog(e);
      }}
    >
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
            <Button
              variant={"ghost"}
              onClick={() => {
                router.replace("/dashboard");
                setOpenPlayerDialog && setOpenPlayerDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button>Export</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
