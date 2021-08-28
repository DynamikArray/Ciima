<template>
  <div class="w-100 pa-3" style="height:100%; min-height:100%">
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h1 class="text-center my-0">
          <v-icon class="mr-2">fas fa-wrench</v-icon>Price Sync
        </h1>
      </div>
      <div class="d-flex flex-column align-self-center mr-4">
        <!--Filters -->
      </div>
    </div>
    <v-divider class="my-1"></v-divider>
    <div class="mb-10">
      <PriceSyncContainer />
    </div>
  </div>
</template>

<script>
import PriceSyncContainer from "@/components/PriceSync/PriceSyncContainer";
export default {
  components: {
    PriceSyncContainer
  },
  data: () => ({})
};
</script>

<style scoped></style>
