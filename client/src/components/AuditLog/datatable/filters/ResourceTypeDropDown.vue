<template>
  <div class="d-flex align-center flex-row mb-2">
    <div class="d-flex align-center justify-end">
      <h5 class="mt-0 mr-2 mb-1">Type:</h5>
    </div>

    <div class="d-flex align-center justify-end">
      <v-select
        style="width:150px"
        solo
        hide-details
        dense
        @change="handleSelect"
        :value="resourceType"
        :items="items"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resourceType: [String, Boolean],
    getData: [Function],
    updateParam: [Function]
  },
  data() {
    return {
      items: [
        { text: "All Types", value: "ALL" },
        { text: "Draft", value: "DRAFT" },
        { text: "Inventory", value: "INVENTORY" },
        { text: "Linnworks", value: "LINNWORKS" }
      ]
    };
  },
  methods: {
    handleSelect(resourceType) {
      this.getData({ resourceType });
      this.updateParam({ resourceType });
    }
  }
};
</script>

<style scoped></style>
