<template>
  <div class="d-flex justify-center align-center w-100 py-1">
    <div class="d-flex w-100 ">
      <OurIssue
        v-if="ourSelectedIssue"
        :selectedIssue="ourSelectedIssue"
        class="textShadow"
      />
      <div class="d-flex align-center justify-center w-100 " v-else>
        <h2><i>No (Our) Selected Issue</i></h2>
      </div>
    </div>

    <div class="d-flex align-self-stretch borderLeft borderRight px-10">
      <div class="d-flex flex-column align-center justify-center py-1">
        <div class="mx-3 mt-1">
          <v-btn color="success" class=""
            ><v-icon small class="mr-3">fa fa-save</v-icon>Save Match</v-btn
          >
        </div>
      </div>
    </div>

    <div class="d-flex w-100">
      <TheirIssue
        v-if="theirSelectedIssue"
        :selectedIssue="theirSelectedIssue"
        class="textShadow"
      />
      <div class="d-flex align-center justify-center w-100" v-else>
        <h2><i>No (Their) Selected Issue</i></h2>
      </div>
    </div>
    <div class="d-flex align-self-stretch ml-10">
      <div class="d-flex flex-column align-center justify-space-between py-1">
        <div class="mx-3 mb-1">
          <v-btn color="red" class=""
            ><v-icon small class="mr-1">fa fa-times-circle</v-icon>Clear</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OurIssue from "./OurIssue/OurIssue";
import TheirIssue from "./TheirIssue/TheirIssue";

export default {
  props: {
    ourSelectedIssue: [Boolean, Object],
    theirSelectedIssue: [Boolean, Object]
  },
  components: {
    OurIssue,
    TheirIssue
  }
};
</script>

<style scoped>
.borderRight {
  border-right: 2px solid #616161;
}
.borderLeft {
  border-left: 2px solid #616161;
}
</style>
