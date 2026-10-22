import { useState } from "react";
import useDeleteCommittee from "../hooks/useDeleteCommittee";
import { DeleteAlertDialog } from "@/components/shared/Delete-Alert-Dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Props = {
  id: number;
};

export default function DeleteCommitteeDialog({ id }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeleteCommittee({
    onSettled: () => setOpen(false),
  });

  return (
    <>
      <Button variant={"destructive"} onClick={() => setOpen(true)}>
        <Trash2 />
      </Button>
      <DeleteAlertDialog
        id={id}
        message="This will mark the committee as deleted but still be available for certain period for audit purposes."
        isPending={isPending}
        onOpenChange={(state) => setOpen(state)}
        open={open}
        onSubmit={(data) => mutate(data)}
      />
    </>
  );
}
