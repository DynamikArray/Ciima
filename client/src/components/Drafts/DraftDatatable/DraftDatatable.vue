<template>
  <div>
    <DraftsDatatableHeader
      :onSelect="fetchDraftsWithParams"
      :showAllUsers.sync="showAllUsers"
      :status.sync="status"
      title="Drafts"
      icon="fa-list-alt"
    ></DraftsDatatableHeader>

    <v-data-table
      v-if="drafts"
      :headers="headers"
      :items="drafts"
      item-name="id"
      :loading="loading"
      loading-text="Loading..."
      :items-per-page="15"
      show-select
      @input="itemSelected"
      :footer-props="footerProps"
      v-model="selectedItems"
    >
      <!--IMAGE COLUMN-->
      <template v-slot:item.main_image="{ item }">
        <div v-if="item.main_image !== 'false'">
          <ImagesHoverOver
            :imageFull="item.main_image"
            :imageThumb="item.main_image"
          />
        </div>
        <div v-else>
          <v-icon>fa-exclamation-triangle</v-icon>
        </div>
      </template>

      <!--DETAIL COLUMN-->

      <template v-slot:item.inventoryTitle="{ item }">
        <div class="d-flex align-center">
          <div class="d-flex align-center grow mx-3 long-and-truncated">
            <div class="d-flex flex-column">
              <div class="d-flex align-center">
                {{ item.inventoryTitle }}
              </div>
              <div class="d-flex align-center">
                <h5 class="mr-2">Issues: {{ item.issueNumbers }}</h5>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:item.ownerId="{ item }">
        <div class="d-flex align-center">
          <div class="d-flex align-center grow mx-3 long-and-truncated">
            <div class="d-flex flex-column">
              <div class="d-flex align-center">
                <avatar
                  v-if="item.ownerName"
                  :username="item.ownerName"
                  :size="40"
                ></avatar>
                <div class="text-center w-100" v-if="!item.ownerName">
                  No User
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:item.createdDate="{ item }">
        <div class="d-flex align-center">
          <span class="caption">{{ item.createdDate | dateTime }}</span>
        </div>
      </template>

      <!--ACTION COLUMN-->
      <template v-slot:item.action="{ item }">
        <div class="d-flex justify-center align-center mx-1">
          <div
            v-if="item.status === 'Open'"
            class="d-flex justify-center align-center"
          >
            <v-chip
              class="mx-5"
              label
              color="primary"
              @click="confirmSubmit(item.id)"
            >
              <v-icon small>fa-upload</v-icon>
            </v-chip>

            <v-chip
              class="mx-5"
              label
              color="warning"
              @click="editItem(item.id)"
            >
              <v-icon small>fa-edit</v-icon>
            </v-chip>

            <v-chip class="mx-5" label color="red" @click="deleteItem(item.id)">
              <v-icon small>fa-times-circle</v-icon>
            </v-chip>
          </div>

          <div v-if="item.status === 'Pending'">
            <v-chip label color="warning">
              <v-icon small class="">fa-cog fa-spin</v-icon>
            </v-chip>
          </div>
          <div v-if="item.status === 'Submitted'">
            <v-chip label color="success">
              <v-icon small>fa-check-circle</v-icon>
            </v-chip>
          </div>
          <div v-if="item.status === 'Error'">
            <div class="d-flex justify-center align-center mx-1">
              <v-tooltip left :max-width="420" color="info">
                <template v-slot:activator="{ on }">
                  <v-chip label color="info" v-on="on">
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
        </div>
      </template>
    </v-data-table>

    <!--Table Record Actions -->
    <div v-if="status === 'Open'" class="my-3">
      <div class="d-flex justify-start">
        <div class="d-flex align-center">
          <v-btn class="warning" @click="withSelected"
            ><v-icon class="mr-2">fa-cloud-upload-alt</v-icon>Submit
            Drafts</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { headers } from "./config.js";
import { mapState } from "vuex";
import settings from "@/util/settings.js";
import DraftsDatatableHeader from "./DraftsDatatableHeader.vue";
import ImagesHoverOver from "@/components/Images/ImageHoverOver";

import avatar from "vue-avatar";

import {
  DELETE_DRAFT,
  OPEN_DRAFTS_FETCH,
  OPEN_DRAFTS_SUBMIT_DRAFT
} from "@/store/action-types";

export default {
  components: {
    DraftsDatatableHeader,
    ImagesHoverOver,
    avatar
  },
  data() {
    return {
      status: "Open",
      selectedItems: [],
      selected: false,
      showAllUsers: 0, //numeic bln
      imageSrc: false,
      imagePopup: false,
      headers,
      footerProps: {
        "items-per-page-options": [15, 30, 50, 100]
      }
    };
  },
  created() {
    const { status } = this;
    this.loadDrafts({ status });
  },
  computed: {
    ...mapState({
      loading: state => state.openDrafts.loading,
      drafts: state => state.openDrafts.items
    })
  },
  methods: {
    fetchDraftsWithParams(params = {}) {
      //defaults,
      const _params = {
        all: +this.showAllUsers,
        status: this.status,
        ...params
      };
      this.loadDrafts(_params);
    },
    loadDrafts(params = {}) {
      //const _params = { ...params, all: +this.showAllUsers };
      this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_FETCH}`, params);
    },
    showImageModal(imgSrc) {
      this.selected = imgSrc;
      this.imageSrc = imgSrc;
      this.imagePopup = true;
    },
    hideImageModal() {
      this.imagePopup = false;
    },
    makeStatusNotesKey() {
      return `${Date.now()}-${Math.random()}`;
    },
    makeNoteText(note) {
      return note;
    },

    editItem(id) {
      this.$router.push({ name: "draft.edit", params: { id } });
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

      this.fetchDraftsWithParams({});
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
        this.fetchDraftsWithParams();
      }, 500);

      //hack to let the message queue pick up mark a process status
      setTimeout(() => {
        this.fetchDraftsWithParams();
      }, 5000);
    },
    async withSelected() {
      if (!this.selectedItems.length > 0) {
        this.$toastr.w("Nothing to submit");
        return;
      }
      //confirm
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Submit the selected drafts?</h3>
        <p>You are about to submit all the selected drafts to Linnworks. Are you sure they are complete and you have selected the correct drafts to submit?</p>`,
        {
          title: "  Submit these drafts?"
        }
      );
      if (!confirm) return;

      this.selectedItems.forEach(item => {
        this.submitDraft(item.id, false);
      });
      this.$toastr.s("All items submitted!");
      this.selectedItems = [];
    },
    itemSelected(items) {
      this.selectedItems = items;
    }
  }
};
</script>

<style scoped>
.long-and-truncated {
  flex: 1;
  &,
  & > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
