<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row justify-start align-center">
      <h3>Sold Items Count: {{ itemsCount }}</h3>
      <TagsList :tags="itemCharacters" />
    </div>

    <v-divider class="my-1"></v-divider>
    <div
      v-for="char in itemCharacters"
      class="d-flex flex-column w-100 my-2 pa-2 grey darken-3 pa-1"
      style="border-radius:6px;"
    >
      <div class="d-flex align-center justify-start">
        <div class="d-flex align-center justify-start">
          <h2 class="">{{ char.count }}</h2>
        </div>
        <div class="d-flex align-center justify-start">
          <h3 class="mx-1">{{ properTagName(char.tag) }}</h3>
        </div>
      </div>
      <v-divider class="my-1"></v-divider>
      <div class="my-0 pa-1">
        <div
          v-for="title in titlesByTag(char.tag)"
          class="d-flex align-center justify-start"
        >
          {{ title }}
        </div>
      </div>
    </div>
    <v-divider class="my-1"></v-divider>
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
    itemsCount() {
      if (!this.items) return 0;
      return this.items.length;
    },
    itemTitles() {
      return this.items.map(item => item.linnworksTitle).sort();
    },
    itemCharacters() {
      //list of charachter
      const charactersArray = this.items.reduce((acc, item) => {
        item.mainCharacters.split("|").map(char => {
          if (char === "") console.log("No character");
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
        .map(o => {
          return { tag: o[0], count: o[1] };
        })
        .sort((a, b) => b.count - a.count);
    }
  },
  methods: {
    properTagName(tag) {
      if (tag === "") return "No Character";
      return this.sentenceCase(tag);
    },

    sentenceCase(str) {
      return str
        .replace(/[a-z]/i, function(letter) {
          return letter.toUpperCase();
        })
        .trim();
    },

    titlesByTag(tag) {
      return this.items
        .filter(item =>
          item.mainCharacters.toLowerCase().includes(tag.toLowerCase())
        )
        .map(title => {
          return title.linnworksTitle;
        });
    }
  }
};
</script>

<style scoped></style>
