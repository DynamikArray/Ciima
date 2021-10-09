<template>
  <section>
    <div>
      <span class="heading">Ebay Site Category:</span>
      <b class="ml-2">{{ categoryTitle }}</b>
    </div>
    <div class="d-flex flex-wrap">
      <div
        style=""
        class="d-flex flex-wrap justify-start mr-4 my-3 align-baseline"
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
    },
    value: {
      type: [Boolean, String]
    }
  },
  watch: {
    value: function(val) {
      if (val === null) this.resetLocalValues();
    }
  },
  data: () => ({
    loading: false,
    ebaySiteCategories: [],
    categoryLabel: false
  }),
  async created() {
    this.fetchCategory({ LevelLimit: 1 });
  },
  computed: {
    categoryTitle() {
      if (this.categoryLabel) {
        return this.categoryLabel.name + " " + this.categoryLabel.id;
      }
      return "";
    }
  },
  methods: {
    resetLocalValues() {
      this.ebaySiteCategories = [];
      this.categoryLabel = false;
      this.fetchCategory({ LevelLimit: 1 });
    },
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
        this.newLeafSelected(value);
      } else {
        this.newChildSelected(value);
        this.ebaySiteCategories = this.ebaySiteCategories.slice(0, parseInt(value.CategoryLevel));

        this.fetchCategory({
          CategoryParent: value.CategoryID,
          LevelLimit: parseInt(value.CategoryLevel) + 1
        });

        this.newChildSelected(value);
      }
    },
    newLeafSelected(value) {
      const catId = value.CategoryID;
      this.ebaySiteCategories.forEach((categoryLevel, index) => {
        //We need to drop all of categoryLevels below this one
        const thing = categoryLevel.find(category => category.CategoryID == catId);
        if (thing !== undefined) {
          this.ebaySiteCategories = this.ebaySiteCategories.slice(0, index + 1);
        }
      });
    },
    newChildSelected(value) {
      this.$emit("newChildSelected", value);
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
