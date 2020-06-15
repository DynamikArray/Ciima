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
            <InventoryTitleEditable :item="item" />
          </div>

          <div class="d-flex align-center">
            <Price
              minWidth="10px"
              alignValue="justify-start"
              :label="true"
              :item="item"
            ></Price>
            <IssueNumbers :label="true" :item="item"></IssueNumbers>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LotInventoryTitleMobile from "./LotInventoryTitleMobile";
import InventoryTitleEditable from "./InventoryTitleEditable";
import IssueNumbers from "../IssueNumbers";
import Price from "../Price";

export default {
  props: {
    isMobile: [Boolean],
    item: [Object]
  },
  components: {
    Price,
    LotInventoryTitleMobile,
    InventoryTitleEditable,
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
