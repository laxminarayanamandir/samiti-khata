import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { subCommitteeSchema } from "../schemas/committee.schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import useCreateSubCommittee from "../hooks/useCreateSubCommittee";
import useGetCommittees from "../hooks/useGetCommittees";
import SelectField from "@/components/shared/form/Select-Field";
import getTransformedSelectOptions from "@/lib/getTransformedSelectOptions";
import { SubmitButton } from "@/components/shared/form";

export default function CreateSubCommitteeDialog() {
  const [open, setOpen] = useState<boolean>(false);
  // const { data: committees } = useGetCommittees();

  const form = useForm({
    resolver: zodResolver(subCommitteeSchema),
    defaultValues: {
      description: "",
      name: "",
      mainCommitteeId: "",
    },
  });

  const { isPending, onCreate } = useCreateSubCommittee({
    setDialogClose: setOpen,
    resetForm: form.reset,
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <PlusCircle /> Create Sub Committee
          </Button>
        }
      />
      <DialogContent className="w-full min-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Sub-Committee</DialogTitle>
          <DialogDescription>
            Enter sub-committee details. Click create when you are done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-3" onSubmit={form.handleSubmit(onCreate)}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">
                  Sub Committee Name
                  <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Committee Name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Description</FieldLabel>
                <Textarea
                  {...field}
                  id="description"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* <SelectField
            control={form.control}
            fieldLabel="Main Committee"
            name="mainCommitteeId"
            isRequired
            options={getTransformedSelectOptions({
              data: committees,
              labelKey: "name",
              valueKey: "id",
            })}
          /> */}

          <Separator />
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <SubmitButton
              isPending={isPending}
              label="Create Committee"
              labelWhenPending="Creating"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
