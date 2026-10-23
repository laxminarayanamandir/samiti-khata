import useDeleteExpense from "../hooks/useDeleteExpense";
import { type ModifyReasonSchema } from "@/schema/reason.schema";
import { DeleteAlertDialog } from "@/components/shared/Delete-Alert-Dialog";

type Props = {
  id: number;
  open: boolean;
  onOpenChange: (state: boolean) => void;
  onDeleteSuccess: () => void;
};

export default function DeleteExpenseAlertDialog({
  id,
  open,
  onOpenChange,
  onDeleteSuccess,
}: Props) {
  const { mutate, isPending } = useDeleteExpense({
    onSettled: () => onOpenChange(false),
    onSuccess: onDeleteSuccess,
  });

  return (
    <DeleteAlertDialog
      open={open}
      onOpenChange={(state) => onOpenChange(state)}
      id={id}
      isPending={isPending}
      message="This will mark the expense as deleted but still be available for certain period for audit purposes."
      onSubmit={(data: ModifyReasonSchema) => mutate(data)}
    />
  );
}
