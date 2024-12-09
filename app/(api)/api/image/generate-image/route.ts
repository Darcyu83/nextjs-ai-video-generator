import Replicate from "replicate";
import { NextResponse } from "next/server";
import { downloadImageAndconvertToBase64Image } from "@/utils/image";
import { FIREBASE_STORAGE_NAME } from "@/app/(api)/constants";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firebasestorage } from "@/configs/FirebaseConfig";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const replicate = new Replicate();

    const input = {
      prompt,

      width: 1024, // 1024 or 1280 fixed
      height: 1280, // 1024 or 1280 fixed

      num_outputs: 1,
    };

    // const output = await replicate.run(
    //   "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
    //   { input }
    // );

    // console.log("generate-image :: ", output);

    const urls = [
      "https://img.freepik.com/free-photo/adorable-cat-lifestyle_23-2151593308.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkyvkzdOr9Tys4YQrUcFPyRvOBmTxNABJT4g&s",
      "https://i.cbc.ca/1.7046192.1701492097!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/african-wild-cat.jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/022/963/918/small_2x/ai-generative-cute-cat-isolated-on-solid-background-photo.jpg",
    ];

    const images = [];
    for (let url of urls) {
      const base64Image = await downloadImageAndconvertToBase64Image(url);

      const fileName = FIREBASE_STORAGE_NAME + Date.now() + ".png";
      const storageRef = ref(firebasestorage, fileName);

      await uploadString(storageRef, base64Image, "data_url");

      const downloadUrl = await getDownloadURL(storageRef);

      console.log(downloadUrl);

      images.push(downloadUrl);
    }

    // for (const [index, item] of Object.entries(output)) {
    //   await writeFile(`output_${index}.png`, item);
    // }
    //=> output_0.png written to disk

    return NextResponse.json({ status: 200, images: images });
  } catch (error) {
    throw error;
  }
}
