import NepaliDate from "nepali-date-converter";
/**
 * Returns nepali date from ISO 8601
 * @param date: ISO 8601 Date String
 */

export default function getNepaliDate(date: string | undefined): string {
  if (!date) return "";
  const nepaliDate = new NepaliDate(new Date(date));
  const bs = nepaliDate.getBS();
  const month =
    bs.month + 1 < 10
      ? String(bs.month + 1).padStart(2, "0")
      : String(bs.month + 1);

  const day = bs.date < 10 ? String(bs.date).padStart(2, "0") : bs.date;

  return `${bs.year}-${month}-${day}`;
}
