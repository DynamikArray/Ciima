<template>
  <div class="d-flex align-center flex-row mb-2">
    <div class="d-flex align-center justify-end">
      <h5 class="mt-0 mr-2 mb-1">Action:</h5>
    </div>

    <div class="d-flex align-center justify-end">
      <v-select
        style="width:270px"
        solo
        hide-details
        dense
        @change="handleSelect"
        :value="actionType"
        :items="items"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    actionType: [String, Boolean],
    getData: [Function],
    updateParam: [Function]
  },
  created() {
    this.$store
      .dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/auditLog/actionList",
          params: {},
          success: false,
          loading: false
        },
        { root: true }
      )
      .then(({ result }) => {
        if (result) {
          this.items = [...this.items, ...result];
        }
      });
  },
  data() {
    return {
      items: [{ text: "All Actions", value: "ALL" }]
    };
  },
  methods: {
    handleSelect(actionType) {
      this.getData({ actionType });
      this.updateParam({ actionType });
    }
  }
};
</script>

<style scoped></style>
