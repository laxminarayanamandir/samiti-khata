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
    onError: async (error) => {
      let message = "Unable to export income.";
      if (isAxiosError(error)) {
        const responseData: unknown = error.response?.data;
        if (responseData instanceof Blob) {
          try {
            const body: unknown = JSON.parse(await responseData.text());
            if (
              typeof body === "object" &&
              body !== null &&
              "message" in body &&
              typeof body.message === "string"
            ) {
              message = body.message;
            }
          } catch {
            message = "Unable to export income.";
          }
        } else if (
          typeof responseData === "object" &&
          responseData !== null &&
          "message" in responseData &&
          typeof responseData.message === "string"
        ) {
          message = responseData.message;
        }
      }
      toast.error(message);
    },
  });
}
