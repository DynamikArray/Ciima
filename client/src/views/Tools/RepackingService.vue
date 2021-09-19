<template>
  <div class="w-100 pa-3" style="height:100%; min-height:100%">
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h2>
          <v-icon class="mr-2">fas fa-archive</v-icon>Repacking Service
          <span class="subtitle-2">Pull items from inventory for Amazon</span>
        </h2>
      </div>
      <div class="d-flex flex-column align-self-center mr-4">
        <v-tabs v-model="tab" right center-active active-class="white--text" color="primary" id="repackingServiceTabs">
          <v-tab> <v-icon left>fas fa-search-dollar</v-icon>Search</v-tab>
          <v-tab> <v-icon left>far fa-clock</v-icon>Pending</v-tab>
          <v-tab> <v-icon left>fas fa-check-circle</v-icon>Completed</v-tab>
        </v-tabs>
      </div>
    </div>
    <v-divider class="my-1"></v-divider>
    <div class="mb-10">
      <RepackingServiceContainer :tab="tab" />
    </div>
  </div>
</template>

<script>
import RepackingServiceContainer from "@/components/RepackingService/RepackingServiceContainer";
export default {
  nameL: "RepackingServiceView",
  components: {
    RepackingServiceContainer
  },
  data: () => ({
    tab: 0
  })
};
</script>

<style scoped></style>
