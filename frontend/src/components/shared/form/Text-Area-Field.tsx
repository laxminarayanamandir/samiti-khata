import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type Props<
  TFieldValues extends FieldValues,
  TTransformValues = TFieldValues,
> = {
  control: Control<TFieldValues, unknown, TTransformValues>;
  name: Path<TFieldValues>;
  label: string;
  isRequired: boolean;
};
export default function TextAreaField<
  TFieldValues extends FieldValues,
  TTransformValues = TFieldValues,
>({
  control,
  label,
  name,
  isRequired = true,
}: Props<TFieldValues, TTransformValues>) {
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
          <Textarea {...field} id={name} aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
