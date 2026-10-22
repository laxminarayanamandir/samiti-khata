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
import { Controller, useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateOrgMember from "../hooks/useCreateOrgMember";
import { orgMemberSchema } from "../schemas/orgMember.schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { SubmitButton } from "@/components/shared/form";

export default function CreateOrgMemberDialog() {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(orgMemberSchema),
    defaultValues: {
      address: "",
      name: "",
      phone: "",
    },
  });

  const { isPending, onCreate } = useCreateOrgMember({
    setDialogClose: setOpen,
    resetForm: form.reset,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <PlusCircle /> Add Organization Member
          </Button>
        }
      />
      <DialogContent className="w-full min-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Organization Member</DialogTitle>
          <DialogDescription>
            Enter year details. Click add when you are done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-3" onSubmit={form.handleSubmit(onCreate)}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">
                  Name
                  <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <Input
                  {...field}
                  id="address"
                  aria-invalid={fieldState.invalid}
                  placeholder="Address (optional)"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                <Input
                  {...field}
                  id="phoneNumber"
                  aria-invalid={fieldState.invalid}
                  placeholder="Phone Number (optional)"
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
              label="Add Member"
              labelWhenPending="Adding"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
