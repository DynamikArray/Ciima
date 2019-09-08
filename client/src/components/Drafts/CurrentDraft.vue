<template>
  <div class="pa-3">
    <v-card color="info">
      <v-card-text>
        <p>
          Title: <b v-if="selectedTitle">{{ selectedTitle.title }}</b>
        </p>
        <p>
          Publisher: <b v-if="selectedTitle">{{ selectedTitle.publisher }}</b>
        </p>

        <div v-if="draft.items">
          <div v-for="item in draft.items">
            <p>
              {{ item.title }}
            </p>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-divider class="my-3"></v-divider>

    <div>Items go here</div>
    <div>Items go here</div>
    <div>Items go here</div>
    <div>Items go here</div>
    <div>Items go here</div>
    <div>Items go here</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      selectedTitle: state => state.titleSearch.selected.item,
      draft: state => state.currentDraft
    })
  }
};
</script>

<style scoped></style>
