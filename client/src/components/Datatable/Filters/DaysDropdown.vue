<template>
  <div class="d-flex align-center flex-row mb-2">
    <div class="d-flex align-center justify-end">
      <h5 class="mt-0 mr-2 mb-1">Days:</h5>
    </div>

    <div class="d-flex align-center justify-end">
      <v-select
        style="width:130px"
        solo
        hide-details
        dense
        @change="handleSelect"
        :value="days"
        :items="items"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    days: [String, Number, Boolean],
    getData: [Function],
    updateParam: [Function]
  },
  data() {
    return {
      items: [
        { text: "1 Day", value: 1 },
        { text: "3 Days", value: 3 },
        { text: "5 Days", value: 5 },
        { text: "7 Days", value: 7 },
        { text: "14 Days", value: 14 },
        { text: "30 Days", value: 30 },
        { text: "45 Days", value: 45 },
        { text: "90 Days", value: 90 },
        { text: "180 Days", value: 180 }
      ]
    };
  },
  methods: {
    handleSelect(days) {
      this.getData({ days });
      this.updateParam({ days });
    }
  }
};
</script>

<style scoped></style>
