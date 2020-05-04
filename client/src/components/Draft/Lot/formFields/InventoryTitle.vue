<template>
  <div class="inventoryTitleWrapper w-100 d-flex justify-start align-center">
    <div class="w-100">
      <v-text-field
        dense
        :value="value"
        id="inventoryTitle"
        name="inventoryTitle"
        label="Title"
        hint="Listing Title"
        :rules="rules"
        outlined
        counter="80"
        :disabled="blnReadOnly"
        @input="handleUserInput"
        @update:error="updateError"
        @blur="blurInventoryTitle"
      ></v-text-field>

      <div
        class="d-flex justify-center align-center mt-2"
        v-show="localError && blnReadOnly"
      >
        <v-alert
          transition="fab-transition"
          prominent
          class="mx-auto"
          color="red"
          dismissible
          icon="fa fa-exclamation-circle"
          v-show="localError && blnReadOnly"
        >
          <h3>
            Your title is too long. Click the Edit Title button on the right to
            enable editing of Inventory Title!
          </h3>
        </v-alert>
      </div>

      <div
        class="d-flex justify-center align-center mt-2"
        v-show="titleCheckError"
      >
        <v-alert
          transition="fab-transition"
          prominent
          class="mx-auto"
          color="red"
          dismissible
          v-show="titleCheckError"
        >
          <h3>This title appears to be a duplicate of an existing item</h3>
          <div v-if="titleCheckErrorDetail" class="text-center">
            <p>Listed on: {{ errorStartTime | dateTime }}</p>
            <v-img
              :key="errorImage"
              :src="errorImage"
              max-width="115"
              class="mx-auto my-1"
            />

            <v-btn
              v-if="errorURL"
              class="btn btn-small btn-info mt-1"
              :href="errorURL"
              target="_blank"
              >View Item On Ebay</v-btn
            >

            <div v-if="!errorURL">
              <h2>In Open Drafts</h2>
            </div>
          </div>
        </v-alert>
      </div>
    </div>
    <div
      class="d-flex flex-column align-center mx-3 flex-grow"
      style="width:100px;"
    >
      <div class="d-flex">
        <v-btn class="mb-1" @click="toggleEditTitle" small color="grey darken-2"
          ><v-icon small>fa fa-edit</v-icon></v-btn
        >
      </div>
      <div class="d-flex overline mx-0 my-0">Edit Title</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: [String],
    titleCheckError: [Boolean],
    titleCheckErrorDetail: [Boolean, Object],
    rules: [Array],
    updateData: [Function]
  },
  data: () => ({
    localError: false,
    blnReadOnly: true
  }),
  computed: {
    errorURL() {
      if (this.titleCheckErrorDetail && this.titleCheckErrorDetail.item) {
        const { item } = this.titleCheckErrorDetail;
        return item.viewItemURL;
      }
      return false;
    },
    errorStartTime() {
      if (this.titleCheckErrorDetail && this.titleCheckErrorDetail.item) {
        const { item } = this.titleCheckErrorDetail;
        //ebay starttime
        if (item.listingInfo.startTime) return item.listingInfo.startTime;
      }

      if (this.titleCheckErrorDetail.createdDate)
        return this.titleCheckErrorDetail.createdDate;

      return false;
    },
    errorItemId() {
      if (this.titleCheckErrorDetail && this.titleCheckErrorDetail.item) {
        const { item } = this.titleCheckErrorDetail;
        return item.itemId;
      }

      if (this.titleCheckErrorDetail.locationCode)
        return this.titleCheckErrorDetail.locationCode;

      return false;
    },
    errorImage() {
      if (this.titleCheckErrorDetail && this.titleCheckErrorDetail.item) {
        const { item } = this.titleCheckErrorDetail;
        if (item.galleryURL) return item.galleryURL;
      }

      if (this.titleCheckErrorDetail.main_image)
        return this.titleCheckErrorDetail.main_image;

      return false;
    }
  },
  methods: {
    toggleEditTitle() {
      this.blnReadOnly = !this.blnReadOnly;
    },
    handleUserInput(val) {
      this.updateData("inventoryTitle", val);
    },
    updateError(value) {
      this.localError = value;
    },
    blurInventoryTitle() {
      this.blnReadOnly = true;
    }
  }
};
</script>

<style scoped></style>
