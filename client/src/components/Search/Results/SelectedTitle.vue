<template>
  <v-card v-if="title">
    <v-card-title>
      <h3><span class="title mr-2">Title:</span>{{ title.title }}</h3>
    </v-card-title>
    <v-card-text>
      <div class="d-flex justify-space-between">
        <div class="d-flex">
          <h3 class="title">
            <span class="body-2 mr-2">Publisher:</span>{{ title.publisher }}
          </h3>
        </div>
        <div class="d-flex">
          <h3>
            <span class="title mr-2">Years Published:</span
            >{{ title.yearsPublished }}
          </h3>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      title: state => state.titleSearch.selected.item
    })
  }
};
</script>

<style scoped></style>
