<template>
  <div class="w-100 d-flex align-center justify-space-between">
    <ItemTextFieldPrice
      class="mr-2 d-flex"
      :itemValue.sync="item.RetailPrice"
      :itemId="item.pkStockItemID"
      :locationId="item.LocationId"
      :unlocked="unlocked"
      fieldName="RetailPrice"
      fieldId="RetailPrice"
      fieldLabel="Retail Price"
      fieldHint="Retail Price"
      @hasChanges="hasChanges"
      :rules="rules.retailPrice"
    />
  </div>
</template>

<script>
import ItemTextFieldPrice from "./ItemTextFieldPrice";
export default {
  props: {
    item: { type: [Boolean, Object] },
    unlocked: { type: [Boolean], default: false },
    rules: { type: [Boolean, Object, Array] }
  },
  components: {
    ItemTextFieldPrice
  },
  methods: {
    hasChanges(bln) {
      this.$emit("hasChanges", bln);
    }
  }
};
</script>

<style scoped></style>
