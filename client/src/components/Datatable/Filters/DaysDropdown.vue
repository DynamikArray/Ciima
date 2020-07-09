<template>
  <div class="d-flex align-center flex-row mb-2">
    <div class="d-flex align-center justify-end">
      <h5 class="mt-0 mr-2 mb-1">Days:</h5>
    </div>

    <div class="d-flex align-center justify-end">
      <v-select
        style="width:160px"
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
    days: [Number, Boolean],
    getData: [Function],
    updateParam: [Function]
  },
  data() {
    return {
      items: [
        { text: "Today", value: 0 },
        { text: "Yesterday", value: 1 },
        { text: "This Week", value: 5 },
        { text: "2 Weeks", value: 14 },
        { text: "Last 30", value: 30 },
        { text: "Last 45", value: 45 },
        { text: "Last 90", value: 90 },
        { text: "Last 180", value: 180 }
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
