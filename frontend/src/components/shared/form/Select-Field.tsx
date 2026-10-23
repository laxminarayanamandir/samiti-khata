import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Field, FieldError, FieldLabel } from "../../ui/field";
import type { SelectOptions } from "@/types/selectOptions.types";

type Props<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = {
  control: Control<TFieldValues, unknown, TTransformedValues>;
  name: Path<TFieldValues>;
  fieldLabel: string;
  isRequired?: boolean;
  options: SelectOptions;
};

export default function SelectField<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  fieldLabel,
  isRequired = true,
  options,
}: Props<TFieldValues, TTransformedValues>) {
  const getSelectedItem = (value: string) => {
    return options.find((option) => option.item === value);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
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
                {getSelectedItem(field.value)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.item} value={option.item}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
