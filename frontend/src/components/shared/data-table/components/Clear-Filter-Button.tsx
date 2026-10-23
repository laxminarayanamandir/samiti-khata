import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function ClearFilterButton({ onClick }: Props) {
  return (
    <Button variant={"secondary"} onClick={onClick}>
      <X />
      Clear Filters
    </Button>
  );
}
