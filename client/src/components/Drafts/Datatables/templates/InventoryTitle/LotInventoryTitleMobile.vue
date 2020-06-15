<template>
  <div class="d-flex flex-column justify-space-between align-end w-100 my-3 ">
    <div class="d-flex justify-start align-center w-100 my-1">
      <InventoryTitleEditable :item="item" />
    </div>
    <div class="d-flex justify-start align-start w-100">
      <div class="d-flex justify-start align-center">
        <MainImage :item="item"></MainImage>
      </div>

      <div class="d-flex justify-start align-start w-100 mt-1">
        <div class="d-flex flex-column justify-space-around align-start w-100">
          <div class="d-flex justify-space-around align-start w-100">
            <div
              class="d-flex justify-start align-start flex-column mr-5"
              style="min-width:160px;"
            >
              <Price :label="true" :item="item"></Price>
              <Quantity :label="true" :item="item"></Quantity>
            </div>
            <div class="d-flex align-end flex-column mr-auto w-100">
              <Grade v-if="item.grade" :label="true" :item="item"></Grade>
              <IssueNumbers :label="true" :item="item"></IssueNumbers>
            </div>
          </div>

          <div class="d-flex justify-start align-start">
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
import MainImage from "../MainImage";
import Grade from "../Grade";
import IssueNumbers from "../IssueNumbers";
import Price from "../Price";
import OwnerId from "../OwnerId";
import LocationCode from "../LocationCode";
import CreatedDate from "../CreatedDate";
import Quantity from "../Quantity";
import InventoryTitleEditable from "./InventoryTitleEditable";

export default {
  props: {
    item: [Object]
  },
  components: {
    InventoryTitleEditable,
    MainImage,
    IssueNumbers,
    Grade,
    Price,
    OwnerId,
    CreatedDate,
    LocationCode,
    Quantity
  }
};
</script>

<style scoped></style>
