<template>
  <div class="d-flex align-center flex-column mb-2">
    <div class="d-flex align-center justify-end">
      <h5 class="mt-0 mr-2 mb-1">Status:</h5>
    </div>

    <div class="d-flex align-center justify-end">
      <v-select
        style="width:160px"
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
    draftStatus: {
      type: [String],
      default: "open"
    },
    getData: [Function]
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
    handleSelect(draftStatus) {
      this.$parent.$emit("update:draftStatus", draftStatus);
      this.getData({ status: draftStatus });
    }
  }
};
</script>

<style scoped></style>
