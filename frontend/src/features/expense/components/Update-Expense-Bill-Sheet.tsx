import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton } from "@/components/shared/form";
import useUpdateExpense from "../hooks/useUpdateExpense";
import { ScrollArea } from "@/components/ui/scroll-area";
import UpdateExpenseBillForm from "./Update-Expense-Bill-Form";
import { updateExpenseSchema } from "../schemas/expense.schema";
import useGetExpenseDetails from "../hooks/useGetExpenseDetails";

type Props = {
  id: number;
  open: boolean;
  onOpenChange: (state: boolean) => void;
  onUpdateSuccess: () => void;
};

export default function UpdateExpenseBillSheet({
  id,
  onOpenChange,
  onUpdateSuccess,
  open,
}: Props) {
  const { data } = useGetExpenseDetails(id);
  const form = useForm({
    resolver: zodResolver(updateExpenseSchema),
    defaultValues: {
      id,
      description: "",
    },
  });

  useEffect(() => {
    if (!data) return;

    form.resetDefaultValues({
      id: data.id,
      amount: String(data.amount),
      paymentMode: data.paymentMode,
      remarks: data.remarks,
      committeeId: String(data.committeeId),
      nepaliDate: data.nepaliDate,
      subCommitteeId: data.subCommitteeId ? String(data.subCommitteeId) : "",
      billNumber: data.billNumber ? String(data.billNumber) : "",
      categoryId: data.categoryId ? String(data.categoryId) : "",
      particulars: data.particulars,
      payerId: data.payerId ? String(data.payerId) : "",
      quantity: data.quantity,
      recepientAddress: data.recepientAddress,
      recepientName: data.recepientName,
      voucherNumber: data.voucherNumber,
    });
  }, [data]);

  const { isPending, onUpdate } = useUpdateExpense({
    onSuccess: () => onUpdateSuccess(),
  });

  return (
    <Sheet open={open} onOpenChange={(state) => onOpenChange(state)}>
      <SheetContent className={"min-w-lg h-full flex flex-col min-h-0"}>
        <SheetHeader>
          <SheetTitle>Update Expense Bill</SheetTitle>
          <SheetDescription>
            Enter details. Click update when you are done.
          </SheetDescription>
        </SheetHeader>

        <Separator />

        <form
          onSubmit={form.handleSubmit(onUpdate)}
          className="min-h-0 flex-1 flex flex-col"
        >
          <ScrollArea className={"flex-1 min-h-0"}>
            <UpdateExpenseBillForm form={form} />
          </ScrollArea>

          <SheetFooter>
            <Separator />
            <div className="flex flex-row justify-evenly items-center">
              <Button
                type="button"
                onClick={() => form.reset()}
                variant={"outline"}
              >
                Reset Form
              </Button>
              <SubmitButton
                isPending={isPending}
                label="Update Expense Bill"
                labelWhenPending="Updating"
              />
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
