import { format } from "date-fns";

export default {
  buildReportHeader: function(options) {
    const table = {
      layout: "noBorders",
      table: {
        widths: ["*"],
        body: [
          [
            {
              text: `${options.title}`,
              alignment: "center",
              fontSize: 18,
              margin: [0, 10]
            }
          ]
        ]
      }
    };
    return table;
  },

  buildReportFooter: function(options) {
    const table = {
      layout: "noBorders",
      table: {
        widths: ["*"],
        body: [
          [
            {
              text: `${options.subtitle} | Page ${options.currentPage} of ${
                options.pageCount
              }`,
              alignment: "center",
              fontSize: 14
            }
          ]
        ]
      }
    };
    return table;
  },

  /**
   * buildProductRows
   * @param  array products array of products/locations
   * @return {[type]}          [description]
   */
  buildProductRows: function(products) {
    let priorCard = false;

    const productRows = products.map(product => {
      const item = {};
      item.table = {
        dontBreakRows: true,
        headerRows: 1,
        widths: [80, "*", 15, 80],
        body: [
          [
            { text: "Location", fontSize: 10, alignment: "center" },
            { text: "Product Title", fontSize: 10, alignment: "left" },
            { text: "Qty", fontSize: 10, alignment: "center" },
            { text: "End Date", fontSize: 10, alignment: "center" }
          ],
          [
            { text: product.location, fontSize: 10, alignment: "center" },
            { text: product.itemTitle, fontSize: 10, alignment: "left" },
            { text: product.quantity, fontSize: 10, alignment: "center" },
            {
              text: format(product.endDateTime, "MMM DD, YYYY hh:mm a"),
              fontSize: 10,
              alignment: "center"
            }
          ]
        ]
      };
      //add margins
      item.margin = [0, 10];
      //send it back
      return item;
    });
    //send em all back
    return productRows;
  },

  /**
   * [description]
   * @param  {[type]} products [description]
   * @param  {[type]} options  [description]
   * @return {[type]}          [description]
   */
  create: function(products, options) {
    let _this = this;
    return new Promise(function(resolve, reject) {
      try {
        const documentDefinition = {
          header: function(currentPage, pageCount, pageSize) {
            const opts = { ...options, currentPage, pageCount, pageSize };
            return _this.buildReportHeader(opts);
          },
          content: [_this.buildProductRows(products)],
          footer: function(currentPage, pageCount, pageSize) {
            const opts = { ...options, currentPage, pageCount, pageSize };
            return _this.buildReportFooter(opts);
          }
        };
        resolve(documentDefinition);
      } catch (e) {
        reject(e);
      }
    });
  }

  //
  //
};
