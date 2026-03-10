export type ProductPage = {
  name: string;
  sort: string; // etiqueta del select (p. ej. "Name (A to Z)")
  pick: number[]; // índices a agregar al carrito
};

export const cases: ProductPage[] = [
  { name: "caso-1", sort: "Name (A to Z)", pick: [0, 1] },
  { name: "caso-2", sort: "Price (low to high)", pick: [2] },
];
