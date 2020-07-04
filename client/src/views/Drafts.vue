<template>
  <v-container fluid style="min-height:100%">
    <v-row>
      <v-col class="pt-0">
        <DraftsContainer class="" :isMobile="isMobile"></DraftsContainer>
      </v-col>
    </v-row>
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
