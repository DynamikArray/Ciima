export const headers = [
  {
    text: "Category",
    align: "center",
    sortable: true,
    value: "CategoryName",
    width: "120"
  },
  {
    text: "Title",
    align: "left",
    sortable: true,
    value: "ItemTitle"
  },
  {
    text: "Qty",
    align: "center",
    sortable: false,
    value: "StockLevels",
    width: "90"
  },
  {
    text: "Location",
    align: "center",
    sortable: false,
    value: "StockItemId" //some unused column to use as a seed
  },
  {
    text: "Actions",
    value: "action",
    sortable: false,
    align: "center"
  }
];
