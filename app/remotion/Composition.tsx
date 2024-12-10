import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { VideoDataTbColumns } from "../(pages)/dashboard/_components/PlayerDialog";

interface IProps extends VideoDataTbColumns {
  setDurationInFrame: (frameValue: number) => void;
  durationInFrames: number;
}

function RemotionVideo({
  script,
  imageList,
  audioFileUrl,
  captions,
  createdBy,
  durationInFrames = 1200,
}: Partial<IProps>) {
  const frame = useCurrentFrame();
  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000; // frame number to milli second

    const currentCaption = captions?.find((word) => {
      return currentTime >= word.start && currentTime <= word.end;
    });

    return currentCaption?.text ?? "";
  };
  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((imgUrl, idx) => {
        let startTime = (idx * durationInFrames) / imageList.length;
        startTime = startTime || 1;

        const scale = interpolate(
          frame,
          [startTime, startTime * 2, startTime + durationInFrames],
          [1, 1.8, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "extend" }
        );

        return (
          <div key={"img_" + idx}>
            <Sequence
              key={idx}
              from={startTime}
              durationInFrames={durationInFrames}
            >
              <Img
                src={imgUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: `scale(${scale})`,
                }}
              />

              <AbsoluteFill className="text-white p-4 items-center bottom-10 h-[150px] top-0">
                <h2 className="text-2xl">{getCurrentCaptions()}</h2>
              </AbsoluteFill>
            </Sequence>
          </div>
        );
      })}
      <Audio src={audioFileUrl} />
    </AbsoluteFill>
  );
}

export default RemotionVideo;
