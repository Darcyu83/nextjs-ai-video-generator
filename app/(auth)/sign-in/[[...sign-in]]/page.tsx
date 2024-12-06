import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

interface IProps {}

function Page(props: IProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="">
        <Image
          src={"/next.svg"}
          alt="로그인페이지 배경이미지"
          width={500}
          height={500}
          className="h-full object-contain border"
        />
      </div>
      <div className="flex justify-center items-center h-screen">
        <SignIn />
      </div>
    </div>
  );
}

export default Page;
