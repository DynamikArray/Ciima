<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" persistent>
      <!-- Upload Button Trigger -->
      <template v-slot:activator="{ on, attrs }">
        <div class="d-flex align-center flex-column ">
          <div class="d-flex align-center justify-start">
            <h5 class="mt-0 mr-2 mb-1">Upload New File:</h5>
          </div>

          <div class="d-flex align-center justify-end w-100">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              <v-icon class="mr-2" small>fa fa-upload</v-icon>
              Upload
            </v-btn>
          </div>
        </div>
      </template>

      <!-- Uplod Dialog Box -->
      <WhatnotUploadForm @close="handleClose" @refresh="handleRefresh" />
    </v-dialog>
  </div>
</template>

<script>
import WhatnotUploadForm from "./WhatnotUploadForm";
export default {
  name: "WhatnotUpload",
  components: {
    WhatnotUploadForm
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    handleClose(value) {
      this.dialog = value;
    },
    handleRefresh() {
      this.$emit("refresh");
    }
  }
};
</script>

<style scoped></style>
