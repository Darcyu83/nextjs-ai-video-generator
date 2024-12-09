import { boolean, pgTable, serial, varchar, json } from "drizzle-orm/pg-core";

// 스키마 반영 : npm run db:push 실행해야 함

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  imageUrl: varchar("imageUrl"),
  subscription: boolean("subscription").default(false),
});

export const VideoDataTable = pgTable("videoData", {
  id: serial("id").primaryKey(),
  videoScript: json("script").notNull(),
  audioFileUrl: varchar("audioFileUrl").notNull(),
  captions: json("captions").notNull(),
  imageList: varchar("imageList").array(),
  createdBy: varchar("createdBy").notNull(),
});
