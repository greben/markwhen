import { PAGE_BREAK, PAGE_BREAK_REGEX } from "@markwhen/parser/lib/regex";
import { defineStore } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";
import { useMarkwhenStore } from "./markwhenStore";

export const usePageStore = defineStore("page", () => {
  const pageIndex = ref<number>(0);
  const markwhenStore = useMarkwhenStore();

  const setPageIndex = (index: number) => (pageIndex.value = index);

  const pageTimeline = computed(() => markwhenStore.timelines[pageIndex.value]);
  const pageTimelineMetadata = computed(() => pageTimeline.value.metadata);
  const tags = computed(() => pageTimeline.value.tags);

  const pageTimelineString = computed(() =>
    markwhenStore.rawTimelineString.slice(
      pageTimelineMetadata.value.startStringIndex,
      pageTimelineMetadata.value.endStringIndex
    )
  );

  return {
    // state
    pageIndex,

    // actions
    setPageIndex,

    // getters
    pageTimeline,
    pageTimelineMetadata,
    pageTimelineString,
    tags,
  };
});
