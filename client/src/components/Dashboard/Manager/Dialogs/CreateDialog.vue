<template>
  <div>
    <v-dialog :value="dialogVisible" max-width="650" persistent class="" overlay-opacity=".7">
      <div class="grey darken-4">
        <div class="d-flex justify-space-between primary pa-2 textShadow">
          <h2 class="white--text">{{ dialogTitle }} Weekly Target</h2>

          <v-btn icon @click="cancelDialog"><v-icon class="textShadow">fas fa-times-circle</v-icon></v-btn>
        </div>
        <div class="pa-2">
          <FormWeeklyTarget @cancelDialog="cancelDialog" @success="success" @failure="failure" />
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { DASHBOARD_TARGET_FORM_RESET } from "@/store/mutation-types";
import FormWeeklyTarget from "../Forms/FormWeeklyTarget";

export default {
  name: "CreateDialog",
  components: {
    FormWeeklyTarget
  },
  computed: {
    ...mapFields("dashboard/manager/targets/targetForm", ["dialogVisible", "blnEditMode"]),
    dialogTitle() {
      if (this.blnEditMode) return "Edit";
      return "Create New";
    }
  },
  methods: {
    cancelDialog() {
      this.$emit("cancelDialog");
      this.$store.commit(`dashboard/manager/targets/targetForm/${DASHBOARD_TARGET_FORM_RESET}`);
    },
    success() {
      this.$emit("success");
    },
    failure() {
      this.$emit("failure");
    }
  }
};
</script>

<style scoped></style>
