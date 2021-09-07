<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="repackingServiceActionButtons" :key="`transition_actionButtons_${keyString}`" :class="fontClass">
      <div>
        <v-btn :disabled="disabled" @click="confirmSubmitAction" color="green darken-1" class="textShadow">Submit</v-btn>
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  name: "BtnSubmitToPending",
  props: {
    keyString: {
      type: [String]
    },
    item: {
      type: [Object]
    },
    fontClass: {
      type: [String],
      default: ""
    },
    disabled: {
      type: [Boolean],
      deafult: true
    }
  },
  methods: {
    async confirmSubmitAction() {
      //add confirm
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Complete Repacking?</h3>
        <p>This will mark out the item as Completed, and is now safe to repack for Amazon.</p>`,
        {
          title: "  Zero Out in Inventory"
        }
      );
      if (confirm) this.finalizeRepacking();
    },
    finalizeRepacking() {
      this.$emit("submitItem", { pkStockItemID: this.item.pkStockItemID, sku: this.item.ItemNumber });
    }
  }
};
</script>

<style scoped></style>
