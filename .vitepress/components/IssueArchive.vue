<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import dayjs from 'dayjs';
import { data as sidebars } from './../data/load/sidebar.data.ts';

const base = ref('');
const issues = sidebars['issue'];
const data = computed(() => {
  const items: ArchiveItem[] = [];
  for (let key in issues) {
    const note = issues[key]?.[0] || issues[key];

    let last: ArchiveItem = {},
      first: ArchiveItem = {};
    if (Array.isArray(note?.items)) {
      first = note.items[0];
      last = note.items[note.items.length - 1];
    }

    items.push({
      text: note?.text,
      link: first?.link || '/',
      date: Array.isArray(last?.items)
        ? last?.items[last?.items?.length - 1]?.date
        : last?.date,
      desc: note?.items?.length || 0,
    });
  }

  return items;
});
onMounted(() => {
  base.value = useData().site.value.base;
});
</script>

<template>
  <ul class="!mt-[48px] border-t border-t-[var(--vp-c-divider)] pt-[24px]">
    <li v-for="item in data" :key="item.link" class="list-[square]">
      <span class="flex items-center justify-between">
        <span>
          <a :href="base.slice(0, -1) + item.link">
            {{ item.text }}
          </a>
          <small class="text-[var(--vp-c-text-3)]" v-if="item.desc">
            （{{ item.desc }}）
          </small>
        </span>
        <small class="text-[var(--vp-c-text-3)]">
          更新于 {{ dayjs(item.date).format('YYYY.MM.DD') }}
        </small>
      </span>
    </li>
  </ul>
</template>
