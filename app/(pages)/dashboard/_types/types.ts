import { VideoData } from "@/app/_context/VideoDataContextProvider";

export interface VideoDataTbColumns {
  id: number;
  script: VideoData["videoScript"];
  audioFileUrl: string;
  captions: VideoData["captions"];
  imageList: string[] | null;
  createdBy: string;
}
