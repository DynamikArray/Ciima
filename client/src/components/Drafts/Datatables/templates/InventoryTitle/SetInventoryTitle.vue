<template>
  <div class="d-flex justify-start align-center w-100">
    <div class="d-flex justify-start align-center w-100">
      <SetInventoryTitleMobile
        v-if="isMobile"
        :item="item"
      ></SetInventoryTitleMobile>

      <div
        v-if="!isMobile"
        class="d-flex align-center grow mx-3 long-and-truncated"
      >
        <div class="d-flex flex-column w-100">
          <div class="d-flex justify-start align-center w-100 my-1">
            <InventoryTitleEditable :item="item" />
          </div>
          <div class="d-flex align-center w-100 justify-space-between">
            <div class="d-flex align-center justify-start mr-5">
              <Quantity :label="true" :item="item"></Quantity>
            </div>
            <div class="d-flex align-center justify-start mx-3">
              <Grade :label="true" :item="item"></Grade>
            </div>
            <div class="d-flex align-center justify-start ml-5">
              <Price :label="true" :item="item"></Price>
            </div>
          </div>

          <div class="d-flex align-center w-100 justify-start">
            <div class="d-flex w-100">
              <IssueNumbers :label="true" :item.sync="item"></IssueNumbers>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SetInventoryTitleMobile from "./SetInventoryTitleMobile";
import IssueNumbers from "../IssueNumbers";
import Grade from "../Grade";
import Price from "../Price";
import Quantity from "../Quantity";
import InventoryTitleEditable from "./InventoryTitleEditable";

export default {
  props: {
    isMobile: [Boolean],
    item: [Object]
  },
  components: {
    InventoryTitleEditable,
    SetInventoryTitleMobile,
    IssueNumbers,
    Grade,
    Price,
    Quantity
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
