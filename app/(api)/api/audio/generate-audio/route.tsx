import { FIREBASE_STORAGE_NAME } from "@/app/(api)/constants";
import { firebasestorage } from "@/configs/FirebaseConfig";
import textToSpeech from "@google-cloud/text-to-speech";
import { google } from "@google-cloud/text-to-speech/build/protos/protos";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";
const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_TEXT_TO_SPEECH_API_KEY,
});

type RequestBody = {
  text: string;
  id: number;
};

type SynthesizeSpeechRequest =
  google.cloud.texttospeech.v1.ISynthesizeSpeechRequest;

export async function POST(req: Request) {
  const { text, id }: RequestBody = await req.json();

  const firebaseStorageRef = ref(
    firebasestorage,
    FIREBASE_STORAGE_NAME + id + ".mp3"
  );
  // Construct the request
  const request: SynthesizeSpeechRequest = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);

  // Write the binary audio content to a local file

  if (!response.audioContent) return;

  // create file in specific path
  // const writeFile = util.promisify(fs.writeFile);
  // await writeFile("output.mp3", response.audioContent, "binary");

  // get file data buffer
  const audioBuffer = Buffer.from(response.audioContent);

  await uploadBytes(firebaseStorageRef, audioBuffer, {
    contentType: "audio/mp3",
  });

  console.log("uploadBytes: done");

  const downloadUrl = await getDownloadURL(firebaseStorageRef);

  console.log("downloadUrl", downloadUrl);

  return NextResponse.json({ result: downloadUrl });
}
