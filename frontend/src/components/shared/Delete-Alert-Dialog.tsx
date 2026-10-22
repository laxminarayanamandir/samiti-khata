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
  modifyReasonSchema,
  type ModifyReasonSchema,
} from "@/schema/reason.schema";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton, TextAreaField } from "./form";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = {
  open: boolean;
  message: string;
  id: number;
  isPending: boolean;
  onOpenChange: (state: boolean) => void;
  onSubmit: SubmitHandler<ModifyReasonSchema>;
};

export function DeleteAlertDialog({
  id,
  onSubmit,
  message,
  isPending,
  open,
  onOpenChange,
}: Props) {
  const form = useForm({
    resolver: zodResolver(modifyReasonSchema),
    defaultValues: {
      reason: "",
      id,
    },
  });

  return (
    <Dialog open={open} onOpenChange={(state) => onOpenChange(state)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <TextAreaField
              control={form.control}
              isRequired={true}
              label="Reason to delete"
              name="reason"
            />
          </FieldGroup>
          <DialogFooter className="mt-5">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <SubmitButton
              variant={"destructive"}
              isPending={isPending}
              label="Delete"
              labelWhenPending="Deleting"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
