import NepaliDate from "nepali-date-converter";

export default function getFormattedDateTime(date: Date) {
  const nepaliDate = new NepaliDate(date).format("DD MMMM YYYY");

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

  // return `${nepaliDate} • ${englishDate} • ${time}`;
  return `${nepaliDate} • ${time}`;
}

export function getFormattedDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
