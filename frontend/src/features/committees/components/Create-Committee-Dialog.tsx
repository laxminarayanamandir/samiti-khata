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
import useCreateCommittee from "../hooks/useCreateCommittee";
import { committeeSchema } from "../schemas/committee.schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { SubmitButton } from "@/components/shared/form";

export default function CreateCommitteeDialog() {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(committeeSchema),
    defaultValues: {
      description: "",
      name: "",
    },
  });

  const { isPending, onCreate } = useCreateCommittee({
    setDialogClose: setOpen,
    resetForm: form.reset,
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <PlusCircle /> Create Committee
          </Button>
        }
      />
      <DialogContent className="w-full min-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Committee</DialogTitle>
          <DialogDescription>
            Enter committee details. Click create when you are done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-3" onSubmit={form.handleSubmit(onCreate)}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">
                  Committee Name
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
                <FieldLabel htmlFor="name">
                  Description
                  <span className="text-rose-500">*</span>
                </FieldLabel>
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
