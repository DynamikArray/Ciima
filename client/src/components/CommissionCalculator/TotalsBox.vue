<template>
  <v-alert type="success" class="">
    <v-row>
      <!--Left Side-->
      <v-col>
        <div class="d-flex justify-space-between align-center">
          <h4>
            Total Rows after Filter:
          </h4>
          <h3>
            {{ totalResults }}
          </h3>
        </div>
        <div class="d-flex justify-space-between align-center">
          <h4>
            Total Gross:
          </h4>
          <h3>
            {{ totalGross }}
          </h3>
        </div>
        <div class="d-flex justify-space-between align-center">
          <h4>
            Total Net:
          </h4>
          <h3>
            {{ totalNet }}
          </h3>
        </div>

        <div class="d-flex justify-space-between align-center">
          <h4>
            Total Fees:
          </h4>
          <h3>
            {{ totalFee }}
          </h3>
        </div>
      </v-col>
      <!--Right Side-->
      <v-col>
        <div class="d-flex justify-space-between align-center">
          <h4>
            Shipping:
          </h4>
          <h3>Rows To Floor: {{ shippingObligations.rowsToThreshold }}</h3>
          <h3>Rows After: {{ shippingObligations.rowsAfterThreshold }}</h3>
        </div>

        <div class="d-flex justify-space-between align-center">
          <h4>
            Shipping Cost:
          </h4>
          <h3>
            {{ Number(shippingCosts).toFixed(2) }}
          </h3>
        </div>

        <div class="d-flex justify-space-between align-center">
          <h4>
            Sales Floor
          </h4>
          <h3>
            {{ Number(salesFloor).toFixed(2) }}
          </h3>
        </div>

        <div class="d-flex justify-space-between align-center">
          <h4>
            Sales Floor - Shipping Costs
          </h4>
          <h3>
            {{ Number(salesMinusShipping).toFixed(2) }}
          </h3>
        </div>

        <div class="d-flex justify-space-between align-center">
          <h4>
            Commish Result
          </h4>
          <h3>
            {{ Number(commishResult).toFixed(2) }}
          </h3>
        </div>
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
      return this.totalNet - this.salesFloor - this.shippingCosts;
    },
    commishResult() {
      return this.salesMinusShipping * this.commishPercent;
    }
  }
};
</script>

<style scoped></style>
