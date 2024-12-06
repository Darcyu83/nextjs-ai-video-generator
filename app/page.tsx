import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Hi</h1>
      <Button variant={"destructive"}>Button ---- 1</Button>
      <Button>Button ---- primary color</Button>
      <UserButton />
    </div>
  );
}
