<template>
  <div class="">
    <v-btn
      color="red"
      class="pa-0 textShadow"
      style="min-width:36px"
      @click="confirmDelete"
    >
      <v-icon small>fa fa-times-circle</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { DELETE_ISSUE_MATCH } from "@/store/action-types";

export default {
  props: {
    item: [Boolean, Object],
    getData: [Function]
  },
  methods: {
    async confirmDelete() {
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Delete Current Record?</h3>
        <p>This will delete the Issue Match and Prices on file.</p>`,
        {
          title: " Are you sure?"
        }
      );
      if (confirm) this.deletePriceMatch();
    },
    deletePriceMatch() {
      const id = this.item.ourIssueId;
      this.$store
        .dispatch(`pricematch/${DELETE_ISSUE_MATCH}`, id, {
          root: true
        })
        .then(res => {
          if (res.result) {
            if (res.result.affectedRows == 1) {
              this.$toastr.s("Record Deleted");
            } else if (res.result.affectedRows == 0) {
              this.$toastr.e("No rows were deleted, no match found.");
            } else {
              this.$toastr.e(
                `An unknown result occured: ${JSON.stringify(res.result)}`
              );
            }
            this.getData();
          }
        });
    }
  }
};
</script>

<style scoped></style>
