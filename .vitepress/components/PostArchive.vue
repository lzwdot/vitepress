<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import dayjs from 'dayjs';
import sidebarData from './../data/sidebar.json';

interface Post {
  text?: string;
  date?: string;
  link?: string;
}

const { site } = useData();
const posts = computed(() =>
  sidebarData['post'].map((year) => {
    const items: Post[] = [];
    if (year.items.length) {
      year.items.map((month) => items.push(...month.items));
    }

    return {
      text: year.text,
      items: items,
    };
  }),
);
</script>

<template>
  <section v-for="post in posts" :key="post.text">
    <h2 class="text-center">{{ post.text }}</h2>
    <ul class="ml-5 text-left">
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
