<template>
  <div class="w-100 h-100">
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      loading-text="Loading..."
      :items-per-page="limit"
      hide-default-footer
      :footer-props="footerProps"
      class="textShadow"
    >
      <template v-slot:item.ourTitle="{ item }">
        <h3>{{ item.ourTitle }}</h3>
      </template>

      <template v-slot:item.theirTitle="{ item }">
        <h3>{{ item.theirTitle }}</h3>
      </template>

      <template v-slot:item.ourImageUrl="{ item }">
        <OurIssueImage
          class="ma-1"
          style="min-height:60px"
          :imageUrl="item.ourImageUrl"
          :onClick="showOurFullSize"
        />
      </template>

      <template v-slot:item.theirImageThumbnail="{ item }">
        <TheirIssueImage
          class="ma-1"
          :thumbnail="item.theirImageThumbnail"
          :fullsize="item.theirImageFullsize"
          :onClick="showTheirFullSize"
        />
      </template>

      <template v-slot:item.ourPricesFromThem="{ item }">
        <PricesFlexbox :prices="item.ourPricesFromThem" />
      </template>

      <template v-slot:item.userName="{ item }">
        <UserAvatar :userName="item.userName" />
      </template>

      <template v-slot:item.dateCreated="{ item }">
        <h5 class="caption">{{ item.dateCreated | dateTime }}</h5>
      </template>
      <template v-slot:item.dateUpdated="{ item }">
        <h5 class="caption">{{ item.dateUpdated | dateTime }}</h5>
      </template>

      <!--ACTION COLUMN-->
      <template v-slot:item.action="{ item }">
        <ActionButtons :item="item" :getData="getData" />
      </template>
    </v-data-table>

    <v-dialog v-model="previewImage" max-width="550">
      <v-card color="secondary darken-3" dark class="pt-2">
        <v-card-text>
          <v-img :src="previewImageUrl" max-height="750" contain></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { headers } from "./Templates/tableHeaders";
import PricesPopup from "./Templates/PricesPopup";
import PricesFlexbox from "./Templates/PricesFlexbox";

import OurIssueImage from "./Templates/OurIssueImage";
import TheirIssueImage from "./Templates/TheirIssueImage";
import ActionButtons from "./Templates/ActionButtons";

import UserAvatar from "./Templates/UserAvatar";

export default {
  props: {
    limit: [Number],
    items: [Boolean, Array],
    loading: [Boolean],
    getData: [Function]
  },
  components: {
    OurIssueImage,
    TheirIssueImage,
    PricesPopup,
    PricesFlexbox,
    UserAvatar,
    ActionButtons
  },
  data: () => ({
    headers,
    footerProps: {},
    previewImage: false,
    previewImageUrl: false
  }),
  computed: {},
  methods: {
    showTheirFullSize(imageUrl) {
      this.previewImageUrl = imageUrl;
      this.previewImage = true;
    },
    showOurFullSize(imageUrl) {
      this.previewImageUrl = imageUrl;
      this.previewImage = true;
    }
  }
};
</script>

<style scoped></style>
