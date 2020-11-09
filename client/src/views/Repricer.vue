<template>
  <div class="w-100 pa-3" style="height:100%; min-height:100%">
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h2>
          <v-icon class="mr-2">fas fa-donate</v-icon>Repricing Service
          <span class="subtitle-2">View Repricing Service Items and Logs</span>
        </h2>
      </div>
      <div class="d-flex flex-column align-self-center mr-4">
        <v-tabs
          v-model="tab"
          right
          center-active
          active-class="white--text"
          color="primary"
          id="repricerTabs"
        >
          <v-tab> <v-icon left>fas fa-list-ul</v-icon>Need Repricing</v-tab>
          <v-tab> <v-icon left>fa fa-tasks</v-icon>Been Repriced</v-tab>
          <!-- <v-tab> <v-icon left>fa fa-sync-alt</v-icon>In Progress</v-tab> -->
        </v-tabs>
      </div>
    </div>
    <v-divider class="my-1"></v-divider>
    <div class="mb-10">
      <RepricerContainer :tab="tab" />
    </div>
  </div>
</template>

<script>
import RepricerContainer from "@/components/Repricer/RepricerContainer";
export default {
  components: {
    RepricerContainer
  },
  data: () => ({
    tab: 0
  })
};
</script>

<style scoped></style>
