import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

interface IProps {}

function Header(props: IProps) {
  return (
    <div className="shadow-md p-3 px-5 flex justify-between h-[65px]">
      <div className="flex gap-3 items-center">
        <Image
          // layout="intrinsic"
          // objectFit="contain"
          src="/next.svg"
          width={100}
          height={100}
          alt="logo"
        />
        <h2 className="font-bold text-xl">Ai Video</h2>
      </div>

      <div className="flex gap-3 items-center">
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
