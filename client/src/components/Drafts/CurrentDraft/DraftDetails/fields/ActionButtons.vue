<template>
  <div class="d-flex">
    <v-btn :loading="draft.savingDraft" color="success" @click="saveDraft"
      ><v-icon class="mr-2">fa-save</v-icon>Save</v-btn
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CURRENT_DRAFT_SAVE } from "@/store/action-types.js";

export default {
  computed: {
    ...mapState({
      draft: state => state.currentDraft
    })
  },
  methods: {
    saveDraft() {
      const draft = this.draft;
      this.$store.dispatch(`currentDraft/${CURRENT_DRAFT_SAVE}`, draft);
    }
  }
};
</script>

<style scoped></style>
