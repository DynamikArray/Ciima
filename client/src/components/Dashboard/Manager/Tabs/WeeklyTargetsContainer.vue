<template>
  <v-container fluid class="WeeklyTargetsContainer pt-0">
    <v-row no-gutters>
      <v-col>
        <div class="d-flex align-center justify-start"></div>
      </v-col>
    </v-row>

    <v-row no-gutters class="">
      <v-col>
        <div class="d-flex --justify-end justify-space-around align-center flex-wrap grey darken-4 mt-3 px-4">
          <div class=" my-3 d-flex align-center">
            <h4 class="mr-2">Actions:</h4>
            <v-btn class="green" @click="openNewUserTargetDialog"
              ><v-icon class="mr-2">fas fa-plus-circle</v-icon>Add User Target</v-btn
            >
          </div>

          <div class=" px-2 my-3">
            <WeekSelect class="" :startDate="getStartDate" :endDate="getEndDate" @changeWeek="weekSelected" allowWeekAhead />
          </div>
          <!--
            Move to a modal
            <div class="d-flex align-center justify-start">
            <FormWeeklyTarget />
            </div>
          -->
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col><v-divider class="my-3"/></v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <DatatableUserTargets :items="userTargetItems" :loading="userTargetItemsLoading" @refresh="fetchTargets" />
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col><v-divider /></v-col>
    </v-row>

    <CreateDialog @cancelDialog="closeNewUserTargetDialog" @success="dialogSuccess" @failure="" />
  </v-container>
</template>

<script>
import { today, weekStartDate, weekEndDate, weekDateRangeAsString } from "../../DashboardHelpers";

import { DASHBOARD_MANAGER_TARGETS_FETCH } from "@/store/action-types";
import { mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";

import WeekSelect from "@/components/Shared/Fields/WeekSelect";
import CreateDialog from "../Dialogs/CreateDialog";
import DatatableUserTargets from "../Datatable/DatatableUserTargets";

export default {
  name: "WeeklyTargetsContainer",
  components: {
    WeekSelect,
    CreateDialog,
    DatatableUserTargets
  },
  data: () => ({
    selectedUserDisplayName: false
  }),
  created() {
    this.startDate = weekStartDate(today);
    this.endDate = weekEndDate(today);
    this.fetchTargets();
  },
  computed: {
    ...mapFields("dashboard/manager/targets/targetForm", ["startDate", "endDate", "dialogVisible"]),
    ...mapGetters({
      userTargetItems: "dashboard/manager/targets/userTargetItems",
      userTargetItemsLoading: "dashboard/manager/targets/userTargetItemsLoading"
    }),
    getStartDate() {
      return weekStartDate(this.startDate);
    },
    getEndDate() {
      return weekEndDate(this.endDate);
    },
    dateRangeAsString() {
      return weekDateRangeAsString(this.getStartDate, this.getEndDate);
    }
  },
  methods: {
    weekSelected({ startDate, endDate }) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.fetchTargets();
    },
    openNewUserTargetDialog() {
      this.blnEditMode = false;
      this.dialogVisible = true;
    },
    closeNewUserTargetDialog() {
      this.dialogVisible = false;
    },
    dialogSuccess() {
      this.fetchTargets();
    },
    fetchTargets() {
      this.$store.dispatch(`dashboard/manager/targets/${DASHBOARD_MANAGER_TARGETS_FETCH}`, {
        startDate: this.getStartDate,
        endDate: this.getEndDate
      });
    }
  }
};
</script>

<style scoped></style>
