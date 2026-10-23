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
import useGetExpenseCategories from "../hooks/useGetExpenseCategories";

type Props = {
  categoryId: string | null;
  setCategoryId: Dispatch<SetStateAction<string | null>>;
};

export default function SelectCategoryFilter({
 categoryId, setCategoryId
}: Props) {
  const { data } = useGetExpenseCategories();

  const getSelectedItem = (value: string) => {
    return data?.find((option) => String(option.id) === value);
  };

  return (
    <Select
      value={categoryId}
      onValueChange={(value) => setCategoryId(value)}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a category">
          {categoryId && (
            <span>{getSelectedItem(String(categoryId))?.name}</span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
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
