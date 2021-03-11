<template>
  <div :key="`transition_action_field_${item.pkStockItemID}`">
    <v-btn color="success" class="my-2 pr-3" style="min-width:20px;" @click="selectItem(item.pkStockItemID)"
      ><v-icon class="">fa-edit</v-icon></v-btn
    >

    <v-btn
      v-if="item.CategoryName == 'EBAY-GTCS'"
      color="success"
      class="my-2 pr-3"
      style="min-width:20px;"
      @click="duplicateGTC(item.pkStockItemID)"
      ><v-icon class="">fa-clone</v-icon></v-btn
    >
  </div>
</template>

<script>
import { NEW_GTC_DRAFT_FROM_INVENTORY } from "@/store/action-types";

export default {
  props: {
    item: [Object, false]
  },
  methods: {
    selectItem(pkStockItemID) {
      this.$emit("itemSelected", pkStockItemID);
    },
    async duplicateGTC(item) {
      //add confirm
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Duplicate this current GTC inventory item?</h3>
        <p>This will duplicate all possible values, and take you to the GTC Draft form</p>`,
        {
          title: "  Duplicate this Item?"
        }
      );
      if (confirm) this.duplicateGTCFromInventory(item);
    },
    async duplicateGTCFromInventory(pkStockItemID) {
      await this.$store.dispatch(`gtcs/draft/${NEW_GTC_DRAFT_FROM_INVENTORY}`, pkStockItemID);
    }
  }
};
</script>

<style scoped></style>
