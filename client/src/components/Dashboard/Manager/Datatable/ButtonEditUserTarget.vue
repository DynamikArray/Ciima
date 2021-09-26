<template>
  <div>
    <v-btn color="orange darken-2" @click="editUserTarget">
      <v-icon small class="mr-2">fas fa-edit</v-icon>
      Edit
    </v-btn>
  </div>
</template>

<script>
import { DASHBOARD_MANAGER_TARGETS_FORM_LOAD } from "@/store/mutation-types";

export default {
  name: "ButtonEditUserTarget",
  props: {
    item: {
      type: [Object],
      default: {}
    }
  },
  methods: {
    editUserTarget() {
      this.$store.commit(`dashboard/manager/targets/targetForm/${DASHBOARD_MANAGER_TARGETS_FORM_LOAD}`, {
        ...this.item,
        dialogVisible: true,
        blnEditMode: true
      });
    }
  }
};
</script>

<style scoped></style>
