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
import { analyticDays } from "./daysList";

export default {
  props: {
    days: [Number, Boolean],
    getData: [Function],
    updateParam: [Function]
  },
  data() {
    return {
      items: analyticDays
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
