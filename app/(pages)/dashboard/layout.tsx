import { ReactNode } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import VideoDataContextProvider from "@/app/_context/VideoDataContextProvider";

interface IProps {
  children: ReactNode;
}

function DashboardLayout({ children }: IProps) {
  return (
    <VideoDataContextProvider>
      <div style={{}}>
        <div className="border hidden md:block h-screen bg-white fixed mt-[65px] w-64">
          <SideNav />
        </div>

        <div>
          <Header />
          <div className="md:ml-64 p-10">{children}</div>
        </div>
      </div>
    </VideoDataContextProvider>
  );
}

export default DashboardLayout;
