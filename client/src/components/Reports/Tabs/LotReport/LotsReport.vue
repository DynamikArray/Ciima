<template>
  <div class="d-flex flex-column w-100">
    <TagsList :tags="itemCharacters" />
    <v-divider class="my-1"></v-divider>
    <div
      v-for="title in itemTitles"
      class="d-flex align-center justify-start grey pa-1 border-1 darken-1 ma-2"
    >
      {{ title }}
    </div>
    <LoadingModal :loading="loading" />
  </div>
</template>

<script>
import LoadingModal from "@/components/Loading/LoadingModal";
import TagsList from "@/components/Reports/Tabs/LotReport/TagsList";

export default {
  props: {
    loading: [Boolean],
    items: [Boolean, Array]
  },
  components: {
    LoadingModal,
    TagsList
  },
  computed: {
    itemTitles() {
      return this.items.map(item => item.linnworksTitle).sort();
    },
    itemCharacters() {
      //list of charachter
      const charactersArray = this.items.reduce((acc, item) => {
        item.mainCharacters.split("|").map(char => {
          acc.push(char.toLowerCase());
        });
        return acc;
      }, []);

      //with counts
      return Object.values(
        charactersArray.reduce((c, v) => {
          c[v] = c[v] || [v, 0];
          c[v][1]++;
          return c;
        }, {})
      )
        .map(o => ({ tag: o[0], count: o[1] }))
        .sort((a, b) => b.count - a.count);
    }
  }
};
</script>

<style scoped></style>
