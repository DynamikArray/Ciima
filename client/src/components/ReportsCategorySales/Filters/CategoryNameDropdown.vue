<template>
  <div class="d-flex align-center flex-column mb-2">
    <div class="d-flex align-center justify-end">
      <h5 class="mt-0 mr-2 mb-1">Lot Type:</h5>
    </div>

    <div class="d-flex align-center justify-end">
      <v-select
        style="width:120px"
        solo
        hide-details
        dense
        :default="fieldLabel"
        @change="handleSelect"
        :value="fieldValue"
        :items="items"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fieldName: [String],
    fieldLabel: [String],
    fieldValue: {
      type: [String],
      default: ""
    },
    getData: [Function]
  },
  data() {
    return {
      items: [
        { text: "Lots", value: "EBAY-LOTS" },
        { text: "Sets", value: "EBAY-SETS" },
        { text: "Singles", value: "EBAY-SINGLES" },
        { text: "Adult", value: "EBAY-ADULT" },
        { text: "Gtcs", value: "EBAY-GTCS" }
      ]
    };
  },
  methods: {
    handleSelect(lotType) {
      this.getData({ [this.fieldName]: lotType });
    }
  }
};
</script>

<style scoped></style>
