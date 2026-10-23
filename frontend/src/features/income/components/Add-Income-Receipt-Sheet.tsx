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
import useCreateIncome from "../hooks/useCreateIncome";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createIncomeSchema } from "../schemas/income.schema";
import AddIncomeReceiptForm from "./Add-Income-Receipt-Form";
import { SubmitButton } from "@/components/shared/form";

export default function AddIncomeReceiptSheet() {
  const [addMore, setAddMore] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(createIncomeSchema),
    defaultValues: {
      receiptBookId: "",
      receiptNumber: "",
      nepaliDate: "",
      name: "",
      address: "",
      amount: "",
      paymentMode: "CASH",
      remarks: "",
      receiptIssuerId: "",
      committeeId: "",
      subCommitteeId: "",
    },
  });

  const { isError, isPending, isSuccess, onCreate } = useCreateIncome();

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
            <PlusCircle /> Add Income Receipt
          </Button>
        }
      />

      <SheetContent className={"min-w-lg h-full flex flex-col min-h-0"}>
        <SheetHeader>
          <SheetTitle>Add Income Receipt</SheetTitle>
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
            <AddIncomeReceiptForm form={form} />
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
                label="Add Income Receipt"
                labelWhenPending="Adding"
              />
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
