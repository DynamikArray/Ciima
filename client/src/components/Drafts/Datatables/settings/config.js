const headers = [
  {
    text: "Select",
    value: "data-table-select",
    sortable: false,
    align: "start"
    //width: "50px"
  },
  {
    text: "Main Image",
    value: "main_image",
    sortable: false,
    align: "center  pa-1"
    //width: "50px"
  },
  {
    text: "Title",
    value: "inventoryTitle",
    sortable: false,
    align: "start pa-1",
    width: "95%"
  },
  /*
  {
    text: "Grade",
    value: "grade",
    sortable: false,
    align: "center pa-1"
  },
  {
    text: "Qty",
    value: "quantity",
    sortable: false,
    align: "center pa-1"
    //width: "70px"
  },
  {
    text: "Price",
    value: "price",
    sortable: false,
    align: "center pa-1",
    width: "90px"
  },
  */
  {
    text: "Location",
    value: "locationCode",
    sortable: false,
    align: "start pa-1",
    width: "180px"
  },
  {
    text: "User",
    value: "ownerId",
    sortable: false,
    align: "center pa-0",
    width: "35px"
  },
  {
    text: "Date",
    value: "createdDate",
    sortable: false,
    align: "center pa-1",
    width: "120px"
  },
  {
    text: "Actions",
    value: "action",
    sortable: false,
    align: "center pa-1",
    width: "110px"
  }
];

module.exports = { headers };
