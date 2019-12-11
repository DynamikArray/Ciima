<template>
  <v-container fluid>
    <h1 class="display-1">Edit Draft</h1>
    <v-divider></v-divider>
    <EditDraftForm :id="id"></EditDraftForm>
  </v-container>
</template>

<script>
import EditDraftForm from "@/components/Draft/EditDraftForm";

export default {
  props: {
    id: {
      type: [Number, Boolean]
    }
  },
  created() {
    const { id } = this;
    //if we dont get an id send us back
    if (!id) this.$router.push({ name: "drafts" });
  },
  components: {
    EditDraftForm
  }
};
</script>

<style scoped></style>
