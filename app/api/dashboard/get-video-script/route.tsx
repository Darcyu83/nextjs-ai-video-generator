import { chatSession } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    console.log("/api/get-video-script ==== prompt", prompt);

    const result = await chatSession.sendMessage(prompt);

    console.log("/api/get-video-script ==== res ");

    return NextResponse.json({ result: JSON.parse(result.response.text()) });
  } catch (error) {
    return NextResponse.json({ Error: error });
  }
}
