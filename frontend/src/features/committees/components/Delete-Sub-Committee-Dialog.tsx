import { useState } from "react";
import { DeleteAlertDialog } from "@/components/shared/Delete-Alert-Dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import useDeleteSubCommittee from "../hooks/useDeleteSubCommittee";

type Props = {
  id: number;
};

export default function DeleteSubCommitteeDialog({ id }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeleteSubCommittee({
    onSettled: () => setOpen(false),
  });

  return (
    <>
      <Button variant={"destructive"} onClick={() => setOpen(true)}>
        <Trash2 />
      </Button>
      <DeleteAlertDialog
        id={id}
        message="This will mark the sub-committee as deleted but still be available for certain period for audit purposes."
        isPending={isPending}
        onOpenChange={(state) => setOpen(state)}
        open={open}
        onSubmit={(data) => mutate(data)}
      />
    </>
  );
}
