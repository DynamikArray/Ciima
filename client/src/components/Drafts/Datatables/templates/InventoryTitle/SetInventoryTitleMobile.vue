<template>
  <div class="d-flex flex-column justify-center align-end w-100 h-100 my-3">
    <div class="d-flex justify-start align-center w-100 my-1">
      <span class="subtitle-1">
        {{ item.inventoryTitle }}
      </span>
    </div>
    <div class="d-flex justify-start align-start w-100">
      <div class="d-flex justify-start align-center">
        <MainImage :item="item"></MainImage>
      </div>

      <div class="d-flex justify-start align-start w-100 mt-1">
        <div class="d-flex flex-column justify-space-around align-start w-100">
          <div class="d-flex justify-space-between align-start w-100">
            <div
              class="d-flex justify-end align-start flex-column mr-5"
              style="min-width:160px;"
            >
              <Price :label="true" :item="item"></Price>
              <Quantity :label="true" :item="item"></Quantity>
            </div>
            <div class="d-flex justify-start align-start flex-column mr-4">
              <Grade :label="true" :item="item"></Grade>
              <IssueNumbers :label="true" :item="item"></IssueNumbers>
            </div>
          </div>

          <div class="d-flex justify-start align-center w-100">
            <LocationCode :label="true" :item="item"></LocationCode>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column justify-end align-center ml-10">
        <OwnerId class="mb-2" :size="35" :item="item"></OwnerId>
        <CreatedDate
          class="my-3"
          :item="item"
          style="max-width:130px"
        ></CreatedDate>
      </div>
    </div>
  </div>
</template>

<script>
/*
<Quantity :label="true" :item="item"></Quantity>

 */

import MainImage from "../MainImage";
import Grade from "../Grade";
import IssueNumbers from "../IssueNumbers";
import Price from "../Price";
import OwnerId from "../OwnerId";
import Quantity from "../Quantity";
import CreatedDate from "../CreatedDate";
import LocationCode from "../LocationCode";

export default {
  props: {
    isMobile: [Boolean],
    item: [Object]
  },
  components: {
    MainImage,
    IssueNumbers,
    Grade,
    Price,
    OwnerId,
    CreatedDate,
    Quantity,
    LocationCode
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
