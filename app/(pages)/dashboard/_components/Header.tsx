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
        <div className="flex gap-2">
          <Image src="/images/star.png" alt="코인" width={24} height={24} />
          <h2 className="font-bold">30</h2>
        </div>

        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}



export default Header;
