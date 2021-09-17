module.exports = [
  //{ icon: "fa fa-home", text: "Home", to: "home" },
  { icon: "fa fa-search", text: "Title Search", to: "titles" },
  { icon: "fa fa-list-ol", text: "Issue Lookup", to: "issues" },
  { icon: "fa fa-image", text: "Photo Builder", to: "images" },
  { menuDivider: true },
  { icon: "fa fa-plus-square", text: "New Draft", to: "draft" },
  { icon: "fa fa-list-alt", text: "View Drafts", to: "drafts" },
  { menuDivider: true },
  { icon: "fa fa-boxes", text: "Search Inventory", to: "inventory" },
  { icon: "fa fa-cube", text: "Locations", to: "locations", roles: ["isManager"] },
  { menuDivider: true },
  { icon: "fas fa-chart-line", text: "Dashboard", to: "homepage" },
  { icon: "fa fa-chart-bar", text: "Analytics", to: "analytics", roles: ["isManager"] },
  { menuDivider: true, roles: ["isManager"] },
  { icon: "fa fa-file-invoice", text: "Sold Items Report", to: "sold.items.report", roles: ["isManager"] },
  { icon: "fa fa-file-invoice-dollar", text: "Category Sales Report", to: "category.sales.report", roles: ["isManager"] },
  { menuDivider: true, roles: ["isManager"] },
  { icon: "fa fab fa-tools", text: "Tools & Utilities", to: "tools", roles: ["isManager"] }
];
/*
MOVED TO BUTTONS IN TOOLS
{ icon: "fa fa-history", text: "Audit Log", to: "audit" },
{ icon: "fa fa-project-diagram", text: "Price Matcher", to: "pricematch" },
{ icon: "fa fa-comment-dollar", text: "Price List", to: "pricelist" },
{ menuDivider: true },
*/
