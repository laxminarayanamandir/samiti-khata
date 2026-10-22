import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Separator } from "@base-ui/react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField, SubmitButton } from "@/components/shared/form";
import useUpdateExpenseCategory from "../hooks/useUpdateExpenseCategory";
import useGetExpenseCategoryDetails from "../hooks/useGetExpenseCategoryDetails";
import { updateExpenseCategorySchema } from "../schemas/expense-category.schema";

type Props = {
  id: number;
};

export default function UpdateExpenseCategoryDialog({ id }: Props) {
  const [open, setOpen] = useState(false);
  const { data } = useGetExpenseCategoryDetails(id);

  const form = useForm({
    resolver: zodResolver(updateExpenseCategorySchema),
    defaultValues: {
      id,
      description: data?.description ?? "",
      name: data?.name ?? "",
    },
  });

  useEffect(() => {
    if (!data) return;

    form.reset({
      description: data.description ?? "",
      name: data.name,
      id: data.id,
    });
  }, [data, form]);

  const { onUpdate, isPending } = useUpdateExpenseCategory({
    onSettled: () => setOpen(false),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="default" />}>
        <Edit />
      </DialogTrigger>
      <DialogContent className="w-full min-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Update Expense Category</DialogTitle>
          <DialogDescription>
            Update expense category details. Click update when you are done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-3" onSubmit={form.handleSubmit(onUpdate)}>
          <InputField
            control={form.control}
            isRequired
            label="Category Name"
            name="name"
          />
          <InputField
            control={form.control}
            isRequired={false}
            label="Description"
            name="description"
          />
          <Separator />
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <SubmitButton
              isPending={isPending}
              label="Update Expense Category"
              labelWhenPending="Updating"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
