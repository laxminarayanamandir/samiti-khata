import type { SelectOptions } from "@/types/selectOptions.types";

/**
 * Transforms array of object into select options
 * @param labelKey - Key of object which is used as key.
 * @param valueKey - Key of object which is used as value.
 * @param data - Array of object
 * @returns SelectOptions
 */

type Props<T> = {
  labelKey: keyof T;
  valueKey: keyof T;
  data?: Array<T>;
};

export default function getTransformedSelectOptions<T>({
  labelKey,
  valueKey,
  data,
}: Props<T>): SelectOptions {
  if (!data) return [];

  const options = data.map((d) => ({
    item: String(d[valueKey]),
    label: String(d[labelKey]),
  }));

  return options;
}
