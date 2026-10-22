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
import useUpdateSubCommittee from "../hooks/useUpdateSubCommittee";
import { InputField, SubmitButton } from "@/components/shared/form";
import { updateCommitteeSchema, } from "../schemas/committee.schema";
import useGetSubCommitteeDetails from "../hooks/useGetSubCommitteeDetails";

type Props = {
  id: number;
};

export default function UpdateSubCommitteeDialog({ id }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useGetSubCommitteeDetails(id);

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

  const { onUpdate, isPending } = useUpdateSubCommittee({
    onSettled: () => setOpen(false),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant={"default"} />}>
        <Edit />
      </DialogTrigger>
      <DialogContent className="w-full min-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Update Sub-Committee</DialogTitle>
          <DialogDescription>
            Update sub-committee details. Click update when you are done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-3" onSubmit={form.handleSubmit(onUpdate)}>
          <InputField
            control={form.control}
            isRequired
            label="Sub-Committee Name"
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
