<template>
  <div class="d-flex flex-wrap">
    <div
      style="min-width:260px"
      class="d-flex flex-wrap justify-start mr-4"
      v-for="(level, index) in ebaySiteCategories"
    >
      <v-select
        :key="index + 'categoryLevel'"
        :items="addLeafIndicator(level, index)"
        item-text="CategoryName"
        item-value="CategoryID"
        return-object
        @input="updateSelected"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    ebaySiteCategories: [],
    selected: [],
    finalCategory: false
  }),
  async created() {
    this.fetchCategory({ LevelLimit: 1 });
  },
  computed: {},
  methods: {
    addLeafIndicator(categories, index) {
      return categories
        .filter(cat => {
          if (index) return parseInt(cat.CategoryLevel) - 1 == index;
          return true;
        })
        .map(cat => {
          if (!cat.LeafCategory) {
            return { ...cat, CategoryName: `${cat.CategoryName}    [+]` };
          }
          return cat;
        });
    },
    updateSelected(value) {
      if (value.LeafCategory) {
        this.saveToParent(value);
      } else {
        this.ebaySiteCategories = this.ebaySiteCategories.slice(
          0,
          parseInt(value.CategoryLevel)
        );

        this.fetchCategory({
          CategoryParent: value.CategoryID,
          LevelLimit: parseInt(value.CategoryLevel) + 1
        });
      }
    },
    saveToParent(value) {
      const ebaySiteCategory = {
        id: value.CategoryID,
        name: value.CategoryName
      };
      this.$emit("categorySelected", { ebaySiteCategory });
    },
    async fetchCategory(params) {
      this.loading = true;
      try {
        const { result } = await this.$store.dispatch("api/requestHandler", {
          method: "get",
          url: "ebaySiteCategories",
          params
        });
        this.ebaySiteCategories.push(result);
      } catch (err) {
        throw err;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped></style>
