import axios from "axios";

export const downloadImageAndconvertToBase64Image = async (
  imgUrl: string
): Promise<string> => {
  try {
    const response = await axios.get(imgUrl, { responseType: "arraybuffer" });

    const base64Image = Buffer.from(response.data).toString("base64");

    return "data:image/png;base64," + base64Image;
  } catch (error) {
    console.log("Error:: ", error);
    throw new Error("Error:: ");
  }
};
