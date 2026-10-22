import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type InputFieldProps<
  TFieldValues extends FieldValues,
  TTransformValues = TFieldValues,
> = {
  control: Control<TFieldValues, unknown, TTransformValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  isRequired: boolean;
};
export default function InputField<
  TFieldValues extends FieldValues,
  TTransformValues = TFieldValues,
>({
  control,
  label,
  name,
  placeholder,
  isRequired = true,
}: InputFieldProps<TFieldValues, TTransformValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>
            {label}
            {isRequired && <span className="text-rose-500">*</span>}
          </FieldLabel>
          <Input
            {...field}
            id={name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
