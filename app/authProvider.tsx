"use client";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ReactNode, useEffect } from "react";

interface IProps {
  children: ReactNode;
}

function AuthProvider({ children }: IProps) {
  const { user } = useUser();

  const isNewUser = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress ?? ""));

    if (!result[0] && user && user.fullName && user.primaryEmailAddress) {
      await db.insert(Users).values({
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        imageUrl: user.imageUrl,
      });
    }
  };

  useEffect(() => {
    user && isNewUser();
  }, [user]);

  return <div style={{}}>{children}</div>;
}

export default AuthProvider;
