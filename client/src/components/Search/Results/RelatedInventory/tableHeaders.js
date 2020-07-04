export const headers = [
  {
    text: "Image",
    align: "center",
    sortable: false,
    value: "imgThumb",
    width: "50px"
  },

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
    width: "100px"
  },
  {
    text: "Price",
    align: "center",
    sortable: true,
    value: "price",
    width: "70px"
  }
];
