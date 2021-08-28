<template>
  <div class="d-flex align-center justify-start pa-2 primary mb-3 textShadow">
    <div class="d-flex flex-1 flex-fill justify-space-between flex-wrap">
      <div class="d-flex align-center">
        <div class="d-flex justify-end align-center">
          <h4 class="mr-1">Score:</h4>
        </div>
        <div class="d-flex align-center justify-start">
          <h1 v-if="!isManager">{{ getCurrentScore | commaNumber }}</h1>
          <h1 v-if="isManager">{{ getCurrentDollars | currency }}</h1>
        </div>
      </div>
      <div class="d-flex align-center">
        <div class="d-flex flex-fill justify-end align-center">
          <h4 class="mr-1">Target:</h4>
        </div>
        <div class="d-flex align-center justify-start">
          <h3 v-if="!isManager">{{ getTargetScore | commaNumber }}</h3>
          <h3 v-if="isManager">{{ targetAmountInDollars | currency }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { dashboard as config } from "@/config";

export default {
  name: "CurrentWeekScore",
  props: {
    results: [Boolean, Array]
  },
  data: () => ({
    targetScore: config.targetScore,
    targetAmountInDollars: config.targetAmountInDollars
  }),
  computed: {
    ...mapGetters({
      isManager: "user/isManager"
    }),
    getTargetScore() {
      return this.targetScore;
    },
    getDollarConversion() {
      return this.targetScore / this.targetAmountInDollars;
    },
    getCurrentScore() {
      return Math.round(this.getCurrentDollars * this.getDollarConversion);
    },
    getCurrentDollars() {
      return this.results.reduce((acc, item) => {
        acc = parseFloat(acc) + parseFloat(item.totalPrice);
        return acc.toFixed(2);
      }, 0);
    }
  }
};
</script>

<style scoped></style>
