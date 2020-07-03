<template>
  <div class="d-flex align-center flex-row mb-2">
    <div class="d-flex align-center justify-end">
      <h5 class="mt-0 mr-2 mb-1">User:</h5>
    </div>

    <div class="d-flex align-center justify-end">
      <v-select
        style="width:170px"
        solo
        hide-details
        dense
        @change="handleSelect"
        :value="userId"
        :items="items"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: [String, Number, Boolean],
    getData: [Function],
    updateParam: [Function]
  },
  created() {
    this.$store
      .dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/auditLog/userList",
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
        //console.log(resp);
      });
  },
  data() {
    return {
      items: [{ text: "All Users", value: "ALL" }]
    };
  },
  methods: {
    handleSelect(userId) {
      this.getData({ userId });
      this.updateParam({ userId });
    }
  }
};
</script>

<style scoped></style>
