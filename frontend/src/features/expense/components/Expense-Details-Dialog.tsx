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
import { EditIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatNPR } from "@/lib/formatNepaliCurrency";
import { getFormattedDate } from "@/lib/formatDateTime";
import useGetExpenseDetails from "../hooks/useGetExpenseDetails";

type Props = {
  id: number | null;
  open: boolean;
  onClose: () => void;
  onDeleteClick?: () => void;
  onUpdateClick?: () => void;
};

export default function ExpenseDetailsDialog({
  id,
  open,
  onClose,
  onDeleteClick,
  onUpdateClick,
}: Props) {
  const { data } = useGetExpenseDetails(id);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm md:min-w-2xl lg:min-w-4xl">
        <DialogHeader>
          <DialogTitle>Expense Details</DialogTitle>
          <DialogDescription>
            View and manage your expense details here.
          </DialogDescription>
        </DialogHeader>
        {data ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-4 max-h-100 overflow-y-auto no-scrollbar">
            <div className="space-y-5">
              <h3 className="font-semibold">Bill Information</h3>
              <div className="flex flex-row justify-around gap-6 flex-wrap">
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Bill Number</h3>
                  <p>{data.billNumber ?? "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Voucher Number</h3>
                  <p>{data.voucherNumber ?? "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Date</h3>
                  <p>{data.nepaliDate}</p>
                  <p>{getFormattedDate(new Date(data.date))}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="font-semibold">Expense Information</h3>
              <div className="flex flex-row justify-around gap-6 flex-wrap">
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Particulars</h3>
                  <p>{data.particulars}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Quantity</h3>
                  <p>{data.quantity ?? "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Category</h3>
                  <p>{data.Category.name}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <Separator />
              <h3 className="font-semibold">Financial Information</h3>
              <div className="flex flex-row justify-between gap-6 flex-wrap px-3">
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Amount</h3>
                  <p className="rounded-full px-2.5 py-1 font-medium bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-200">
                    {formatNPR(data.amount).concat(" /-")}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Payment Mode</h3>
                  <p
                    className={clsx(
                      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                      data.paymentMode === "ONLINE" &&
                        "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
                      data.paymentMode === "CASH" &&
                        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
                      data.paymentMode === "CHEQUE" &&
                        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
                    )}
                  >
                    {data.paymentMode}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Committee</h3>
                  <p>{data.Committee.name}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Sub-Committee</h3>
                  <p>{data.SubCommittee?.name ?? "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <Separator />
              <h3 className="font-semibold">Recipient Information</h3>
              <div className="flex flex-row justify-around gap-6 flex-wrap">
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Name</h3>
                  <p>{data.recepientName}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Address</h3>
                  <p>{data.recepientAddress}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 lg:col-span-2">
              <Separator />
              <h3 className="font-semibold">Administrative Information</h3>
              <div className="flex flex-row justify-between gap-6 flex-wrap px-3">
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Paid By</h3>
                  <p>{data.AuthorizedOrgMember?.name ?? "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Created By</h3>
                  <p>{data.User.fullName}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Created At</h3>
                  <p>{getFormattedDate(new Date(data.createdAt))}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Updated At</h3>
                  <p>{getFormattedDate(new Date(data.updatedAt))}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-muted-foreground">Remarks</h3>
                  <p>{data.remarks ?? "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center py-10">No data found</p>
        )}
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
          <Button variant="destructive" onClick={() => onDeleteClick?.()}>
            <Trash2 className="size-4" />
            Delete
          </Button>
          <Button onClick={() => onUpdateClick?.()}>
            <EditIcon className="size-4" />
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
