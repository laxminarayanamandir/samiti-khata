import useDeleteIncome from "../hooks/useDeleteIncome";
import { type ModifyReasonSchema } from "@/schema/reason.schema";
import { DeleteAlertDialog } from "@/components/shared/Delete-Alert-Dialog";

type Props = {
  id: number;
  open: boolean;
  onOpenChange: (state: boolean) => void;
  onDeleteSuccess: () => void;
};

export default function DeleteIncomeAlertDialog({
  id,
  open,
  onOpenChange,
  onDeleteSuccess,
}: Props) {
  const { mutate, isPending } = useDeleteIncome({
    onSettled: () => onOpenChange(false),
    onSuccess: () => onDeleteSuccess(),
  });

  return (
    <DeleteAlertDialog
      open={open}
      onOpenChange={(state) => onOpenChange(state)}
      id={id}
      isPending={isPending}
      message="This will mark the income as deleted but still be available for certain period for audit purposes."
      onSubmit={(data: ModifyReasonSchema) => mutate(data)}
    />
  );
}
