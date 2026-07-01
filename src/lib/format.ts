export const formatCLP = (value: number): string =>
  `$${value.toLocaleString("es-CL")}`;

export const formatDate = (iso: string): string => {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const initials = (name: string): string =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
