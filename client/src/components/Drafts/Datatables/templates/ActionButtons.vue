<template>
  <div class="d-flex justify-center align-center mx-0">
    <!--OPEN DRAFT OPTIONS -->
    <div
      v-if="item.status === 'Open'"
      class="d-flex justify-space-around align-center"
    >
      <v-btn xSmall color="warning" @click="editItem(item.id)" class="mx-1">
        <v-icon xSmall>fa-edit</v-icon>
      </v-btn>

      <v-btn xSmall color="red" @click="deleteItem(item.id)" class="mx-1">
        <v-icon xSmall>fa-times-circle</v-icon>
      </v-btn>
    </div>
    <!--END OPEN DRAFT OPTIONS -->

    <!--PENDING DRAFT OPTIONS -->
    <div v-if="item.status === 'Pending'">
      <v-chip label color="warning">
        <v-icon small class="">fa-cog fa-spin</v-icon>
      </v-chip>
    </div>
    <!--END PENDING DRAFT OPTIONS -->

    <!--SUBMITTED DRAFT OPTIONS -->
    <div v-if="item.status === 'Submitted'">
      <v-chip label color="success">
        <v-icon small>fa-check-circle</v-icon>
      </v-chip>
    </div>
    <!--END SUBMITTED DRAFT OPTIONS -->

    <!--ERROR DRAFT OPTIONS -->
    <div v-if="item.status === 'Error'">
      <div class="d-flex justify-center align-center mx-1">
        <v-tooltip left :max-width="420" color="info">
          <template v-slot:activator="{ on }">
            <v-chip small label color="info" v-on="on">
              <v-icon small>fa-exclamation-circle</v-icon>
            </v-chip>
          </template>
          <div v-if="item.statusNotes">
            <h3>Notes:</h3>
            <h4
              :key="makeStatusNotesKey()"
              v-html="makeNoteText(item.statusNotes)"
            ></h4>
          </div>
        </v-tooltip>

        <v-tooltip left :max-width="420" color="red">
          <template v-slot:activator="{ on }">
            <v-chip
              small
              v-on="on"
              class="mx-5"
              label
              color="red"
              @click="deleteItem(item.id)"
            >
              <v-icon small>fa-times-circle</v-icon>
            </v-chip>
          </template>
          <div>
            <h3>Delete Draft:</h3>
            <h4>Permenantly remove this draft from the database.</h4>
          </div>
        </v-tooltip>
      </div>
    </div>
    <!--END ERROR OPTIONS-->
  </div>
</template>

<script>
import { DELETE_DRAFT, OPEN_DRAFTS_SUBMIT_DRAFT } from "@/store/action-types";
export default {
  props: {
    getData: [Function],
    item: [Object]
  },
  methods: {
    makeStatusNotesKey() {
      return `${Date.now()}-${Math.random()}`;
    },
    makeNoteText(note) {
      return note;
    },

    editItem(id) {
      switch (this.item.draftType) {
        case "lots":
          this.$toastr.e("TELL BRI TO CREATE THE EDIT PAGE FOR LOT DRAFTS");
          break;
        default:
          this.$router.push({ name: "draft.edit", params: { id } });
          break;
      }
    },

    async deleteItem(id) {
      //add confirm
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Delete this current draft?</h3>
        <p>This will remove the draft. You cannot undo this operation. Are you sure you want to delete it?</p>`,
        {
          title: "  Delete this draft?"
        }
      );
      if (confirm) this.deleteDraft(id);
    },

    async deleteDraft(draftId) {
      await this.$store.dispatch(`deleteDraft/${DELETE_DRAFT}`, {
        draftId
      });

      this.getData({});
    },

    async confirmSubmit(draftId, toast = true) {
      //add confirm
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Submit the current draft?</h3>
        <p>This will submit draft to Linnworks. Are you sure it's complete?</p>`,
        {
          title: "  Submit this draft?"
        }
      );
      if (confirm) this.submitDraft(draftId, toast);
    },
    async submitDraft(draftId, toast = true) {
      //const loadDrafts = this.loadDrafts();
      let toastr = false;
      if (toast) toastr = this.$toastr || false;

      await this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_SUBMIT_DRAFT}`, {
        draftId,
        toastr
      });
      //hack to let the message queue pick up mark a process status
      setTimeout(() => {
        this.getData();
      }, 500);

      /*
      //hack to let the message queue pick up mark a process status
      setTimeout(() => {
        this.getData();
      },5000);
      */
    }
  }
};
</script>

<style scoped>
.v-btn {
  min-height: 26px;
  min-width: 20px !important;
}
</style>
