<template>
  <div>
    <div class="d-flex w-100">
      <div v-if="!showCategoryLookup" class="d-flex w-100">
        <v-text-field
          disabled
          dense
          :value="ebayCategoryName"
          name="ebaySiteCategoryId"
          outlined
          label="Search ebay categories"
          :rules="rules.ebaySiteCategoryId"
        >
        </v-text-field>
        <v-btn color="primary" class="mx-2" @click="showCategoryLookup = true">
          <v-icon class="mr-1">fa fa-search</v-icon>Change
        </v-btn>
      </div>
      <div v-if="showCategoryLookup" class="d-flex w-100">
        <EbayCategoryDropdown @categorySelected="updateLocalParams" :value="value" :rules="rules.ebaySiteCategoryId" />
      </div>
    </div>
  </div>
</template>

<script>
import EbayCategoryDropdown from "./EbayCategoryDropdown";

export default {
  props: {
    rules: {
      type: [Array],
      default: () => []
    },
    value: {
      type: [Boolean, String]
    }
  },
  components: {
    EbayCategoryDropdown
  },
  async created() {
    await this.fetchCategory({
      CategoryParent: this.value,
      LevelLimit: 99
    });
  },
  data: () => ({
    ebayCategoryName: "",
    showCategoryLookup: false
  }),
  methods: {
    updateLocalParams(value) {
      this.$emit("categorySelected", value);
    },
    async fetchCategory(params) {
      this.loading = true;
      try {
        const { result } = await this.$store.dispatch("api/requestHandler", {
          method: "get",
          url: "ebaySiteCategories",
          params
        });

        this.ebayCategoryName = result.CategoryName;
      } catch (err) {
        throw err;
      } finally {
        this.loading = false;
        return false;
      }
    }
  }
};
</script>

<style scoped></style>
