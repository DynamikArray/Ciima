export const headers = [
  {
    text: "Image",
    align: "center",
    sortable: false,
    value: "imgThumb",
    width: "60px"
  },
  /*
  {
    text: "Category",
    align: "center",
    sortable: true,
    value: "CategoryName",
    width: "120"
  },
  */
  {
    text: "Title",
    align: "left",
    sortable: true,
    value: "itemTitle"
  },
  {
    text: "Issue #(s)",
    align: "center",
    sortable: true,
    value: "extendedProperties.issueNumbers",
    width: "140px"
  },
  {
    text: "Qty",
    align: "center",
    sortable: true,
    value: "location.qty",
    width: "40px"
  },
  {
    text: "Bin/Rack",
    align: "center",
    sortable: true,
    value: "location.name",
    width: "120px"
  },
  {
    text: "Price",
    align: "center",
    sortable: true,
    value: "price",
    width: "80px"
  }
];
