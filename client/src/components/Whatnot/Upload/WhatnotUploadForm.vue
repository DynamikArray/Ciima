<template>
  <v-card>
    <v-card-title class="primary"> <v-icon class="mr-2" small>fa fa-upload</v-icon> Upload File:</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="px-3 pt-3">
      <div class="d-flex flex-row align-center justify-start">
        <div class="d-flex align-start justify-center px-2 flex-grow">
          <h3 class="white--text">Select File:</h3>
        </div>
        <div class="d-flex align-start justify-center px-2 flex-grow-1">
          <v-file-input type="file" @change="uploadFile" :v-model="file"></v-file-input>
        </div>
      </div>

      <div class="d-flex flex-row align-center justify-start">
        <div class="d-flex align-center justify-center px-2 flex-grow">
          <h3 class="white--text mt-4">File Date:</h3>
        </div>

        <div class="d-flex align-start justify-center px-2 flex-grow-1">
          <DateFilter
            :dateSelected="fileDate"
            fieldName="fileDate"
            fieldLabel="Select Date of Sales File:"
            @update="handleFileDateChange"
          />
        </div>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="pa-4">
      <v-btn color="red" @click="handleClose">
        <v-icon small class="mr-2">fa fa-times-circle</v-icon>
        Close
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="primary" @click="submitFile" :disabled="!canSubmit">
        <v-icon small class="mr-2">fa fa-upload</v-icon>
        Upload
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { axiosInstance, createInterceptor } from "@/util/axios/axiosInstance";
import DateFilter from "@/components/Whatnot/Filters/DateFilter";

export default {
  name: "WhatnotUploadForm",
  components: {
    DateFilter
  },
  data: () => ({ file: [], fileDate: null }),
  computed: {
    canSubmit() {
      if (this.file && this.fileDate) return true;
      return false;
    }
  },
  methods: {
    handleClose() {
      this.resetData();
      this.$emit("close", false);
    },
    resetData() {
      this.file = []; //this is not updating in the v-file-component child input or something
      this.fileDate = null;
    },
    handleFileDateChange({ fileDate }) {
      this.fileDate = fileDate;
    },
    uploadFile(file) {
      this.file = file;
    },
    async submitFile() {
      //Make sure we have a valid date selected
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("fileDate", this.fileDate);
      const headers = { "Content-Type": "multipart/form-data" };
      try {
        this.uploading = true;
        const { status, data } = await axiosInstance.post("/whatnot/upload", formData, { headers });
        this.$toastr.s(`SUCCESS: ${JSON.stringify(data.result)}`);
        this.$store.dispatch(`api/updateStatus`, `SUCCESS: ${JSON.stringify(data.result)}`, { root: true });
        //Refresh data and close
        this.$emit("refresh", true);
        this.handleClose();
      } catch (error) {
        const errResp = error.response;
        if (errResp && errResp.data && !errResp.data.message) {
          this.$toastr.e(`ERROR: ${JSON.stringify(errResp.data)}`);
          this.$store.dispatch(`api/updateStatus`, `FAILED: ${errResp.data}`, { root: true });
        } else if (errResp && errResp.data && errResp.data.message) {
          this.$toastr.e(`ERROR: ${JSON.stringify(errResp.data.message)}`);
          this.$store.dispatch(`api/updateStatus`, `FAILED: ${errResp.data.message}`, { root: true });
        }
      } finally {
        this.uploading = false;
      }
    }
  }
};
</script>

<style scoped></style>
