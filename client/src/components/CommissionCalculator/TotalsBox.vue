<template>
  <v-alert type="success" class="">
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
  </v-alert>
</template>

<script>
export default {
  props: {
    totalResults: [Number],
    totalFee: [Number],
    totalGross: [Number],
    totalNet: [Number]
  }
};
</script>

<style scoped></style>
