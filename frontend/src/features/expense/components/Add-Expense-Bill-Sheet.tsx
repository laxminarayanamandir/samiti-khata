import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createExpenseSchema } from "../schemas/expense.schema";
import useCreateExpense from "../hooks/useCreateExpense";
import AddExpenseBillForm from "./Add-Expense-Bill-Form";
import { SubmitButton } from "@/components/shared/form";

export default function AddExpenseBillSheet() {
  const [addMore, setAddMore] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: "",
      billNumber: "",
      categoryId: "",
      committeeId: "",
      nepaliDate: "",
      particulars: "",
      payerId: "",
      paymentMode: "CASH",
      quantity: "",
      recepientAddress: "",
      recepientName: "",
      remarks: "",
      subCommitteeId: "",
      voucherNumber: "",
    },
  });

  const { isError, isPending, isSuccess, onCreate } = useCreateExpense();

  useEffect(() => {
    // open/close sheet based on add more field
    if (!addMore) {
      setOpen(false);
    }

    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, isError, addMore]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button>
            <PlusCircle /> Add Expense Bill
          </Button>
        }
      />

      <SheetContent className={"min-w-lg h-full flex flex-col min-h-0"}>
        <SheetHeader>
          <SheetTitle>Add Expense Bill</SheetTitle>
          <SheetDescription>
            Enter details. Click add when you are done.
          </SheetDescription>
        </SheetHeader>

        <Separator />

        <form
          onSubmit={form.handleSubmit(onCreate)}
          className="min-h-0 flex-1 flex flex-col"
        >
          <ScrollArea className={"flex-1 min-h-0"}>
            <AddExpenseBillForm form={form} />
          </ScrollArea>

          <SheetFooter>
            <Separator />
            <div className="flex flex-row justify-evenly items-center">
              <div className="flex items-center space-x-2">
                <Label htmlFor="add-more">Add More</Label>
                <Switch
                  id="add-more"
                  checked={addMore}
                  onCheckedChange={setAddMore}
                />
              </div>
              <Button
                type="button"
                onClick={() => form.reset()}
                variant={"outline"}
              >
                Reset Form
              </Button>
              <SubmitButton
                isPending={isPending}
                label="Add Expense Bill"
                labelWhenPending="Adding"
              />
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
