<template>
  <v-container fluid class="ManagerDashboardContainer">
    <v-row no-gutters>
      <v-col>
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center justify-start">
            <h2 class="mb-2"><v-icon class="mr-2 mb-1">fa fa-user</v-icon>Manager Dashboard</h2>
          </div>

          <div class="d-flex align-center justify-end">
            <v-tabs v-model="tab" right center-active active-class="white--text" color="primary" id="repackingServiceTabs">
              <v-tab> <v-icon left>fas fa-chart-line</v-icon>User Metrics</v-tab>
              <v-tab> <v-icon left>fa-bullseye</v-icon>Weekly Targets</v-tab>
            </v-tabs>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col><v-divider /></v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <div class="d-flex align-start justify-start w-100">
          <v-tabs-items
            id="ManagerDashboardContainerTabs"
            :value="tab"
            class="w-100 d-flex flex-column align-self-stretch"
            style="background-color:transparent"
          >
            <v-tab-item key="managerDashboardUserMetrics" class="">
              <UserMetricsContainer :hasFocus="tab == 0" />
            </v-tab-item>

            <v-tab-item key="managerDashboardWeeklyTargets" class="">
              <WeeklyTargetsContainer :hasFocus="tab == 1" />
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserMetricsContainer from "./Tabs/UserMetricsContainer";
import WeeklyTargetsContainer from "./Tabs/WeeklyTargetsContainer";

export default {
  name: "ManagerDashboardContainer",
  components: {
    UserMetricsContainer,
    WeeklyTargetsContainer
  },
  data: () => ({
    tab: 0 //selected tab
  })
};
</script>

<style scoped></style>
