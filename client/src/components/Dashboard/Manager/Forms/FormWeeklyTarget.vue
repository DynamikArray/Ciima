<template>
  <v-form ref="FormWeeklyTarget" v-model="validForm" @submit.prevent="submitForm" class="FormWeeklyTarget px-4 pb-3">
    <div class="d-flex flex-row mx-3 flex-wrap align-baseline justify-center">
      <h3>Week of: {{ startDate | date }} - {{ endDate | date }}</h3>
    </div>

    <div class="d-flex align-center justify-start">
      <UserSelect
        @userSelected="userSelected"
        :selectedUserId="userId || 0"
        componentClass="align-center"
        roleToSelect="inputter"
        labelText="User:"
        class="mx-4"
      />

      <div class="d-flex flex-row align-center justify-center">
        <div class="d-flex align-center justify-start flex-row mx-4">
          <div class="d-flex">
            <div class="mb-2 mr-2">
              <b>Target:</b>
            </div>
          </div>

          <div class="d-flex align-center justify-end">
            <v-text-field
              class="usersTargetValue pt-4"
              dense
              solo
              autocomplete="off"
              ref="usersTargetValue"
              persistent-hint
              :rules="rules.targetValue"
              v-model="targetValue"
              v-on:keyup.enter="submitForm"
              prepend-inner-icon="fas fa-dollar-sign"
            />
          </div>
        </div>
      </div>
    </div>

    <v-divider class="mb-4"></v-divider>

    <div class="d-flex justify-space-between">
      <div class="align-center justify-center">
        <v-btn @click="cancelDialog" color="red"><v-icon class="mr-2">fa fa-times-circle</v-icon>Cancel</v-btn>
      </div>
      <div class="align-center justify-center">
        <v-btn submit :disabled="isSaveDisabled" @click="submitForm" color="green"
          ><v-icon class="mr-2">fa fa-check-circle</v-icon>{{ buttonTitle }}</v-btn
        >
      </div>
    </div>
  </v-form>
</template>

<script>
import { DASHBOARD_MANAGER_TARGETS_FORM_ADD, DASHBOARD_MANAGER_TARGETS_FORM_EDIT } from "@/store/action-types";
import { mapFields } from "vuex-map-fields";
import { defaultFormFields } from "@/store/dashboard/manager/targets/targetForm";
import { fieldRules } from "@/store/dashboard/manager/targets/targetForm/fieldRules";

import { today, weekStartDate, weekEndDate, weekDateRangeAsString } from "../../DashboardHelpers";

//Fields
import UserSelect from "@/components/Shared/Fields/UserSelect";

const ER_DUP_ENTRY = "ER_DUP_ENTRY";

export default {
  name: "FormWeeklyTarget",
  components: {
    UserSelect
  },
  data: () => ({
    validForm: false,
    rules: fieldRules
  }),
  computed: {
    ...mapFields("dashboard/manager/targets/targetForm", [...defaultFormFields, "id"]),
    isSaveDisabled() {
      if (!this.userId || !this.targetValue) return true;
      return false;
    },
    buttonTitle() {
      if (this.blnEditMode) return "Update";
      return "Save";
    }
  },
  methods: {
    userSelected(val) {
      this.userId = val.userId;
      this.userName = val.userName;
    },
    cancelDialog() {
      this.$emit("cancelDialog");
    },
    validateForm() {
      //checks form fields
      const valid = this.$refs.FormWeeklyTarget.validate();
      return valid;
    },
    /**
     * [submitForm description]
     * @return {Promise} [description]
     */
    async submitForm() {
      if (!this.validateForm()) return false;

      let action = `dashboard/manager/targets/targetForm/${DASHBOARD_MANAGER_TARGETS_FORM_ADD}`;
      if (this.blnEditMode) action = `dashboard/manager/targets/targetForm/${DASHBOARD_MANAGER_TARGETS_FORM_EDIT}`;

      const { result, error } = await this.$store.dispatch(action, {
        id: this.id,
        userId: this.userId,
        startDate: weekStartDate(this.startDate),
        endDate: weekEndDate(this.endDate),
        targetValue: this.targetValue
      });
      if (error && !result) {
        this.$toastr.e("ERROR:" + JSON.stringify(error));
        this.$emit("failure");
      }
      if (result && !error) {
        this.$toastr.s("SUCCESS: " + JSON.stringify(result.affectedRows) + " row affected.");
        this.cancelDialog();
        this.$emit("success");
      }
    }
  }
};
</script>

<style>
.usersTargetValue input {
  padding: 0px;
  text-align: center;
}
</style>
