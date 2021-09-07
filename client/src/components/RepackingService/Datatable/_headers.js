const searchItemsHeaders = [
  {
    text: "Main Image",
    value: "Image",
    sortable: false,
    align: "center",
    width: 80
  },
  {
    text: "Per Comic Price",
    value: "PerComicPrice",
    sortable: true,
    align: "center",
    width: 100
  },
  {
    text: "Title",
    value: "ItemTitle",
    sortable: false,
    align: "left"
  },

  {
    text: "Actions",
    value: "action",
    sortable: false,
    align: "center pa-1",
    width: "90px"
  }
  /*
  {
    text: "Qty",
    value: "Quantity",
    sortable: true,
    align: "center",
    width: 70
  },
  {
    text: "I.O.B",
    value: "InOrderBook",
    sortable: true,
    align: "center",
    width: 70
  },
  {
    text: "Last Price",
    value: "CurrentListingPrice",
    sortable: true,
    align: "center",
    width: 120
  },
  */
];

const pendingItemsHeaders = [
  {
    text: "Main Image",
    value: "Image",
    sortable: false,
    align: "center",
    width: 80
  },
  {
    text: "Per Comic Price",
    value: "PerComicPrice",
    sortable: true,
    align: "center",
    width: 100
  },
  {
    text: "Title",
    value: "ItemTitle",
    sortable: false,
    align: "left"
  },

  {
    text: "Actions",
    value: "action",
    sortable: false,
    align: "center pa-1",
    width: "90px"
  }
];

const completedItemsHeaders = [
  {
    text: "Main Image",
    value: "Image",
    sortable: false,
    align: "center",
    width: 80
  },
  {
    text: "Per Comic Price",
    value: "PerComicPrice",
    sortable: true,
    align: "center",
    width: 100
  },
  {
    text: "Title",
    value: "ItemTitle",
    sortable: false,
    align: "left"
  },
  {
    text: "Completed Date",
    value: "repackCompletedDate",
    sortable: false,
    align: "center",
    width: 120
  }
];

export { searchItemsHeaders, pendingItemsHeaders, completedItemsHeaders };
