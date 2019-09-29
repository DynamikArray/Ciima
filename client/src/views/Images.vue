<template>
  <v-container>
    <h1><v-icon class="mr-2"> fa-image </v-icon>Create Main Product Photo</h1>
    <v-divider class="mb-3"></v-divider>
    <CreateImage></CreateImage>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import CreateImage from "@/components/Images/CreateImage.vue";

export default {
  components: {
    CreateImage
  },
  computed: {
    ...mapState({
      issues: state => state.currentDraft.issues
    })
  },
  created() {
    if (!this.issues.length) {
      this.$router.push({ name: "titles" });
    }
  }
};
</script>

<style scoped></style>
