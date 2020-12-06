export const headers = [
  {
    text: "Category",
    align: "center",
    sortable: true,
    value: "CategoryName",
    width: "100px"
  },

  {
    text: "Image",
    align: "left",
    sortable: false,
    value: "imgThumb",
    width: "60px"
  },

  {
    text: "Title",
    align: "left",
    sortable: true,
    value: "ItemTitle"
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
    width: "65px"
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

export default headers;
