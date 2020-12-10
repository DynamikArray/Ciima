<template>
  <div class="w-100 pa-3" style="height:100%; min-height:100%">
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h3>
          <v-icon small class="mr-2">fas fa-boxes</v-icon>Linnworks Inventory
          <span class="subtitle-2">Search Linnworks Inventory</span>
        </h3>
      </div>
    </div>
    <v-divider class="my-1"></v-divider>
    <div class="pb-10" style="height:100%; min-height:100%">
      <LinnworksInventoryContainer />
    </div>
  </div>
</template>

<script>
import LinnworksInventoryContainer from "@/components/Inventory/Linnworks/LinnworksInventoryContainer";
export default {
  components: {
    LinnworksInventoryContainer
  }
};
</script>

<style scoped></style>
