<template>
  <section>
    <div>
      <span class="heading">Ebay Site Category:</span>
      <b>{{ categoryLabel.name }} {{ categoryLabel.id }}</b>
    </div>
    <div class="d-flex flex-wrap mt-2">
      <div
        style=""
        class="d-flex flex-wrap justify-start mr-4 align-baseline"
        v-for="(level, index) in ebaySiteCategories"
      >
        <v-select
          hide-details
          :label="`Category Level L${index + 1}`"
          outlined
          :key="index + 'categoryLevel'"
          :items="addLeafIndicator(level, index)"
          item-text="CategoryName"
          item-value="CategoryID"
          return-object
          @input="updateSelected"
          :rules="rules"
        >
        </v-select>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    rules: {
      type: [Array],
      default: () => []
    }
  },
  data: () => ({
    loading: false,
    ebaySiteCategories: [],
    selected: [],
    categoryLabel: false
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
      this.categoryLabel = ebaySiteCategory;

      this.$emit("categorySelected", { ebaySiteCategoryId: value.CategoryID });
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
