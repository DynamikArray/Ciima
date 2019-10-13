<template>
  <v-card class="">
    <v-card-text class="py-0">
      <div class="d-flex justify-start">
        <div class="d-flex align-center">
          Filter Out Calculated Shipping:
        </div>
        <div class="d-flex align-center">
          <v-switch
            color="primary"
            class="mb-5"
            :v-model="ignoreCalc"
            @change="updateCalc"
            :label="ignoreCalc ? `Yes` : `No`"
            hide-details
          ></v-switch>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["ignoreCalcShipping"],
  data: () => ({
    ignoreCalc: true
  }),
  created() {
    this.ignoreCalc = this.ignoreCalcShipping;
  },
  watch: {
    ignoreCalcShipping: val => (this.ignoreCalc = val)
  },
  methods: {
    updateCalc() {
      this.$emit(`update:ignoreCalcShipping`, this.ignoreCalc);
    }
  }
};
</script>

<style scoped></style>
