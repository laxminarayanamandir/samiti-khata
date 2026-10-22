import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Loader2 } from "lucide-react";
import type { ReceiptBook } from "../types/receiptBooks.types";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Page = {
  data: ReceiptBook[];
};

type InfiniteData = {
  pages: Page[];
};

type Props<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = {
  control: Control<TFieldValues, unknown, TTransformedValues>;
  name: Path<TFieldValues>;
  fieldLabel: string;
  isRequired?: boolean;
  data?: InfiniteData;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage?: boolean;
};

export default function InfiniteReceiptBookSelectField<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  fieldLabel,
  isRequired = true,
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage = false,
}: Props<TFieldValues, TTransformedValues>) {
  const options = data?.pages.flatMap((page) => page.data) ?? [];

  const getSelectedItem = (value: string) => {
    return options.find((option) => String(option.id) === value);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedItem = getSelectedItem(field.value);

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={name}>
              {fieldLabel}
              {isRequired && <span className="text-rose-500">*</span>}
            </FieldLabel>

            <Select
              value={field.value}
              onValueChange={field.onChange}
              aria-invalid={fieldState.invalid}
            >
              <SelectTrigger
                id={name}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder={`Select ${fieldLabel}`}>
                  {selectedItem && (
                    <>
                      <span>Book - {selectedItem.bookNumber}</span>
                      <span>( {selectedItem?.receiptStartingNumber}</span>
                      <span>to</span>
                      <span> {selectedItem?.receiptEndingNumber})</span>
                    </>
                  )}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.id} value={String(option.id)}>
                    Book - {option.bookNumber} ({option.receiptStartingNumber}{" "}
                    to {option.receiptEndingNumber})
                  </SelectItem>
                ))}

                {hasNextPage && (
                  <div className="border-t p-1">
                    <Button
                      type="button"
                      disabled={isFetchingNextPage}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        fetchNextPage();
                      }}
                    >
                      {isFetchingNextPage && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}

                      {isFetchingNextPage ? "Loading..." : "Load more"}
                    </Button>
                  </div>
                )}
              </SelectContent>
            </Select>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
