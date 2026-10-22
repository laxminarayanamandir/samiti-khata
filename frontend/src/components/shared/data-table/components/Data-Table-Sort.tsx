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
import { ListSortDescending } from "lucide-react";
import type { SortDir } from "../data-table.types";

type Props = {
  sorting: {
    sortDirection: SortDir | null;
    setSortDirection: Dispatch<SetStateAction<SortDir | null>>;
  };
};

export default function DataTableSort({ sorting }: Props) {
  return (
    <Select
      value={sorting.sortDirection ?? undefined}
      onValueChange={(value) => sorting.setSortDirection(value as SortDir)}
    >
      <SelectTrigger className="w-30">
        <ListSortDescending />
        <SelectValue placeholder="Sort By">
          {sorting.sortDirection === "asc" ? "Oldest" : "Newest"}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort Options</SelectLabel>
          <SelectItem value="asc">Oldest</SelectItem>
          <SelectItem value="desc">Newest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
