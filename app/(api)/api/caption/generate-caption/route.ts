import { AssemblyAI, TranscribeParams } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // npm install assemblyai

  try {
    const { audioFileUrl } = await req.json();

    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLY_AI_SPEECH_TO_TEXT_API_KEY!,
    });

    const config: TranscribeParams = {
      audio_url: audioFileUrl,
    };

    const transcript = await client.transcripts.transcribe(config);
    console.log(transcript.words);

    return NextResponse.json({ result: transcript.text });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
