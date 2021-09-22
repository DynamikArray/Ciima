<template>
  <div>
    <v-btn color="red" @click="confirmDelete"><v-icon small class="mr-2">fas fa-trash</v-icon>Delete</v-btn>
  </div>
</template>

<script>
import { DASHBOARD_MANAGER_TARGETS_FORM_DELETE } from "@/store/action-types";

export default {
  name: "ButtonDeleteUserTarget",
  props: {
    item: {
      type: [Object],
      default: {}
    }
  },
  methods: {
    async confirmDelete() {
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Delete Current Record?</h3>
        <p>This will delete the selected User Target Record, this cannot be undone. Are your sure you want to delete the record?</p>`,
        {
          title: "  Are you sure?"
        }
      );
      if (confirm) this.deleteUserTarget();
    },
    async deleteUserTarget() {
      const action = `dashboard/manager/targets/targetForm/${DASHBOARD_MANAGER_TARGETS_FORM_DELETE}`;
      const { result, error } = await this.$store.dispatch(action, {
        id: this.item.id
      });
      if (error && !result) {
        this.$toastr.e("ERROR:" + JSON.stringify(error));
        this.$emit("failure");
      }
      if (result && !error) {
        this.$toastr.s("SUCCESS:" + JSON.stringify(result));
        this.$emit("success");
      }
    }
  }
};
</script>

<style scoped></style>
