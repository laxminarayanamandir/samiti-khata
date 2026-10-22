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
import getNepaliDate from "@/lib/getNepaliDate";
import { Separator } from "@/components/ui/separator";
import { getFormattedDate } from "@/lib/formatDateTime";
import useGetReceiptBookDetails from "../hooks/useGetReceiptDetails";

type Props = {
  id: number | null;
  open: boolean;
  onClose: () => void;
  onUpdateClick?: () => void;
};

export default function ReceiptBookDetailsDialog({
  id,
  open,
  onClose,
  onUpdateClick,
}: Props) {
  const { data } = useGetReceiptBookDetails(id);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm md:min-w-2xl lg:min-w-4xl">
        <DialogHeader>
          <DialogTitle>Receipt Book Details</DialogTitle>
          <DialogDescription>
            View and manage receipt book details here.
          </DialogDescription>
        </DialogHeader>
        {data ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr] gap-10 py-4 max-h-100 overflow-y-auto no-scrollbar">
            <div className="space-y-5">
              <h3 className="font-semibold">Book Information</h3>

              <div className="flex flex-row justify-around gap-6 flex-wrap">
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Book Number</h3>
                  <p>Book - {data.bookNumber}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Receipts</h3>
                  <p>
                    {data.receiptStartingNumber} to {data.receiptEndingNumber}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Fiscal Year</h3>
                  <p>{data.fiscalYear?.name}</p>
                </div>
              </div>
            </div>

            {/* border  */}
            <div className="hidden lg:block col-start-2 row-span-2 border-l border-dashed border-muted-foreground/30 max-w-2"></div>

            <div className="space-y-5">
              <h3 className="font-semibold">Book Status</h3>

              <div className="flex flex-row justify-start gap-6 flex-wrap ">
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Status</h3>
                  <p
                    className={clsx(
                      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                      data.status === "AVAILABLE" &&
                        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
                      data.status === "ASSIGNED" &&
                        "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
                      data.status === "RETURNED" &&
                        "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
                      data.status === "ASSIGNED_WITH_MANY" &&
                        "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
                    )}
                  >
                    {data.status}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Assigned To</h3>
                  <p>{data.assignedMember?.name ?? "-"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Assigned At</h3>
                  <p>
                    {data.assignedAt ? getNepaliDate(data.assignedAt) : "-"}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Returned At</h3>
                  <p>
                    {data.returnedAt ? getNepaliDate(data.returnedAt) : "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <Separator />
              <h3 className="font-semibold">Administrative Information</h3>

              <div className="flex flex-row justify-start gap-6 flex-wrap px-3">
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Created At</h3>
                  <p>{getFormattedDate(new Date(data.createdAt))}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Updated At</h3>
                  <p>{getFormattedDate(new Date(data.updatedAt))}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center py-10">No data found</p>
        )}
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
          <Button onClick={() => onUpdateClick?.()}>
            <EditIcon className="size-4" />
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
