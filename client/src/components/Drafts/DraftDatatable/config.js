const headers = [
  {
    text: "Main Image",
    value: "main_image",
    sortable: false,
    align: "center",
    width: "50px"
  },
  {
    text: "Title",
    value: "inventoryTitle",
    sortable: true,
    align: "left"
  },
  {
    text: "Grade",
    value: "grade",
    sortable: true,
    align: "center"
  },
  {
    text: "Qty",
    value: "quantity",
    sortable: true,
    align: "center",
    width: "70px"
  },
  {
    text: "Price",
    value: "price",
    sortable: true,
    align: "center",
    width: "90px"
  },
  {
    text: "Location",
    value: "locationCode",
    sortable: true,
    align: "center",
    width: "180px"
  },
  {
    text: "Date",
    value: "createdDate",
    sortable: true,
    align: "center",
    width: "120px"
  },
  {
    text: "Actions",
    value: "action",
    sortable: false,
    align: "center",
    width: "40px"
  }
];

module.exports = { headers };
