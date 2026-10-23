import type {
  CreateExpenseForm,
  CreateExpensePayload,
} from "../schemas/expense.schema";
import NepaliDate from "nepali-date-converter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PaymentModeOptions } from "@/constants/constants";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import useGetOrgMembers from "@/features/user/hooks/useGetOrgMembers";
import getTransformedSelectOptions from "@/lib/getTransformedSelectOptions";
import useGetCommittees from "@/features/committees/hooks/useGetCommittees";
import useGetSubCommitteeByCommittee from "@/features/committees/hooks/useGetSubCommitteeByCommittee";
import useGetExpenseCategories from "@/features/expense-category/hooks/useGetExpenseCategories";
import {
  InputField,
  SelectField,
  TextAreaField,
} from "@/components/shared/form";

type Props = {
  form: UseFormReturn<CreateExpenseForm, unknown, CreateExpensePayload>;
};

export default function AddExpenseBillForm({ form }: Props) {
  const { data: committees } = useGetCommittees();
  const { data: orgMembers } = useGetOrgMembers();
  const { data: categories } = useGetExpenseCategories();

  // automatically populate fields based on selected options

  const committeeId = useWatch({
    control: form.control,
    name: "committeeId",
    defaultValue: undefined,
    compute: (committeeId) => {
      return !committeeId ? undefined : Number(committeeId);
    },
  });

  const { data: subCommittees } = useGetSubCommitteeByCommittee(committeeId);

  const handleSetDateAsToday = () => {
    const todayNepaliDate = new NepaliDate().format("YYYY-MM-DD");
    form.setValue("nepaliDate", todayNepaliDate, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="px-5 space-y-5">
      <FieldLabel className="font-semibold">Bill Information</FieldLabel>

      <FieldGroup>
        <div className="flex flex-row justify-between gap-3">
          <InputField
            control={form.control}
            label="Bill Number"
            name="billNumber"
            isRequired={false}
            placeholder="Bill Number"
          />

          <InputField
            control={form.control}
            label="Voucher Number"
            name="voucherNumber"
            isRequired={false}
            placeholder="Voucher Number"
          />
        </div>

        <div className="flex flex-row gap-3">
          <InputField
            control={form.control}
            label="Date (B.S.)"
            name="nepaliDate"
            isRequired
            placeholder="2083-01-01"
          />

          <Button
            className={
              "self-end text-primary-foreground bg-transparent hover:bg-transparent hover:underline"
            }
            onClick={() => handleSetDateAsToday()}
          >
            Set as <br />
            Today
          </Button>
        </div>
      </FieldGroup>

      <Separator />

      <FieldLabel className="font-semibold mt-10">
        Expense Information
      </FieldLabel>

      <FieldGroup>
        <div className="flex flex-row justify-between gap-3">
          <InputField
            control={form.control}
            label="Particulars"
            name="particulars"
            placeholder="Particulars"
            isRequired
          />

          <InputField
            control={form.control}
            label="Quantity"
            name="quantity"
            placeholder="Quantity"
            isRequired={false}
          />
        </div>

        <SelectField
          control={form.control}
          name="categoryId"
          fieldLabel="Category"
          isRequired
          options={getTransformedSelectOptions({
            data: categories,
            labelKey: "name",
            valueKey: "id",
          })}
        />
      </FieldGroup>

      <Separator />

      <FieldLabel className="font-semibold mt-10">
        Financial Information
      </FieldLabel>

      <FieldGroup>
        <div className="flex flex-row justify-between gap-3">
          <InputField
            control={form.control}
            label="Amount"
            name="amount"
            placeholder="Amount"
            isRequired
          />

          <SelectField
            control={form.control}
            name="paymentMode"
            fieldLabel="Payment Mode"
            options={PaymentModeOptions}
            isRequired={false}
          />
        </div>
        <div className="flex flex-row justify-between gap-3">
          <SelectField
            control={form.control}
            name="committeeId"
            fieldLabel="Committee"
            isRequired
            options={getTransformedSelectOptions({
              data: committees,
              labelKey: "name",
              valueKey: "id",
            })}
          />

          <SelectField
            control={form.control}
            name="subCommitteeId"
            fieldLabel="Sub Committee"
            isRequired={false}
            options={
              subCommittees
                ? getTransformedSelectOptions({
                    data: subCommittees,
                    labelKey: "name",
                    valueKey: "id",
                  })
                : []
            }
          />
        </div>
      </FieldGroup>

      <Separator />

      <FieldLabel className="font-semibold mt-10">
        Receipent Information
      </FieldLabel>

      <FieldGroup className="flex flex-row justify-between gap-3">
        <InputField
          control={form.control}
          label="Receipient Name"
          name="recepientName"
          placeholder="Receipient Name"
          isRequired={false}
        />

        <InputField
          control={form.control}
          label="Receipient Address"
          name="recepientAddress"
          placeholder="Receipient Address"
          isRequired={false}
        />
      </FieldGroup>

      <Separator />

      <FieldLabel className="font-semibold mt-10">
        Administrative Information
      </FieldLabel>

      <FieldGroup>
        <SelectField
          control={form.control}
          name="payerId"
          fieldLabel="Paid By"
          isRequired={false}
          options={getTransformedSelectOptions({
            data: orgMembers,
            labelKey: "name",
            valueKey: "id",
          })}
        />

        <TextAreaField
          control={form.control}
          label="Remarks"
          name="remarks"
          isRequired={false}
        />
      </FieldGroup>
    </div>
  );
}
