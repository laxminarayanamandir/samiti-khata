import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetOrgMembers from "@/features/user/hooks/useGetOrgMembers";

import type { Dispatch, SetStateAction } from "react";

type Props = {
  orgMemberId: string | null;
  setOrgMemberId: Dispatch<SetStateAction<string | null>>;
  label: string;
};

export default function SelectOrgMemberFilter({
  orgMemberId,
  setOrgMemberId,
  label,
}: Props) {
  const { data } = useGetOrgMembers();

  const getSelectedItem = (value: string) => {
    return data?.find((option) => String(option.id) === value);
  };

  return (
    <Select
      value={orgMemberId}
      onValueChange={(value) => setOrgMemberId(value)}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={`Select ${label}`}>
          {orgMemberId && (
            <span>{getSelectedItem(String(orgMemberId))?.name}</span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Organization Members</SelectLabel>
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
