<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <v-card-title class="headline primary">
        <div class="d-flex justify-space-between align-center w-100">
          <div class="d-flex"><v-icon class="mr-2">fa-bullhorn</v-icon> What's New</div>
          <div class="d-flex align-center">
            <h3 class="ml-auto my-1 mx-3">01/28/2020</h3>
          </div>
        </div>
      </v-card-title>

      <v-card-text class="pa-4">
        <Content />
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-checkbox v-model="blnShowAgain" :label="`Don't Show this again`" color="primary" class="mx-3"></v-checkbox>
        <v-spacer></v-spacer>
        <v-btn class="primary mx-3" text @click="handleOnClick">
          Ok, Got It.
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Content from "./Content/Update0005.vue";

const UPDATE_NUMBER = "whatsNew-updateNumber";
const SHOW_DIALOG = "whatsNew-showDialog";

export default {
  name: "whatsnew",
  props: {},
  components: {
    Content
  },
  created() {
    const cookieNumber = this.$cookies.get(UPDATE_NUMBER) || false;
    const cookieDialog = this.$cookies.get(SHOW_DIALOG) || 1;

    if (cookieNumber !== this.updateNumber) this.showDialog = true;
    if (cookieNumber === this.updateNumber) {
      if (Number(cookieDialog)) this.showDialog = true;
    }
  },
  data: () => ({
    blnShowAgain: false,
    showDialog: false,
    updateNumber: "0005"
  }),
  methods: {
    handleOnClick() {
      if (this.blnShowAgain) {
        this.$cookies.set(SHOW_DIALOG, 0);
      } else {
        this.$cookies.set(SHOW_DIALOG, 1);
      }
      this.$cookies.set(UPDATE_NUMBER, this.updateNumber);
      this.showDialog = false;
    }
  }
};
</script>

<style scoped></style>
