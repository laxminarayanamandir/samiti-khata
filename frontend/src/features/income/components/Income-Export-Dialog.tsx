import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IncomeQueryParams } from "@/types/pagination.types";
import useExportIncomes from "../hooks/useExportIncomes";

type ExportScope = "all-matching" | "current-page";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: IncomeQueryParams;
};

export default function IncomeExportDialog({
  open,
  onOpenChange,
  query,
}: Props) {
  const [scope, setScope] = useState<ExportScope>("current-page");
  const [password, setPassword] = useState("");
  const { mutate: exportIncomes, isPending } = useExportIncomes();

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;
    if (!nextOpen) {
      setPassword("");
      setScope("current-page");
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    exportIncomes(
      { ...query, scope, password },
      { onSuccess: () => handleOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Export income data</DialogTitle>
            <DialogDescription>
              Choose which income records to export and confirm your password.
            </DialogDescription>
          </DialogHeader>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">Records to export</legend>
            <Label className="items-start rounded-md border p-3">
              <input
                type="radio"
                name="export-scope"
                value="all-matching"
                checked={scope === "all-matching"}
                onChange={() => setScope("all-matching")}
                disabled={isPending}
                className="mt-0.5 accent-primary"
              />
              <span>
                All matching data
                <span className="mt-1 block font-normal text-muted-foreground">
                  Export every income record that matches the current filters.
                </span>
              </span>
            </Label>
            <Label className="items-start rounded-md border p-3">
              <input
                type="radio"
                name="export-scope"
                value="current-page"
                checked={scope === "current-page"}
                onChange={() => setScope("current-page")}
                disabled={isPending}
                className="mt-0.5 accent-primary"
              />
              <span>
                Current page
                <span className="mt-1 block font-normal text-muted-foreground">
                  Export only the records on the currently selected page.
                </span>
              </span>
            </Label>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="income-export-password">Password</Label>
            <Input
              id="income-export-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={isPending}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !password}>
              {isPending ? "Exporting..." : "Export and download"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
