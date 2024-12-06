"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";

interface IProps {}

function Dashboard(props: IProps) {
  const [videoList, setVideoList] = useState([]);
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
    </div>
  );
}

export default Dashboard;
