export const { ebay } = require("./ebay");

export const dashboard = {
  formatTimestampStartOfDay: "YYYY-MM-DD 00:00:00",
  formatTimestampEndOfDay: "YYYY-MM-DD 23:59:59",
  formatMonthDayDayname: "(ddd) Do ",
  formatDatePlain: "MMM DD, YYYY",
  formatDateTitleString: "MMM Do",
  targetScore: 1000000,
  chartOptions: {
    colors: {
      white: "#FFFFFF",
      blue: "rgb(	81, 160, 250, 1)",
      blueOpacity: "rgb(81, 160, 250, 0.3)",
      green: "rgb(0,230,118,1)",
      greenOpacity: "rgb(0,230,118,0.2)",
      yellow: "rgb(255,255,0,1)",
      yellowOpacity: "rgb(255,255,0,.2)"
    }
  }
};

const appConfig = {
  ebay,
  dashboard: dashboard
};

export default appConfig;
