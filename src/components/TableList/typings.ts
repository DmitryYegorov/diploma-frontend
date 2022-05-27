export type Column = {
  id: string;
  label: string;
  minWidth?: number;
  align?: "center" | "inherit" | "justify" | "left" | "right";
  sortable?: boolean;
  renderCell?: (row: any, column: Column) => JSX.Element | null;
};

export const enum Direction {
  ASC = "asc",
  DESC = "desc",
}
