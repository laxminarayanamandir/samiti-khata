import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";

import type { SearchableColumns } from "@/types/pagination.types";
import type { PaginationState } from "@tanstack/react-table";

type Props = {
  search: {
    searchKey: string;
    searchColumn: string;
    searchableColumns: SearchableColumns[];
    setSearchKey: Dispatch<SetStateAction<string>>;
    setSearchColumn: Dispatch<SetStateAction<string>>;
  };

  pagination: {
    setPagination: Dispatch<SetStateAction<PaginationState>>;
  };
};

export default function DataTableSearch({ search, pagination }: Props) {
  const [inputValue, setInputValue] = useState(search.searchKey);

  const debouncedSearch = useDebounce(inputValue, 600);

  useEffect(() => {
    if (debouncedSearch === search.searchKey) {
      return;
    }

    search.setSearchKey(debouncedSearch);

    pagination.setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  }, [
    debouncedSearch,
    search.searchKey,
    search.setSearchKey,
    pagination.setPagination,
  ]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleColumnChange = (column: string | null) => {
    if (column) search.setSearchColumn(column);

    pagination.setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  };

  const selectedColumn = search.searchableColumns.find(
    (column) => column.id === search.searchColumn,
  );

  return (
    <div className="flex items-center gap-2">
      {/* Search column */}
      <Select value={search.searchColumn} onValueChange={handleColumnChange}>
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Search by">
            {selectedColumn?.label}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Search Options</SelectLabel>
            {search.searchableColumns.map((column) => (
              <SelectItem key={column.id} value={column.id}>
                {column.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Search value */}
      <Input
        value={inputValue}
        onChange={handleSearchChange}
        disabled={search.searchColumn === ""}
        placeholder={
          selectedColumn
            ? `Search ${selectedColumn.label.toLowerCase()}`
            : "Select Search Key to Search"
        }
        className="max-w-sm"
      />
    </div>
  );
}
