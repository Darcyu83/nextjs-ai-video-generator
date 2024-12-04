import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  schema: "./configs/schema.ts",
  dbCredentials: {
    url: "postgresql://next-ai-video-generator_owner:TZl6PAqM2XxY@ep-billowing-hill-a1rxzrdz.ap-southeast-1.aws.neon.tech/next-ai-video-generator?sslmode=require",
  },
});
