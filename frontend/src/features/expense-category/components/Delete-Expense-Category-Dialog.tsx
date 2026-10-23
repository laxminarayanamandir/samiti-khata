import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteAlertDialog } from "@/components/shared/Delete-Alert-Dialog";
import useDeleteExpenseCategory from "../hooks/useDeleteExpenseCategory";

type Props = {
  id: number;
};

export default function DeleteExpenseCategoryDialog({ id }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeleteExpenseCategory({
    onSettled: () => setOpen(false),
  });

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        <Trash2 />
      </Button>
      <DeleteAlertDialog
        id={id}
        message="This will mark the expense category as deleted but still be available for certain period for audit purposes."
        isPending={isPending}
        onOpenChange={setOpen}
        open={open}
        onSubmit={(data) => mutate(data)}
      />
    </>
  );
}
