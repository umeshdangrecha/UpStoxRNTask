export type TListItem = {
  symbol: string;
  quantity: number;
  ltp: number;
  avgPrice: number;
  close: number;
};

export type ListItemProps = {
  stock: TListItem;
};
