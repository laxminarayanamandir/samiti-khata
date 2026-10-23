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
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import useUpdateIncome from "../hooks/useUpdateIncome";
import { SubmitButton } from "@/components/shared/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateIncomeSchema } from "../schemas/income.schema";
import useGetIncomeDetails from "../hooks/useGetIncomeDetails";
import UpdateIncomeReceiptForm from "./Update-Income-Receipt-Form";

type Props = {
  id: number;
  open: boolean;
  onOpenChange: (state: boolean) => void;
  onUpdateSuccess: () => void;
};

export default function UpdateIncomeReceiptSheet({
  id,
  open,
  onOpenChange,
  onUpdateSuccess,
}: Props) {
  const { data } = useGetIncomeDetails(id);

  const form = useForm({
    resolver: zodResolver(updateIncomeSchema),
    defaultValues: {
      id,
      description: "",
    },
  });


  useEffect(() => {
    if (!data) return;

    form.resetDefaultValues({
      id: data.id,
      receiptBookId: String(data.receiptBookId),
      receiptNumber: String(data.receiptNumber),
      name: data.name,
      address: data.address,
      amount: String(data.amount),
      paymentMode: data.paymentMode,
      remarks: data.remarks,
      receiptIssuerId: data.receiptIssuerId ? String(data.receiptIssuerId) : "",
      committeeId: String(data.committeeId),
      date: data.date,
      nepaliDate: data.nepaliDate,
      subCommitteeId: data.subCommitteeId ? String(data.subCommitteeId) : "",
    });
  }, [data]);

  const { isPending, onUpdate } = useUpdateIncome({
    onSuccess: () => onUpdateSuccess(),
  });

  return (
    <Sheet open={open} onOpenChange={(state) => onOpenChange(state)}>
      <SheetContent className={"min-w-lg h-full flex flex-col min-h-0"}>
        <SheetHeader>
          <SheetTitle>Update Income Receipt</SheetTitle>
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
            <UpdateIncomeReceiptForm form={form} />
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
                label="Update Income Receipt"
                labelWhenPending="Updating"
              />
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
