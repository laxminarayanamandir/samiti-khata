import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  receiptBookSchema,
  type ReceiptBookForm,
  type ReceiptBookSchema,
} from "../schemas/receipt-books.schema";
import useCreateReceiptBook from "../hooks/useCreateReceiptBook";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetFiscalYears from "@/features/fiscal-year/hooks/useGetFiscalYear";
import useGetOrgMembers from "@/features/user/hooks/useGetOrgMembers";
import SelectField from "@/components/shared/form/Select-Field";
import getTransformedSelectOptions from "@/lib/getTransformedSelectOptions";
import { BookStatusOptions } from "@/constants/bookStatus";
import { SubmitButton } from "@/components/shared/form";

export default function CreateReceiptBookSheet() {
  const [addMore, setAddMore] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: fiscalYears } = useGetFiscalYears();
  const { data: orgMembers } = useGetOrgMembers();

  const form = useForm<ReceiptBookForm, unknown, ReceiptBookSchema>({
    resolver: zodResolver(receiptBookSchema),
    defaultValues: {
      assignedAt: "",
      assignedTo: "",
      bookNumber: "",
      fiscalYearId: "",
      receiptEndingNumber: "",
      receiptStartingNumber: "",
      returnedAt: "",
      status: "AVAILABLE",
    },
  });

  const { isPending, isSuccess, isError, onCreate } = useCreateReceiptBook();

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
            <PlusCircle /> Add Receipt Book
          </Button>
        }
      />
      <SheetContent className={"min-w-md h-full flex flex-col min-h-0"}>
        <SheetHeader>
          <SheetTitle>Add Receipt Book</SheetTitle>
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
            <FieldGroup className="px-5">
              <SelectField
                fieldLabel="Fiscal Year"
                control={form.control}
                name="fiscalYearId"
                options={getTransformedSelectOptions({
                  data: fiscalYears,
                  labelKey: "name",
                  valueKey: "id",
                })}
              />

              <Controller
                name="bookNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="bookNumber">
                      Book Number
                      <span className="text-rose-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="bookNumber"
                      aria-invalid={fieldState.invalid}
                      placeholder="Book Number"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <FieldGroup className="flex flex-row justify-between">
                <Controller
                  name="receiptStartingNumber"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="receiptStartingNumber">
                        Receipt Start Number
                        <span className="text-rose-500">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="receiptStartingNumber"
                        aria-invalid={fieldState.invalid}
                        placeholder="Receipt Starting Number"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="receiptEndingNumber"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="receiptEndingNumber">
                        Receipt End Number
                        <span className="text-rose-500">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="receiptEndingNumber"
                        aria-invalid={fieldState.invalid}
                        placeholder="Receipt Ending Number"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

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

              <FieldGroup className="flex flex-row justify-between items-center">
                <Controller
                  name="assignedAt"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="assignedAt">Assigned At</FieldLabel>
                      <Input
                        {...field}
                        id="assignedAt"
                        aria-invalid={fieldState.invalid}
                        placeholder="Assigned Date in B.S. (optional)"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="returnedAt"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="returnedAt">Returned At</FieldLabel>
                      <Input
                        {...field}
                        id="returnedAt"
                        aria-invalid={fieldState.invalid}
                        placeholder="Return Date in B.S. (optional)"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldGroup>
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
                label="Add Receipt Book"
                labelWhenPending="Adding"
              />
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
