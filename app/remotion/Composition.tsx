import { AbsoluteFill, Img, Sequence, useVideoConfig } from "remotion";
import { VideoDataTbColumns } from "../(pages)/dashboard/_components/PlayerDialog";

interface IProps extends VideoDataTbColumns {}

function RemotionVideo({
  script,
  imageList,
  audioFileUrl,
  captions,
  createdBy,
}: Partial<IProps>) {
  const { fps } = useVideoConfig();
  const getDurationFrame = () => {
    if (!captions) return 0;

    return (captions[captions.length - 1].end / 1000) * fps;
  };

  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((imgUrl, idx) => {
        return (
          <>
            <Sequence
              key={idx}
              from={(idx * getDurationFrame()) / imageList.length}
              durationInFrames={getDurationFrame()}
            >
              <Img
                src={imgUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Sequence>
          </>
        );
      })}
    </AbsoluteFill>
  );
}

export default RemotionVideo;
