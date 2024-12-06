import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

interface IProps {
  loading?: boolean;
}

function CustomLoading({ loading }: IProps) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogTitle className="hidden"></AlertDialogTitle>
      <AlertDialogContent>
        <AlertDialogDescription className="hidden"></AlertDialogDescription>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={"/gif/loading.gif"}
            alt="Loading..."
            width={50}
            height={50}
          />
          <h2>Generating your video... Do not Refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
