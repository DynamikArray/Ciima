<template>
  <v-container fluid style="min-height:100%" id="inventoryMainWrapper">
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h3>
          <v-icon small class="mr-2">fas fa-boxes</v-icon>Linnworks Inventory
          <span class="subtitle-2">Search Linnworks Inventory</span>
        </h3>
      </div>
      <div class="d-flex flex-column align-self-center mr-4">
        <!--LINKS PLACEHOLDER-->
      </div>
    </div>
    <v-divider class="my-2"></v-divider>
    <div class="mb-10">
      <LinnworksInventoryContainer :isMobile="isMobile" />
    </div>
  </v-container>
</template>

<script>
import LinnworksInventoryContainer from "@/components/Inventory/Linnworks/LinnworksInventoryContainer";
export default {
  components: {
    LinnworksInventoryContainer
  },
  data() {
    return {
      //isMobile: document.documentElement.clientWidth <= 1024
      isMobile: window.innerWidth <= 1024
    };
  },
  created() {
    addEventListener("resize", () => {
      //console.log("resized");
      //return (this.isMobile = document.documentElement.clientWidth <= 1024);
      return (this.isMobile = window.innerWidth <= 1024);
    });
  }
};
</script>

<style scoped>
#inventoryMainWrapper {
  height: 100% !important;
}
</style>
