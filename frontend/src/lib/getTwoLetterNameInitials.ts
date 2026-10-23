export default function getTwoLetterNameInitials(name: string) {
  const names = name.split(" ");
  if (names.length > 1) return names[0][0].concat(names[1][0]);
  return name.slice(0, 2);
}
