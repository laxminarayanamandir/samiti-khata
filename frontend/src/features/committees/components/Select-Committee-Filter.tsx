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
import useGetCommittees from "../hooks/useGetCommittees";

type Props = {
  committeeId: string | null;
  setCommitteeId: Dispatch<SetStateAction<string | null>>;
};

export default function SelectCommitteeFilter({
  committeeId,
  setCommitteeId,
}: Props) {
  const { data } = useGetCommittees();

  const getSelectedItem = (value: string) => {
    return data?.find((option) => String(option.id) === value);
  };

  return (
    <Select
      value={committeeId}
      onValueChange={(value) => setCommitteeId(value)}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a committee">
          {committeeId && (
            <span>{getSelectedItem(String(committeeId))?.name}</span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Committees</SelectLabel>
          {data?.map((option) => (
            <SelectItem key={option.id} value={String(option.id)}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
