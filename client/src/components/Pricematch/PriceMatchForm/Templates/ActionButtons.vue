<template>
  <div class="d-flex flex-column align-center justify-center">
    <div class="d-flex align-center justify-center my-3" v-if="isCreate">
      <v-btn
        color="success"
        :disabled="!isEnabled"
        @click="saveIssueMatch()"
        v-shortkey.once="{
          enter: ['ctrl', 'enter']
        }"
        @shortkey="saveIssueMatch()"
        ><v-icon small class="mr-3">fa fa-save</v-icon>Save Match <br />
        (Ctrl+Enter)</v-btn
      >
    </div>
    <div class="d-flex align-center justify-center my-3" v-if="isUpdate">
      <v-btn
        color="warning"
        :disabled="!isEnabled"
        @click="confirmUpdateIssueMatch()"
        v-shortkey.once="{
          enter: ['ctrl', 'enter']
        }"
        @shortkey="confirmUpdateIssueMatch()"
        ><v-icon small class="mr-3">fa fa-edit</v-icon>Update Match <br />
        (Ctrl+Enter)</v-btn
      >
    </div>
  </div>
</template>

<script>
import { SAVE_ISSUE_MATCH, UPDATE_ISSUE_MATCH } from "@/store/action-types";

import { buildCreateTitleMatchFields } from "@/util/pricematch/buildCreateTitleMatchFields";

export default {
  props: {
    theirSelectedTitle: [Boolean, Object],
    theirSelectedIssue: [Boolean, Object],
    ourSelectedIssue: [Boolean, Object]
  },
  computed: {
    isEnabled() {
      if (this.ourSelectedIssue && this.theirSelectedIssue) return true;
      return false;
    },
    isCreate() {
      if (!this.ourSelectedIssue.hasMatch) return true;
    },
    isUpdate() {
      if (this.ourSelectedIssue.hasMatch) return true;
    }
  },
  methods: {
    /**
     * [confirmUpdateIssueMatch description]
     * @return {Promise} [description]
     */
    async confirmUpdateIssueMatch() {
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Update existing Issue Match?</h3>
        <p>There is already an existing Issue Match Record. This will overwrite the existing Issue Match record and update all the fields including prices.</p>`,
        {
          title: " Are you sure?"
        }
      );
      if (confirm) this.updateIssueMatch();
    },

    /**
     * [updateIssueMatch description]
     * @return {[type]} [description]
     */
    updateIssueMatch() {
      const params = buildCreateTitleMatchFields(
        this.ourSelectedIssue,
        this.theirSelectedIssue,
        this.theirSelectedTitle
      );

      this.$store
        .dispatch(`pricematch/${UPDATE_ISSUE_MATCH}`, params, {
          root: true
        })
        .then(({ result, error }) => {
          if (result) {
            if (result.affectedRows == 1) {
              this.$toastr.Add({
                timeout: 1500,
                name: "issueMatchUpdate",
                title: "SUCCESS!",
                msg: "Issue Match Updated!",
                preventDuplicates: true
              });

              this.$store.dispatch(
                `pricematch/ourData/${UPDATE_ISSUE_MATCH}`,
                params,
                { root: true }
              );
            }
          }
          if (error) this.$toastr.e(error);
        })
        .catch(err => {
          this.$toastr.e(err.message);
        });
    },

    /**
     * [saveIssueMatch description]
     * @return {[type]} [description]
     */
    saveIssueMatch() {
      const params = buildCreateTitleMatchFields(
        this.ourSelectedIssue,
        this.theirSelectedIssue,
        this.theirSelectedTitle
      );

      this.$store
        .dispatch(`pricematch/${SAVE_ISSUE_MATCH}`, params, {
          root: true
        })
        .then(({ result, error }) => {
          if (result) {
            if (result.affectedRows == 1) {
              this.$toastr.Add({
                timeout: 1500,
                name: "issueMatchSaved",
                title: "SUCCESS!",
                msg: "Issue Match Saved!",
                preventDuplicates: true
              });

              this.$store.dispatch(
                `pricematch/ourData/${UPDATE_ISSUE_MATCH}`,
                params,
                { root: true }
              );
            }
          }
          if (error) this.$toastr.e(error);
        })
        .catch(err => {
          this.$toastr.e(err.message);
        });
    }
  }
};
</script>

<style scoped></style>
