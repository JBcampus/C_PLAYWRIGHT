/** Casos para inventario: orden y selección de productos */
export const InventoryCases = Object.freeze([
  {
    name: "Hilo_1-3-5",
    sort: "hilo" as const, // high to low
    pick: [0, 2, 4],
    expectedBadge: "3",
  },
  {
    name: "LoHi_2-4",
    sort: "lohi" as const, // low to high
    pick: [1, 3],
    expectedBadge: "2",
  },
  {
    name: "AZ_1-only",
    sort: "az" as const, // A → Z
    pick: [0],
    expectedBadge: "1",
  },
]);
