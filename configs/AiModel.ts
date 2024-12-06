const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 30 seconds video on topic : interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and Content Text as field.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "Realistic image of a bustling medieval marketplace, vibrant colors, people in period clothing bartering goods, a focus on a young woman with fiery red hair subtly interacting with a mysterious cloaked figure.",\n    "ContentText": "Our story begins in 14th century Florence, a city brimming with art, commerce, and secrets.  Meet Isabella, a skilled weaver with a rebellious spirit."\n  },\n  {\n    "imagePrompt": "Realistic portrait of a young woman with fiery red hair, determined expression, wearing simple but elegant medieval clothing, holding a partially finished tapestry.",\n    "ContentText": "Isabella was known for her intricate tapestries, each thread telling a silent story. But her true passion lay in uncovering the city\'s hidden truths."\n  },\n  {\n    "imagePrompt": "Realistic image of a dimly lit, hidden alleyway in medieval Florence, moonlight casting long shadows, the cloaked figure from the marketplace scene subtly visible in the background.",\n    "ContentText": "One night, she stumbled upon a clandestine meeting, a gathering of conspirators whispering of a plot to overthrow the Medici family."\n  },\n  {\n    "imagePrompt": "Realistic image of a tense meeting in a dimly lit room, several figures in shadows, one clearly identifiable as a powerful-looking Medici official, Isabella observing from a hidden alcove.",\n    "ContentText": "Hidden in the shadows, Isabella witnessed the unfolding conspiracy, a plot involving stolen documents and secret alliances."\n  },\n  {\n    "imagePrompt": "Realistic image of Isabella skillfully weaving a coded message into a tapestry, her hands moving deftly, a determined look on her face.",\n    "ContentText": "Using her skills as a weaver, Isabella created a coded message within a tapestry, a warning for the Medici family."\n  },\n  {\n    "imagePrompt": "Realistic image of a messenger on horseback galloping through the Florentine countryside, carrying a rolled-up tapestry.",\n    "ContentText": "With the message safely delivered, Isabella\'s courage helped avert a dangerous civil war, changing the course of Florentine history."\n  },\n  {\n    "imagePrompt": "Realistic image of a peaceful, sunlit Florentine street, people going about their daily lives, Isabella subtly smiling in the background, a sense of quiet triumph.",\n    "ContentText": "The city breathed a collective sigh of relief, unaware of the young weaver who had saved them from chaos."\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON provides seven scenes, each with an image prompt suitable for generating a realistic image using an AI image generator (like Midjourney, Dall-E 2, or Stable Diffusion). The `ContentText` field provides a concise narrative for each scene, aiming for a total duration of roughly 30 seconds when combined with visuals.  The images should be relatively short in duration (3-5 seconds each) to fit within the time constraint.  Remember to adjust the timing during video editing.  You\'ll need to use video editing software to combine the AI-generated images with narration or voiceover based on the `ContentText`.  The overall narrative is a fictionalized, but believable, historical story set in Florence.\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
