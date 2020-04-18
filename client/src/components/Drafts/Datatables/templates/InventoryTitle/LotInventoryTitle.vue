<template>
  <div class="d-flex justify-start align-center w-100">
    <div class="d-flex justify-start align-center w-100">
      <LotInventoryTitleMobile
        v-if="isMobile"
        :item="item"
      ></LotInventoryTitleMobile>

      <div
        v-if="!isMobile"
        class="d-flex align-center grow mx-3 long-and-truncated"
      >
        <div class="d-flex flex-column">
          <div class="d-flex justify-start align-center w-100 my-1">
            <span class="subtitle-1">
              {{ item.inventoryTitle }}
            </span>
          </div>

          <div class="d-flex align-center">
            <IssueNumbers :label="true" :item="item"></IssueNumbers>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LotInventoryTitleMobile from "./LotInventoryTitleMobile";
import IssueNumbers from "../IssueNumbers";

export default {
  props: {
    isMobile: [Boolean],
    item: [Object]
  },
  components: {
    LotInventoryTitleMobile,
    IssueNumbers
  }
};
</script>

<style scoped>
.long-and-truncated {
  flex: 1;
  &,
  & > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
