import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFormattedDate } from "@/lib/formatDateTime";
import useGetCommitteeDetails from "../hooks/useGetCommitteeDetails";
import getNepaliDate from "@/lib/getNepaliDate";

type Props = {
  id: number | null;
  open: boolean;
  onClose: () => void;
  onUpdateClick?: () => void;
};

export default function CommitteeDetailsDialog({
  id,
  open,
  onClose,
  onUpdateClick,
}: Props) {
  const { data: committee } = useGetCommitteeDetails(id);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-fit max-w-[calc(100%-2rem)] sm:min-w-md sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Committee Details</DialogTitle>
          <DialogDescription>
            View committee information and status here.
          </DialogDescription>
        </DialogHeader>
        {committee ? (
          <div className="grid max-h-100 grid-cols-[auto_minmax(0,1fr)] gap-x-8 gap-y-5 overflow-y-auto py-4 no-scrollbar">
            <h3 className="text-muted-foreground">Name</h3>
            <p className="min-w-0 wrap-break-word">{committee.name}</p>

            <h3 className="text-muted-foreground">Description</h3>
            <p className="min-w-0 wrap-break-word">{committee.description}</p>

            <h3 className="text-muted-foreground">Status</h3>
            <p
              className={clsx(
                "inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium",
                committee.isActive
                  ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                  : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
              )}
            >
              {committee.isActive ? "Active" : "Inactive"}
            </p>

            <h3 className="text-muted-foreground">Created At</h3>
            <p>{getNepaliDate(committee.createdAt)}</p>

            <h3 className="text-muted-foreground">Updated At</h3>
            <p>{getNepaliDate(committee.updatedAt)}</p>
          </div>
        ) : (
          <p className="py-10 text-center">No data found</p>
        )}
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
          <Button onClick={() => onUpdateClick?.()}>
            <EditIcon className="size-4" />
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
