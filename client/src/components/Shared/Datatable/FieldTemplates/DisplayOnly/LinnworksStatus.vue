<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="" :key="`transition_linnworks_${keyString}`" :class="fontClass">
      <div class="caption" :key="`transition_caption_${keyString}`">
        <div v-if="isUpating && hasError">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                class="ma-2 textShadow"
                color="error"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small class="mr-2">fas fa-exclamation-triangle</v-icon>
                <h3 class="">Error</h3>
              </v-chip>
            </template>
            <v-alert type="error" style="max-width:400px">
              <div class="body-2" v-html="errorMessages" />
            </v-alert>
          </v-tooltip>
        </div>

        <v-chip
          v-if="isUpating && !hasError"
          class="ma-2 textShadow"
          :color="statusColor"
        >
          <v-icon small class="mr-2">fa fa-cog fa-spin</v-icon>
          <h3 class="">{{ listingStatus }}</h3>
        </v-chip>

        <v-chip
          v-if="!isUpating && !hasError"
          class="ma-2 textShadow"
          :color="statusColor"
        >
          <v-icon small class="mr-2">fa fa-check-circle</v-icon>
          <h3 class="">{{ listingStatus }}</h3>
        </v-chip>
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    keyString: {
      type: [String]
    },
    listingStatus: {
      type: [String]
    },
    hasErrorMsg: {
      type: [Boolean]
    },
    errorMessage: {
      type: [String]
    },
    fontClass: {
      type: [String],
      default: "body-2"
    }
  },
  computed: {
    isUpating() {
      if (this.listingStatus == "UPDATING") return true;
      return false;
    },
    hasError() {
      if (this.hasErrorMsg === true && this.errorMessage != "") {
        return true;
      }
      return false;
    },
    errorMessages() {
      if (this.errorMessage) {
        const strMsgs = JSON.stringify(this.errorMessage);
        const formattedMsgs = strMsgs.replace(/\\r\\n/g, "<br /><br />");
        if (!formattedMsgs) return strMsgs;
        return formattedMsgs;
      }
      return false;
    },
    statusColor() {
      switch (this.listingStatus) {
        case "OK":
          return "success";
          break;
        case "UPDATING":
          return "warning";
          break;
        default:
          return "default";
      }
    }
  }
};
</script>

<style scoped></style>
