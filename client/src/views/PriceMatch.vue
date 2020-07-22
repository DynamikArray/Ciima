<template>
  <v-container
    fluid
    class="pa-0 ma-0 fullContainer"
    id="fullContainer"
    v-resize:debounce="onContainerResize"
  >
    <!-- <div
      class="d-flex justify-space-around align-baseline px-2 mt-1 borderBottom"
      id="pageHeading"
    >
      <h3 class="mr-2 mb-0">
        Our Titles & Issues
      </h3>
      <h1 class="mb-0">
        Price Matching
      </h1>
      <h3 class="mr-2 mb-0">
        Their Titles & Issues
      </h3>
    </div>
  -->

    <v-divider></v-divider>

    <div class="" id="formMatchWrapper">
      <PriceMatchForm />
    </div>

    <div id="pricematchContentWrapper" class="borderTop">
      <PriceMatchContainer :containerHeight="containerHeight" />
    </div>
  </v-container>
</template>

<script>
import resize from "vue-resize-directive";

import { mapState, mapGetters } from "vuex";
import PriceMatchContainer from "@/components/Pricematch/PriceMatchContainer";
import PriceMatchForm from "@/components/Pricematch/PriceMatchForm/PriceMatchForm";

export default {
  components: {
    PriceMatchForm,
    PriceMatchContainer
  },
  data: () => ({
    containerHeight: 0,
    fullscreen: false
  }),
  directives: {
    resize
  },
  mounted() {
    this.$nextTick(() => {
      this.setContainerSize();
    });
  },
  methods: {
    setContainerSize() {
      //const headingHeight = document.getElementById("pageHeading").clientHeight;
      const formMatchWrapper = document.getElementById("formMatchWrapper")
        .clientHeight;
      const containerHeight = document.getElementById("fullContainer")
        .clientHeight;

      const maxHeight = containerHeight - formMatchWrapper - 55;
      this.containerHeight = maxHeight;
    },
    onContainerResize(el) {
      const containerHeight = el.clientHeight;
      //const headingHeight = document.getElementById("pageHeading").clientHeight;
      const formMatchWrapper = document.getElementById("formMatchWrapper")
        .clientHeight;

      const maxHeight = containerHeight - formMatchWrapper - 55;
      this.containerHeight = maxHeight;
    }
  }
};
</script>

<style>
#fullContainer .v-window__container {
  height: 100%;
}

.borderLeft {
  border-left: 2px solid #616161;
}

.borderRight {
  border-right: 2px solid #616161;
}

.borderTop {
  border-top: 2px solid #616161;
}

.borderBottom {
  border-bottom: 2px solid #616161;
}
</style>
<style scoped>
.fullContainer {
  min-height: calc(100%);
  height: calc(100%) !important;
  max-height: calc(100%) !important;
}
</style>
