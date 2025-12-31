export interface Item {
  id: string;
  name: string;
  price: number;
  status: "on_sale" | "sold_out";
  description: string;
}

export interface CreateItemParams {
  name: string;
  price: number;
  description?: string;
}
