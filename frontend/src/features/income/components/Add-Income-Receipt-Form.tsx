import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import type {
  CreateIncomeForm,
  CreateIncomePayload,
} from "../schemas/income.schema";
import { useEffect } from "react";
import NepaliDate from "nepali-date-converter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PaymentModeOptions } from "@/constants/constants";
import InputField from "@/components/shared/form/Input-Field";
import { useWatch, type UseFormReturn } from "react-hook-form";
import SelectField from "@/components/shared/form/Select-Field";
import TextAreaField from "@/components/shared/form/Text-Area-Field";
import useGetOrgMembers from "@/features/user/hooks/useGetOrgMembers";
import useGetCommittees from "@/features/committees/hooks/useGetCommittees";
import getTransformedSelectOptions from "@/lib/getTransformedSelectOptions";
import useGetReceiptBooksInfiniteQuery from "@/features/receipt-books/hooks/useGetReceiptBooksInfiniteScroll";
import useGetSubCommitteeByCommittee from "@/features/committees/hooks/useGetSubCommitteeByCommittee";
import InfiniteReceiptBookSelectField from "@/features/receipt-books/components/Infinite-Receipt-Book-Select";

type Props = {
  form: UseFormReturn<CreateIncomeForm, unknown, CreateIncomePayload>;
};

export default function AddIncomeReceiptForm({ form }: Props) {
  const { data: committees } = useGetCommittees();
  const { data: orgMembers } = useGetOrgMembers();
  const {
    data: receiptBooks,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetReceiptBooksInfiniteQuery({ limit: 25 });

  // automatically populate fields based on selected options

  const bookAssignedTo = useWatch({
    control: form.control,
    compute: (data) => {
      const flattenedBooks =
        receiptBooks?.pages.flatMap((page) => page.data) ?? [];
      return flattenedBooks?.find((b) => b.id === Number(data.receiptBookId))
        ?.assignedTo;
    },
  });

  const committeeId = useWatch({
    control: form.control,
    name: "committeeId",
    defaultValue: undefined,
    compute: (committeeId) => {
      return !committeeId ? undefined : Number(committeeId);
    },
  });

  useEffect(() => {
    form.setValue(
      "receiptIssuerId",
      bookAssignedTo ? String(bookAssignedTo) : "",
      {
        shouldValidate: true,
        shouldDirty: false,
      },
    );
  }, [bookAssignedTo, form]);

  const { data: subCommittees } = useGetSubCommitteeByCommittee(committeeId);

  const handleSetDateAsToday = () => {
    const todayNepaliDate = new NepaliDate().format("YYYY-MM-DD");
    form.setValue("nepaliDate", todayNepaliDate);
  };

  return (
    <div className="px-5 space-y-5">
      <div>
        <FieldLabel className="font-semibold">Receipt Information</FieldLabel>
        <FieldDescription className="text-sm pt-1 text-muted-foreground">
          Selecting a book suggests the next receipt number automatically.
        </FieldDescription>
      </div>

      <FieldGroup>
        <InfiniteReceiptBookSelectField
          control={form.control}
          name="receiptBookId"
          fieldLabel="Receipt Book"
          data={receiptBooks}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isRequired
        />

        <div className="flex flex-row justify-between gap-3">
          <InputField
            control={form.control}
            label="Receipt Number"
            name="receiptNumber"
            isRequired
            placeholder="Receipt Number"
          />

          <InputField
            control={form.control}
            label="Date (B.S.)"
            name="nepaliDate"
            isRequired
            placeholder="2083-01-01"
          />

          <Button
            variant={"link"}
            className={"self-end"}
            onClick={() => handleSetDateAsToday()}
          >
            Set as <br />
            Today
          </Button>
        </div>
      </FieldGroup>

      <Separator />

      <FieldLabel className="font-semibold mt-10">Basic Information</FieldLabel>

      <FieldGroup className="flex flex-row justify-between gap-3">
        <InputField
          control={form.control}
          label="Name"
          name="name"
          placeholder="Name"
          isRequired
        />

        <InputField
          control={form.control}
          label="Address"
          name="address"
          placeholder="Address"
          isRequired
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
        Administrative Information
      </FieldLabel>

      <FieldGroup>
        <SelectField
          control={form.control}
          name="receiptIssuerId"
          fieldLabel="Receipt Issuer"
          isRequired={false}
          options={getTransformedSelectOptions({
            data: orgMembers,
            labelKey: "name",
            valueKey: "id",
          })}
        />
      </FieldGroup>

      <TextAreaField
        control={form.control}
        label="Remarks"
        name="remarks"
        isRequired={false}
      />
    </div>
  );
}
