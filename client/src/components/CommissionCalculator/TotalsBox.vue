<template>
  <v-alert class="grey darken-4">
    <v-row>
      <!--Left Side-->
      <v-col>
        <div class="d-flex justify-space-between align-center">
          <h5>
            eBay Auction Payment Rows
          </h5>
          <h3>
            {{ totalResults }}
          </h3>
        </div>

        <v-divider class="my-1"></v-divider>

        <div class="d-flex justify-space-between align-center">
          <h4>
            Total Gross:
          </h4>
          <h3>
            {{ Number(totalGross).toFixed(2) | currency }}
          </h3>
        </div>

        <div class="d-flex justify-space-between align-center">
          <h4>
            Total Fees:
          </h4>
          <h3>
            {{ Number(totalFee).toFixed(2) | currency }}
          </h3>
        </div>

        <v-divider class="my-1"></v-divider>

        <div class="d-flex justify-space-between align-center">
          <h4>
            Total Net:
          </h4>
          <h3>
            {{ Number(totalNet).toFixed(2) | currency }}
          </h3>
        </div>

        <div class="d-flex justify-space-between align-center">
          <h4>
            Total Tax:
          </h4>
          <h3>
            {{ Number(totalTax).toFixed(2) | currency }}
          </h3>
        </div>

        <v-divider class="my-1"></v-divider>
        <div class="d-flex justify-space-between align-center">
          <h4>
            Actual Sales:
          </h4>
          <h2>
            {{ Number(totalActual).toFixed(2) | currency }}
          </h2>
        </div>
      </v-col>
      <!--Right Side-->
      <v-col>
        <v-tooltip top color="grey lighten-3 black--text">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="d-flex justify-space-between align-center"
            >
              <div class="d-flex justify-space-between align-center mr-1">
                <h5 class="mr-1">
                  <v-icon small class="mb-1 mr-1">fa fa-question-circle</v-icon
                  >Rows To Starting#:
                </h5>
                <h3>{{ shippingObligations.rowsToThreshold }}</h3>
              </div>
              <div class="d-flex justify-space-between align-center ml-1">
                <h5 class="mr-1">Rows After:</h5>
                <h3>{{ shippingObligations.rowsAfterThreshold }}</h3>
              </div>
            </div>
          </template>
          <div class="text-center subtitle-1">
            <div class="subtitle-2">
              Rows for Gross Sum to be greater than Starting#
            </div>
          </div>
        </v-tooltip>

        <v-divider class="my-1"></v-divider>

        <v-tooltip top color="grey lighten-3 black--text">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="d-flex justify-space-between align-center"
            >
              <h4>
                <v-icon small class="mb-1">fa fa-question-circle</v-icon>
                Shipping Cost:
              </h4>
              <h3>
                {{ Number(shippingCosts).toFixed(2) | currency }}
              </h3>
            </div>
          </template>
          <div class="text-center title">
            <div>(Rows After * Shipping Cost)</div>
            <div>
              {{ shippingObligations.rowsAfterThreshold }} *
              {{ shippingCost }} = {{ Number(shippingCosts).toFixed(2) }}
            </div>
          </div>
        </v-tooltip>

        <v-divider class="my-1"></v-divider>

        <v-tooltip top color="grey lighten-3 black--text">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="d-flex justify-space-between align-center"
            >
              <h4>
                <v-icon small class="mb-1">fa fa-question-circle</v-icon>
                Actual-Starting#-Shipping
              </h4>
              <h3>
                {{ Number(salesMinusShipping).toFixed(2) | currency }}
              </h3>
            </div>
          </template>
          <div class="text-center title">
            <div>(Actual - Starting# - Shipping)</div>
            <div>
              {{ totalActual }} - {{ salesFloor }} -
              {{ Number(shippingCosts).toFixed(2) }} =
              {{ Number(salesMinusShipping).toFixed(2) }}
            </div>
          </div>
        </v-tooltip>

        <v-divider class="my-1"></v-divider>

        <v-slide-y-reverse-transition mode="out-in">
          <div class="" :key="commishResult">
            <v-tooltip top color="grey lighten-3 black--text">
              <template v-slot:activator="{ on, attrs }">
                <div
                  v-bind="attrs"
                  v-on="on"
                  class="d-flex justify-space-between align-center"
                >
                  <h4>
                    <v-icon small class="mb-1">fa fa-question-circle</v-icon>
                    Commish Result
                  </h4>
                  <h1 class="green--text">
                    {{ Number(commishResult).toFixed(2) | currency }}
                  </h1>
                </div>
              </template>
              <div class="text-center title">
                <div>((Actual - Starting# - Shipping) * Commish % )</div>
                <div>
                  ({{ totalActual }} - {{ salesFloor }} - {{ shippingCosts }} )
                  * {{ commishPercent }} =
                  {{ Number(commishResult).toFixed(2) }}
                </div>
              </div>
            </v-tooltip>
          </div>
        </v-slide-y-reverse-transition>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  props: {
    salesFloor: [Number],
    shippingCost: [Number],
    totalResults: [Number],
    totalFee: [Number],
    totalTax: [Number],
    totalGross: [Number],
    totalNet: [Number],
    shippingObligations: {
      type: [Boolean, Object],
      default: false
    },
    commishPercent: [Number]
  },
  computed: {
    shippingCosts() {
      return this.shippingObligations.rowsAfterThreshold * this.shippingCost;
    },
    salesMinusShipping() {
      return this.totalActual - this.salesFloor - this.shippingCosts;
    },
    commishResult() {
      return this.salesMinusShipping * this.commishPercent;
    },
    totalActual() {
      return this.totalNet - this.totalTax;
    }
  }
};
</script>

<style scoped></style>
