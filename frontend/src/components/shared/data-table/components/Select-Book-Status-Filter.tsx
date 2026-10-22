import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Dispatch, SetStateAction } from "react";

type Props = {
  status: string | null;
  setStatus: Dispatch<SetStateAction<string | null>>;
};

const statusOptions = ["AVAILABLE", "ASSIGNED", "RETURNED"];

export default function SelectBookStatusFilter({ status, setStatus }: Props) {
  return (
    <Select value={status} onValueChange={(value) => setStatus(value)}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {statusOptions.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
