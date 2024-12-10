import RemotionVideo from "@/app/remotion/Composition";
import { VideoDataTbColumns } from "../_types/types";
import { Thumbnail } from "@remotion/player";
import PlayerDialog from "./PlayerDialog";
import { useState } from "react";
interface IProps {
  videoList: VideoDataTbColumns[];
}

function VideoList({ videoList }: IProps) {
  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);

  const [videoId, setVideoId] = useState<number>();
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {videoList?.map((data, idx) => {
        return (
          <div
            key={idx}
            className="cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setOpenPlayerDialog(true);
              setVideoId(data.id);
            }}
          >
            <Thumbnail
              component={RemotionVideo}
              compositionWidth={300}
              compositionHeight={450}
              frameToDisplay={30}
              durationInFrames={120}
              fps={30}
              inputProps={{
                ...data,
              }}
              className="rounded-xl"
            />
          </div>
        );
      })}

      <PlayerDialog
        playVideo={openPlayerDialog}
        videoId={videoId}
        setOpenPlayerDialog={setOpenPlayerDialog}
      />
    </div>
  );
}

export default VideoList;
