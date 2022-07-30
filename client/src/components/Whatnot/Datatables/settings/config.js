/*
"order_id",
"buyer",
"product_name",
"product_description",
"sold_price",
"cancelled",
"bundled",
"tracking",
"shipment_manifest",
"label_only",
"fileDate",
*/

const headers = [
  {
    text: "Date",
    value: "saleDate",
    sortable: true,
    align: "center",
    width: "120px",
    groupable: true
  },
  {
    text: "OrderId",
    value: "order_id",
    sortable: true,
    align: "left px-5",
    width: "140px"
  },
  {
    text: "Buyer",
    value: "buyer",
    sortable: true,
    align: "start  pa-1",
    groupable: true
    //width: "25%"
  },
  {
    text: "Product Name",
    value: "product_name",
    sortable: false,
    align: "start pa-1"
    //width: "25%"
  },
  {
    text: "Product Description",
    value: "product_description",
    sortable: false,
    align: "start pa-1"
    //width: "150px"
  },
  {
    text: "Price",
    value: "sold_price",
    sortable: true,
    align: "center pa-0"
  },
  {
    text: "Cancelled",
    value: "cancelled",
    sortable: false,
    align: "center pa-1",
    width: "60px"
  },
  {
    text: "Bundled",
    value: "bundled",
    sortable: false,
    align: "center pa-1",
    width: "40px"
  },
  {
    text: "Tracking",
    value: "tracking",
    sortable: true,
    align: "center pa-1",
    width: "120px",
    groupable: true
  },
  {
    text: "Manifest",
    value: "shipment_manifest",
    sortable: false,
    align: "center pa-1"
    // width: "120px"
  }
];

module.exports = { headers };
