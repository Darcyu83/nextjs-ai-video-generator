import { VideoDataTbColumns } from "../_types/types";

export const isValidVideoData = (data: any): data is VideoDataTbColumns => {
  return (
    Array.isArray(data.captions) &&
    Array.isArray(data.script) &&
    typeof data.audioFileUrl === "string" &&
    (data.imageList === null || Array.isArray(data.imageList)) &&
    typeof data.createdBy === "string"
  );
};
