import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  label: string;
  labelWhenPending: string;
  isPending: boolean;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link"
    | null
    | undefined;
};

export default function SubmitButton({
  isPending,
  label,
  labelWhenPending,
  variant
}: Props) {
  return (
    <Button type="submit" variant={variant}>
      {isPending ? (
        <div className="flex flex-row gap-3">
          <Loader2 className="animate-spin" />
          <span>{labelWhenPending}</span>
        </div>
      ) : (
        <span>{label}</span>
      )}
    </Button>
  );
}
