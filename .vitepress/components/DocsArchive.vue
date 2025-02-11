<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import dayjs from 'dayjs';
import { data as sidebars } from './../data/load/sidebar.data.ts';

const base = ref('');
const docs = sidebars['docs'];
const data = computed(() => {
  const items: ArchiveItem[] = [];
  for (const key in docs) {
    const doc = docs[key]?.[0] || docs[key];

    let last: ArchiveItem = {},
      first: ArchiveItem = {};
    if (Array.isArray(doc?.items)) {
      first = doc.items[0];
      last = doc.items[doc.items.length - 1];
    }

    items.push({
      text: doc?.text,
      link: first?.link || '/',
      date: Array.isArray(last?.items)
        ? last?.items[last?.items?.length - 1]?.date
        : last?.date,
      desc: doc?.items
        ?.map((v: ArchiveItem) => (Array.isArray(v?.items) ? v.text : ''))
        ?.filter((v: string) => v)
        ?.join('，'),
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
          <small v-if="item.desc" class="text-[var(--vp-c-text-3)]">
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
