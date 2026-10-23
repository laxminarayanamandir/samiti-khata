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
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { Separator } from "@base-ui/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateCommittee from "../hooks/useUpdateCommittee";
import { updateCommitteeSchema } from "../schemas/committee.schema";
import { InputField, SubmitButton } from "@/components/shared/form";
import useGetCommitteeDetails from "../hooks/useGetCommitteeDetails";

type Props = {
  id: number;
};

export default function UpdateCommitteeDialog({ id }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useGetCommitteeDetails(id);

  const form = useForm({
    resolver: zodResolver(updateCommitteeSchema),
    defaultValues: {
      id,
      description: data?.description ?? "",
      name: data?.name ?? "",
    },
  });

  useEffect(() => {
    if (!data) return;

    form.reset({
      description: data.description,
      name: data.name,
      id: data.id,
    });
  }, [data, form]);

  const { onUpdate, isPending } = useUpdateCommittee({
    onSettled: () => setOpen(false),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant={"default"} />}>
        <Edit />
      </DialogTrigger>
      <DialogContent className="w-full min-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Update Committee</DialogTitle>
          <DialogDescription>
            Update committee details. Click update when you are done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-3" onSubmit={form.handleSubmit(onUpdate)}>
          <InputField
            control={form.control}
            isRequired
            label="Committee Name"
            name="name"
          />

          <InputField
            control={form.control}
            isRequired
            label="Description"
            name="description"
          />

          <Separator />
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <SubmitButton
              isPending={isPending}
              label="Update Committee"
              labelWhenPending="Updating"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
