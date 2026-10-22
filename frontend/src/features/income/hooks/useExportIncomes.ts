import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { exportIncomes } from "../api/income.api";

export default function useExportIncomes() {
  return useMutation({
    mutationFn: exportIncomes,
    onSuccess: (file) => {
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "income-export.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
      toast.success("Income Excel file downloaded.");
    },
    onError: (error) => {
      let message = "Unable to export income.";
      if (isAxiosError(error)) {
        message = error.response?.data?.message ?? message;
      }
      toast.error(message);
    },
  });
}
