<template>
  <div class="w-100 pa-3 h-100">
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h1 class="text-center my-0">
          Category Sales Reports
        </h1>
      </div>
      <div class="d-flex flex-column align-self-center mr-4">
        <v-tabs v-model="tab" right center-active active-class="white--text" color="primary" id="CategorySalesReports">
          <v-tab> <v-icon left>fa fa-calendar-day</v-icon>Daily</v-tab>
        </v-tabs>
      </div>
    </div>
    <v-divider class="my-1"></v-divider>
    <div class="mb-10">
      <CategorySalesReportContainer :tab="tab" v-if="isManager" />
      <div v-else class="w-100">
        <div class="d-flex flex-column align-center justify-center w-100">
          <div class="mt-10">
            <v-icon size="150">fa fa-exclamation-circle</v-icon>
          </div>
          <div>
            <div class="display-3 mt-2">Not Authorized</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CategorySalesReportContainer from "@/components/ReportsCategorySales/CategorySalesReportContainer.vue";
export default {
  components: {
    CategorySalesReportContainer
  },
  computed: {
    ...mapGetters({
      isManager: "user/isManager"
    })
  },
  data: () => ({
    tab: 0
  })
};
</script>

<style scoped></style>
