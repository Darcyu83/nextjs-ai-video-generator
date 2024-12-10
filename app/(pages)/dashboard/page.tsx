"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import VideoList from "./_components/VideoList";
import { db } from "@/configs/db";
import { VideoDataTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { VideoDataTbColumns } from "./_types/types";
import { isValidVideoData } from "./_utils/utils";
interface IProps {}

function Dashboard(props: IProps) {
  const { user } = useUser();

  const [videoList, setVideoList] = useState<VideoDataTbColumns[]>([]);

  const getVideoList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    const result = await db
      .select()
      .from(VideoDataTable)
      .where(
        eq(VideoDataTable.createdBy, user?.primaryEmailAddress?.emailAddress)
      );

    console.log("getVideoList === ", result);

    const list: VideoDataTbColumns[] = [];
    result.map((data) => {
      if (isValidVideoData(data)) {
        list.push(data);
      }
    });

    setVideoList(list);
  };

  useEffect(() => {
    user && getVideoList();
  }, [user]);

  return (
    <div style={{}}>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
        <Link href={"/dashboard/create-new"}>
          <Button>+ Create new</Button>
        </Link>
      </div>
      {/* Empty State */}
      {videoList?.length === 0 && (
        <div>
          <EmptyState />
        </div>
      )}

      {/* List of Videos */}

      <VideoList videoList={videoList} />
    </div>
  );
}

export default Dashboard;
