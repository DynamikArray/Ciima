<template>
  <div v-if="firstIssue">
    <div v-if="prices.length > 0" class="ml-5 mt-1">
      <v-tooltip left :max-width="420" color="info">
        <template v-slot:activator="{ on }">
          <v-icon large v-on="on" class="textShadow" color="green">
            fa fa-dollar-sign
          </v-icon>
        </template>
        <div v-if="prices" class="w-100 text-center">
          <h4>Current Prices:</h4>
          <v-divider class="my-1"></v-divider>
          <div
            class="d-flex align-center justify-space-between w-100"
            v-for="price in prices"
          >
            <div class="mr-4 ml-1">
              {{ price.grade }}
            </div>
            <div class="ml-4 mr-1">
              {{ price.price | currency }}
            </div>
          </div>
        </div>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {},
  computed: {
    ...mapGetters({
      firstIssue: "currentDraft/getFirstIssue"
    }),
    prices() {
      if (!this.firstIssue) return false;
      return this.firstIssue.issuePrices;
    }
  }
};
</script>

<style>
#pricesWrapper .v-input__append-outer {
  margin: 0px !important;
}
</style>
