<template>
  <v-container fluid>
    <v-row>
      <v-col cols="5">
        <v-alert type="info" class="">
          <h4>Upload a Paypal Sales Report:</h4>
          <input
            type="file"
            id="files"
            class="form-control"
            accept=".csv"
            required
            @change="handleFileUpload"
          />
        </v-alert>

        <div class="grey darken-4 pa-2">
          <div class="d-flex align-center justify-space-between mt-3">
            <v-text-field
              class="px-2"
              v-model="salesFloor"
              label="Starting Sales"
              outlined
              dense
            />
            <v-text-field
              class="px-2"
              v-model="shippingCost"
              label="Shipping Cost"
              outlined
              dense
            />
            <v-text-field
              class="px-2"
              v-model="commishPercent"
              label="Commission %"
              outlined
              dense
            />
          </div>

          <v-divider />

          <div class="d-flex align-center justify-center">
            <h4 class="mb-2 mr-2">Order Sales By:</h4>
            <div>
              <v-radio-group v-model="itemsOrder" :column="false" class="">
                <v-radio
                  key="orig"
                  value="orig"
                  label="Original Order"
                  color="primary"
                />
                <v-radio
                  key="newest"
                  value="date-desc"
                  label="Date Desc"
                  color="primary"
                />
                <v-radio
                  key="oldest"
                  value="date-asc"
                  label="Date Asc"
                  color="primary"
                />
                <v-radio
                  key="largest"
                  value="gross-desc"
                  label="Gross Desc"
                  color="primary"
                />
                <v-radio
                  key="smallest"
                  value="gross-asc"
                  label="Gross Asc"
                  color="primary"
                />
              </v-radio-group>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="7">
        <TotalsBox
          :totalResults="results.length"
          :totalGross="Number(totalGross)"
          :totalFee="Number(totalFee)"
          :totalTax="Number(totalTax)"
          :totalNet="Number(totalNet)"
          :shippingObligations="shippingObligations"
          :shippingCost="Number(shippingCost)"
          :commishPercent="Number(commishPercent / 100)"
          :salesFloor="Number(salesFloor)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :items-per-page="25"
          :headers="headers"
          :items="results"
          :item-key="'Transaction Id'"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { headers } from "./headersConfig";
import TotalsBox from "./TotalsBox";

export default {
  components: {
    TotalsBox
  },
  data: () => ({
    headers,
    rawResults: [],
    itemsOrder: "orig",
    commishPercent: 5,
    shippingCost: 4.0,
    salesFloor: 30000
  }),
  computed: {
    results() {
      const results = [...this.rawResults];

      switch (this.itemsOrder) {
        case "date-asc":
          return results.sort((a, b) => new Date(a.Date) - new Date(b.Date));
          break;
        case "date-desc":
          return results.sort((a, b) => new Date(b.Date) - new Date(a.Date));
          break;
        case "gross-asc":
          return results.sort((a, b) => a.Gross - b.Gross);
          break;
        case "gross-desc":
          return results.sort((a, b) => b.Gross - a.Gross);
          break;
        default:
          return results;
      }
    },
    totalGross() {
      return this.results
        .reduce((sum, item, index) => {
          //console.log(typeof Number(item.Gross), typeof Number(sum));
          sum = Number(sum) + Number(item.Gross.replace(",", ""));
          return sum;
        }, 0)
        .toFixed(2);
    },
    totalNet() {
      return this.results
        .reduce((sum, item) => {
          sum = Number(sum) + Number(item.Net.replace(",", ""));
          return sum;
        }, 0)
        .toFixed(2);
    },
    totalFee() {
      return 0;
      return this.results
        .reduce((sum, item) => {
          sum = Number(sum) - Number(item.Fee.replace(",", ""));
          return sum;
        }, 0)
        .toFixed(2);
    },
    totalTax() {
      return this.results
        .reduce((sum, item) => {
          sum = Number(sum) + Number(item["Sales Tax"].replace(",", ""));
          return sum;
        }, 0)
        .toFixed(2);
    },
    shippingObligations() {
      let total = 0;
      let totalRow = 0;

      this.results.map((item, index) => {
        if (!totalRow) {
          if (total > this.salesFloor) totalRow = index;
        }
        if (total < this.salesFloor)
          total = Number(total) + Number(item.Net.replace(",", ""));
      });

      return {
        rowsToThreshold: totalRow,
        rowsAfterThreshold: this.results.length - totalRow
      };
    }
  },
  methods: {
    handleFileUpload(e) {
      const _this = this;

      const fr = new FileReader();
      fr.onload = () => {
        this.$papa.parse(fr.result, {
          worker: true,
          header: true,
          complete: function(results) {
            _this.rawResults = results.data.filter(row => {
              return (
                row.Type === "eBay Auction Payment" && row.Status == "Completed"
              );
            });
          }
        });
      };

      fr.readAsText(e.target.files[0]);
    }
  }
};
</script>

<style scoped></style>
