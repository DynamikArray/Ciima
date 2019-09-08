<template>
  <div>
    <v-dialog v-model="imagePopup" max-width="420px">
      <v-card>
        <v-card-title class="text-center justify-space-between">
          <h5>{{ selected.title }}</h5>
          <h5>{{ selected.fullIssue }}</h5>
        </v-card-title>
        <v-card-text class="text-center pa-2">
          <v-img :src="imageSrc" max-width="400" />
        </v-card-text>
        <v-divider class="my-3"></v-divider>
        <v-card-actions class="text-center justify-space-between">
          <v-btn color="primary" @click="addIssueToDraft(selected)"
            >Select</v-btn
          >
          <v-btn color="danger" @click="hideImageModal()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      v-if="issues"
      :headers="headers"
      :items="issues"
      :loading="loading"
      loading-text="Searching Database"
      :items-per-page="50"
    >
      <template v-slot:item.imageUrl="{ item }">
        <img
          :src="makeImageUrl(item)"
          width="70"
          class="ma-1"
          @click="showImageModal(item)"
        />
      </template>

      <template v-slot:item.title="{ item }">
        <div>{{ item.title }} | {{ item.fullIssue }}</div>
        <div>{{ item.coverDate }} |{{ item.coverArtist }}</div>
        <div>{{ item.storylines }}</div>
      </template>

      <template v-slot:item.action="{ item }">
        <div v-if="!inCurrentDraft(item)">
          <v-btn color="success" class="mx-2" @click="addIssueToDraft(item)">
            <v-icon>fa-plus-circle</v-icon>
          </v-btn>
        </div>
        <div v-else>
          <v-btn
            color="danger"
            class="mx-2"
            @click="removeIssueFromDraft(item)"
          >
            <v-icon>fa-minus-circle</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <div v-else>
      <h3 class="text-center">No Issues</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  CURRENT_DRAFT_ISSUE_ADD,
  CURRENT_DRAFT_ISSUE_REMOVE
} from "@/store/mutation-types.js";

export default {
  computed: {
    ...mapState({
      issues: state => state.issueSearch.items,
      loading: state => state.issueSearch.loading,
      draftIssues: state => state.currentDraft.issues
    })
  },
  data() {
    return {
      selected: false,
      imageSrc: false,
      imagePopup: false,
      headers: [
        {
          text: "Cover",
          value: "imageUrl",
          sortable: false,
          align: "center",
          width: "120"
        },
        {
          text: "Title",
          value: "title",
          sortable: true,
          align: "left"
        },
        {
          text: "Variant",
          value: "variation",
          sortable: true,
          align: "center"
        },
        {
          text: "Printing",
          value: "printing",
          sortable: true,
          align: "center"
        },
        {
          text: "FullIssue",
          value: "fullIssue",
          sortable: true,
          align: "center"
        },
        {
          text: "Actions",
          value: "action",
          sortable: false,
          align: "center"
        }
      ]
    };
  },
  methods: {
    makeImageUrl(item) {
      //// TODO: place this url in a config file
      return `http://searchlightcomics.com/${item.imageUrl}`;
    },
    showImageModal(item) {
      this.selected = item;
      this.imageSrc = this.makeImageUrl(item);
      this.imagePopup = true;
    },
    hideImageModal() {
      this.imagePopup = false;
    },
    inCurrentDraft(item) {
      const drafts = this.draftIssues;
      if (drafts.length > 0) {
        const doesExist = drafts.some(el => {
          return el.id === item.id;
        });
        return doesExist;
      }
      return false;
    },
    addIssueToDraft(item) {
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_ISSUE_ADD}`, item);
    },
    removeIssueFromDraft(item) {
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_ISSUE_REMOVE}`, item);
    }
  }
};
</script>

<style scoped></style>
