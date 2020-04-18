<template>
  <v-container fluid>
    <DraftsContainer :isMobile="isMobile"></DraftsContainer>
  </v-container>
</template>

<script>
import DraftsContainer from "@/components/Drafts/DraftsContainer";

export default {
  components: {
    DraftsContainer
  },
  data() {
    return {
      isMobile: window.innerWidth <= 1024
    };
  },
  created() {
    addEventListener("resize", () => {
      return (this.isMobile = window.innerWidth <= 1024);
    });
  }
};
</script>

<style scoped></style>
