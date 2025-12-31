export interface Item {
  id: string;
  name: string;
  price: number;
  status: "on_sale" | "sold_out";
  description: string;
}
