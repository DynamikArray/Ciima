<template>
  <div class="d-flex flex-column justify-start align-center w-100">
    <div class="d-flex flex-row justify-start align-start w-100">
      <div
        class="d-flex flex-row justify-space-between align-center w-100 h-100 py-2"
      >
        <OurTitle
          class="d-flex justify-start mx-4 w-100 my-2"
          :selectedTitle="ourSelectedTitle"
        />

        <SaveButton />

        <TheirTitle
          class="d-flex justify-start mx-4 w-100 my-2"
          :selectedTitle="theirSelectedTitle"
        />
      </div>
      <div class="d-flex flex-colum align-start justify-center h-100">
        <CancelButton />
      </div>
    </div>

    <!--BOTTOM ROW DIALOG MESSAGES-->
    <div class="d-flex flex-row align-center justify-center">
      <!--
      <v-alert dense type="warning" name="statusMessage" dismissible>
        This is the status or error messages if there are any or we need to tell
        the user anything
      </v-alert>
      -->
    </div>
    <!--BOTTOM ROW DIALOG MESSAGES-->
  </div>
</template>

<script>
import OurTitle from "./OurTitle";
import TheirTitle from "./TheirTitle";
import CancelButton from "./CancelButton";
import SaveButton from "./SaveButton";

export default {
  props: {
    ourSelectedTitle: [Boolean, Object],
    theirSelectedTitle: [Boolean, Object]
  },
  components: {
    OurTitle,
    TheirTitle,
    CancelButton,
    SaveButton
  }
};
</script>

<style scoped>
.rounded {
  border-radius: 3px;
}
</style>
