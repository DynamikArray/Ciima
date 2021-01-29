<template>
  <div class="w-100 d-flex align-center justify-space-between">
    <ItemTextFieldPrice
      class="mr-2 d-flex"
      :itemValue.sync="startingPrice"
      :itemId="itemId"
      :locationId="false"
      :unlocked="unlocked"
      fieldName="StartPrice"
      fieldId="StartPrice"
      fieldLabel="Start Price"
      fieldHint="Start Price"
      @hasChanges="hasChanges"
    />
  </div>
</template>

<script>
import ItemTextFieldPrice from "./ItemTextFieldPrice";
export default {
  props: {
    item: { type: [Object] },
    itemId: { type: [String] },
    startPrice: { type: [Boolean, Number, String] },
    unlocked: { type: [Boolean], default: false }
  },
  components: {
    ItemTextFieldPrice
  },
  computed: {
    startingPrice: {
      get: function() {
        return this.item.startPrice;
      },
      set: function(value) {
        this.item.startPrice = value;
      }
    }
  },
  methods: {
    hasChanges(bln) {
      this.$emit("hasChanges", bln);
    }
  }
};
</script>

<style scoped></style>
