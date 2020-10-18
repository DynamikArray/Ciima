<template>
  <div class="d-flex align-center flex-column mb-2">
    <div class="d-flex align-center justify-end">
      <h5 class="mt-0 mr-2 mb-1">Draft Type:</h5>
    </div>

    <div class="d-flex align-center justify-end">
      <v-select
        style="width:120px"
        solo
        hide-details
        dense
        default="Draft Type"
        @change="handleSelect"
        :value="draftType"
        :items="items"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    draftType: {
      type: [String],
      default: ""
    },
    getData: [Function]
  },
  data() {
    return {
      items: [
        { text: "All", value: "" },
        { text: "Gtcs", value: "gtcs" },
        { text: "Lots", value: "lots" },
        { text: "Sets", value: "sets" },
        { text: "Singles", value: "singles" },
        { text: "Adult", value: "adult" }
      ]
    };
  },
  methods: {
    handleSelect(draftType) {
      this.$parent.$emit("update:draftType", draftType);
      this.getData({ draftType });
    }
  }
};
</script>

<style scoped></style>
