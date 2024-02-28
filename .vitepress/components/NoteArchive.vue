<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData, useRoute } from 'vitepress';
import dayjs from 'dayjs';
import { data as sidebars } from './../data/load/sidebar.data.ts';

const { site } = useData();
const route = useRoute();
const notes = sidebars['note'];
const path = ref(Object.keys(notes).find((key) => route.path.includes(key)));
const data = computed(() => {
  const items: ArchiveItem[] = [];
  if (notes[path.value]) {
    items.push(...notes[path.value][0].items);
  } else {
    for (let key in notes) {
      const note = notes[key][0];
      const last = Array.isArray(note.items)
        ? note.items[note.items.length - 1]
        : {};
      items.push({
        text: note.text,
        link: key,
        date: Array.isArray(last?.items)
          ? last?.items[last?.items?.length - 1]?.date
          : last?.date,
      });
    }
  }
  return items;
});
</script>

<template>
  <ul class="!mt-[48px] border-t border-t-[var(--vp-c-divider)] pt-[24px]">
    <li v-for="item in data" :key="item.link" class="list-[square]">
      <a :href="site.base.slice(0, -1) + item.link" v-if="path">
        {{ item.text }}
      </a>
      <span class="flex items-center justify-between" v-else>
        <a :href="site.base.slice(0, -1) + item.link + '/README'">
          {{ item.text }}
        </a>
        <small class="text-[var(--vp-c-text-3)]">
          更新于 {{ dayjs(item.date).format('YYYY.MM.DD') }}
        </small>
      </span>
    </li>
  </ul>
</template>
