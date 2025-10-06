type PreparationsShort = {
  _id: string;
};

export type Order = {
  _id: string;
  tableNumber: number;
  opened: string;
  billed?: string | null;
  preparations: PreparationsShort[];
};
