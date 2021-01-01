<template>
  <div class="w-100 pa-1">
    <div class="d-flex align-center justify-end">
      <div class="d-flex align-start justify-end py-1">
        <h3 class="ml-3">Hide Out Of Stock:</h3>
        <v-simple-checkbox
          label="Show In Stock Items Only"
          class="ma-0 py-0 px-3"
          dense
          hide-details
          color="primary"
          :value="inStockOnlyFilter"
          @input="handleCheckBoxInput"
          :ripple="false"
        ></v-simple-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalRows: {
      type: [Number, String],
      default: 0
    }
  },
  data: () => ({
    inStockOnlyFilter: false
  }),
  methods: {
    handleCheckBoxInput(value) {
      this.inStockOnlyFilter = value;
      this.$emit("inStockFilterUpdate", value);
    }
  }
};
</script>

<style scoped></style>
