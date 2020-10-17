<template>
  <div>
    <span class="heading" v-text="label"></span>
    <v-select
      dense
      :placeholder="placeholder"
      :name="name"
      :hint="hint"
      :items="ebayStoreCategories"
      @input="onUpdate"
      :rules="rules"
    >
    </v-select>
  </div>
</template>

<script>
import { ebayStoreCategories } from "@/util/ebay/ebayStoreCategories.js";

export default {
  props: {
    rules: {
      type: [Array],
      default: () => []
    },
    label: {
      type: [String],
      default: "Ebay Store Category"
    },
    name: {
      type: [String]
    },
    placeholder: {
      type: [Boolean, String],
      default: "Select Ebay Store Category..."
    },
    hint: {
      type: [Boolean, String],
      default: "Select something please"
    },
    value: {
      type: [Boolean, String]
    }
  },
  data: () => ({
    ebayStoreCategories
  }),
  methods: {
    onUpdate(val) {
      this.$emit("update", { [this.name]: val });
    }
  }
};
</script>

<style scoped></style>
