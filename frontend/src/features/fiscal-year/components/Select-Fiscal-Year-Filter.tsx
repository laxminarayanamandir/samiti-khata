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
import useGetFiscalYears from "../hooks/useGetFiscalYear";

type Props = {
  fiscalYearId: string | null;
  setFiscalYearId: Dispatch<SetStateAction<string | null>>;
};

export default function SelectFiscalYearFilter({
  fiscalYearId,
  setFiscalYearId,
}: Props) {
  const { data } = useGetFiscalYears();

  const getSelectedItem = (value: string) => {
    return data?.find((option) => String(option.id) === value);
  };

  return (
    <Select
      value={fiscalYearId}
      onValueChange={(value) => setFiscalYearId(value)}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a fiscal year">
          {fiscalYearId && (
            <span>{getSelectedItem(String(fiscalYearId))?.name}</span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fiscal Years</SelectLabel>
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
