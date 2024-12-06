"use client";
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {}

function SideNav(props: IProps) {
  const MenuOption = [
    { id: 1, name: "Dashboard", path: "/dashboard", icon: PanelsTopLeft },
    {
      id: 2,
      name: "Create New",
      path: "/dashboard/create-new",
      icon: FileVideo,
    },
    { id: 3, name: "Upgrade", path: "/upgrade", icon: ShieldPlus },
    { id: 4, name: "Account", path: "/account", icon: CircleUser },
  ] as const;

  const path = usePathname();
  return ( 
    <div className="w-64 h-screen shadow-md p-5">
      <div className="grid gap-2">
        {MenuOption.map((item, index) => {
          return (
            <Link key={item.id} href={item.path}>
              <div
                className={`flex items-center gap-3 p-3 hover:bg-primary hover:text-white rounded-md cursor-pointer
                  ${path === item.path && "bg-primary text-white"}`}
              >
                <item.icon />
                <h2>{item.name}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SideNav;
