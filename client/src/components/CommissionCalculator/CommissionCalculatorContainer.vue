<template>
  <v-container fluid>
    <v-row>
      <v-col col="6">
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
      </v-col>
      <v-col col="6">
        <TotalsBox
          :totalResults="results.length"
          :totalFee="Number(totalFee)"
          :totalNet="Number(totalNet)"
          :totalGross="Number(totalGross)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :items-per-page="500"
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
    results: []
  }),
  computed: {
    totalGross() {
      return this.results
        .reduce((sum, item) => {
          sum = Number(sum) + Number(item.Gross);
          return sum;
        }, 0)
        .toFixed(2);
    },
    totalNet() {
      return this.results
        .reduce((sum, item) => {
          sum = Number(sum) + Number(item.Net);
          return sum;
        }, 0)
        .toFixed(2);
    },
    totalFee() {
      return this.results
        .reduce((sum, item) => {
          sum = Number(sum) - Number(item.Fee);
          return sum;
        }, 0)
        .toFixed(2);
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
            _this.results = results.data.filter(row => {
              return row.Type === "eBay Auction Payment";
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
