<template>
  <div class="d-flex align-center flex-column mb-2">
    <div class="d-flex align-center justify-end">
      <h5 class="mt-0 mr-2 mb-1">Per Page:</h5>
    </div>

    <div class="d-flex align-center justify-end">
      <v-select
        style="width:100px"
        solo
        hide-details
        dense
        default="Per Page"
        @change="handleSelect"
        :value="limit"
        :items="items"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    limit: [Number],
    getData: [Function]
  },
  data() {
    return {
      items: [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "15", value: 15 },
        { text: "30", value: 30 },
        { text: "50", value: 50 },
        { text: "100", value: 100 }
      ]
    };
  },
  methods: {
    handleSelect(limit) {
      this.getData(limit);
    }
  }
};
</script>

<style scoped></style>
