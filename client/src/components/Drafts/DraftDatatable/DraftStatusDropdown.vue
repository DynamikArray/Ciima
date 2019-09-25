<template>
  <div class="d-flex justify-start mb-2">
    <div class="d-flex align-center">
      <h4 class="mx-0 mr-2">Status:</h4>
    </div>
    <div class="d-flex align-center">
      <v-select
        solo
        hide-details
        dense
        @change="handleSelect"
        v-model="selected"
        :items="items"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onSelect: [Function]
  },

  data() {
    return {
      selected: "Open",
      items: [
        {
          text: "Open",
          value: "Open"
        },
        {
          text: "Pending",
          value: "Pending"
        },
        {
          text: "Submitted",
          value: "Submitted"
        },
        {
          text: "Error",
          value: "Error"
        }
      ]
    };
  },

  methods: {
    handleSelect(val) {
      this.onSelect({ status: val });
    }
  }
};
</script>

<style scoped></style>
