import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputField,
  SelectField,
  SubmitButton,
} from "@/components/shared/form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import getNepaliDate from "@/lib/getNepaliDate";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookStatusOptions } from "@/constants/bookStatus";
import useGetReceiptBookDetails from "../hooks/useGetReceiptDetails";
import useGetOrgMembers from "@/features/user/hooks/useGetOrgMembers";
import { updateBookStatusSchema } from "../schemas/update-status.schema";
import getTransformedSelectOptions from "@/lib/getTransformedSelectOptions";
import useUpdateReceiptBookStatus from "../hooks/useUpdateReceiptBookStatus";

type Props = {
  id: number;
  open: boolean;
  onOpenChange: (state: boolean) => void;
  onUpdateSuccess: () => void;
};

export default function UpdateReceiptBookStatusDialog({
  id,
  onOpenChange,
  onUpdateSuccess,
  open,
}: Props) {
  const { data } = useGetReceiptBookDetails(id);
  const { data: orgMembers } = useGetOrgMembers();

  const form = useForm({
    resolver: zodResolver(updateBookStatusSchema),
    defaultValues: {
      id,
      assignedAt: getNepaliDate(data?.assignedAt),
      assignedTo: data?.assignedTo ? String(data.assignedTo) : "",
      returnedAt: getNepaliDate(data?.returnedAt),
      status: data?.status,
    },
  });

  useEffect(() => {
    if (!data) return;

    form.reset({
      id: data.id,
      assignedAt: getNepaliDate(data.assignedAt),
      assignedTo: data.assignedTo != null ? String(data.assignedTo) : "",
      returnedAt: getNepaliDate(data.returnedAt),
      status: data.status,
    });
  }, [data, form]);

  const { onUpdate, isPending } = useUpdateReceiptBookStatus({
    onSettled: () => onOpenChange(false),
    onSuccess: () => onUpdateSuccess(),
  });

  return (
    <Dialog open={open} onOpenChange={(state) => onOpenChange(state)}>
      <DialogContent className="w-full min-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Update Receipt Book Status</DialogTitle>
          <DialogDescription>
            Update book details. Click update when you are done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-3" onSubmit={form.handleSubmit(onUpdate)}>
          <SelectField
            fieldLabel="Book Status"
            control={form.control}
            name="status"
            options={BookStatusOptions}
          />

          <SelectField
            fieldLabel="Assigned To"
            control={form.control}
            name="assignedTo"
            isRequired={false}
            options={getTransformedSelectOptions({
              data: orgMembers,
              labelKey: "name",
              valueKey: "id",
            })}
          />

          <InputField
            control={form.control}
            isRequired={false}
            label="Assigned At"
            name="assignedAt"
            placeholder="Assigned Date in B.S. (optional)"
          />

          <InputField
            control={form.control}
            isRequired={false}
            label="Returned At"
            name="returnedAt"
            placeholder="Returned Date in B.S. (optional)"
          />

          <Separator />
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <SubmitButton
              isPending={isPending}
              label="Update Status"
              labelWhenPending="Updating"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
