export interface Intermediary {
  id: number;
  to: number;
  from: number;
  step: number;
  order: number;
  name: string;
  createdAt: string;
  options: { id: number; option: string; value: number }[];
  type: "range" | "dropdown";
  [key: string]: any;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
