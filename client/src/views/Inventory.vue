<template>
  <v-container>
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h5 class="text-center mt-2 display-3">
          Linnworks Inventory
        </h5>
      </div>
      <div class="d-flex flex-column align-self-center mr-4">
        &nbsp;
      </div>
    </div>
    <v-divider class="my-3"></v-divider>
    <InventoryTable />
  </v-container>
</template>
<script>
import InventoryTable from "@/components/Inventory/InventoryTable/InventoryTable";
export default {
  components: {
    InventoryTable
  }
};
</script>

<style scoped></style>
