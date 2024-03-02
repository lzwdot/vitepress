<script lang="ts" setup>
import { computed } from 'vue';
import { useData, DefaultTheme } from 'vitepress';
import dayjs from 'dayjs';
import { data as sidebars } from './../data/load/sidebar.data.ts';

const { site } = useData();
const data = computed(() =>
  sidebars['post'].map((year: DefaultTheme.SidebarItem) => {
    const items: ArchiveItem[] = [];
    if (year.items && year.items.length) {
      year.items.map((month: DefaultTheme.SidebarItem) => {
        if (month.items) items.push(...month.items);
      });
    }

    return {
      text: year.text,
      items: items,
    };
  }),
);
</script>

<template>
  <section v-for="post in data" :key="post.text">
    <h2 class="text-center">{{ post.text }}</h2>
    <ul>
      <li v-for="item in post.items" :key="item.link" class="list-[square]">
        <a :href="site.base.slice(0, -1) + item.link">
          {{ item.text }}
        </a>
        <span class="text-[var(--vp-c-text-3)]">
          （{{ dayjs(item.date).format('YYYY.MM.DD') }}）
        </span>
      </li>
    </ul>
  </section>
</template>
