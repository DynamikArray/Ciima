<template>
  <div class="d-flex justify-start align-center w-100">
    <LotInventoryTitle
      v-if="isLot"
      :isMobile="isMobile"
      :item="item"
    ></LotInventoryTitle>

    <SetInventoryTitle
      v-if="!isLot"
      :isMobile="isMobile"
      :item="item"
    ></SetInventoryTitle>
  </div>
</template>

<script>
import LotInventoryTitle from "./LotInventoryTitle";
import SetInventoryTitle from "./SetInventoryTitle";

export default {
  props: {
    isMobile: [Boolean],
    item: [Object]
  },
  computed: {
    isLot() {
      if (this.item.draftType == "lots") return true;
      return false;
    }
  },
  components: {
    LotInventoryTitle,
    SetInventoryTitle
  }
};
</script>

<style scoped></style>
