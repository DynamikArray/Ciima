<template>
  <div :class="`d-flex justify-${align} align-center mt-2`">
    <div class="d-flex flex-column justify-space-around align-center mx-3">
      <div class="d-flex justify-end align-center">
        <h5>{{ createPagerString }}</h5>
      </div>

      <div class="d-flex justify-end align-center" style="max-width:600px">
        <v-pagination
          :key="Date.now()"
          style="max-width:590px"
          :value="page"
          @input="handleInput"
          :length="pageCount"
          total-visible="7"
          prev-icon="fa-caret-left"
          next-icon="fa-caret-right"
        ></v-pagination>
      </div>
    </div>

    <div class="d-flex justify-end align-start">
      <PerPageDropdown
        :limit="limit"
        :getData="handlePerPageChange"
      ></PerPageDropdown>
    </div>
  </div>
</template>

<script>
import PerPageDropdown from "./PerPageDropdown";
export default {
  props: {
    align: {
      type: [String],
      default: "end"
    },
    limit: [Number],
    page: [Number],
    pageCount: [Number],
    pageLimit: [Number],
    rowsTotal: [Number],
    getData: [Function]
  },
  components: {
    PerPageDropdown
  },
  computed: {
    createPagerString() {
      const startCount = this.page * this.pageLimit + 1 - this.pageLimit;
      let endCount = 0;
      if (this.page == Math.ceil(this.rowsTotal / this.pageLimit)) {
        endCount = this.rowsTotal;
      } else {
        endCount = this.page * this.pageLimit;
      }

      return `Results ${startCount} to ${endCount} of ${this.rowsTotal} total`;
    }
  },
  methods: {
    handleInput(page) {
      this.getData({ page });
    },
    handlePerPageChange(limit) {
      this.$emit("update:limit", limit);
      this.getData({ limit });
    }
  }
};
</script>

<style scoped></style>
