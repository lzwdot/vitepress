<script setup lang="ts">
import { computed } from 'vue';
import { useData, type DefaultTheme } from 'vitepress';
import AlertIcon from './../assets/icons/Alert.vue';
import dayjs from 'dayjs';
import { data as allPosts } from './../../data/load/allPost.data.ts';

const { site, theme } = useData();
const posts = allPosts
  .sort((a: ArchiveItem, b: ArchiveItem) =>
    b.date && a.date && b.date > a.date ? 1 : -1,
  )
  .slice(0, 10);

const docusaurus = computed(() => {
  return theme.value.nav.find((v: DefaultTheme.NavItemWithLink) =>
    v.link.includes('docusaurus'),
  );
}) as unknown as DefaultTheme.NavItemWithLink;
</script>

<template>
  <section
    class="mb-4 mt-5 flex items-center rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
    role="alert"
  >
    <AlertIcon />
    <span class="font-medium">
      网站已使用VitePress重新构建，欢迎访问！
      <a
        :href="docusaurus.link"
        class="VPLink link vp-external-link-icon VPNavBarMenuLink"
        target="_blank"
      >
        {{ docusaurus.text }}
      </a>
    </span>
  </section>
  <ul class="ml-5 list-[square] text-left">
    <li v-for="post in posts" :key="post.link">
      {{ dayjs(post.date).format('YYYY年MM月DD日') }}
      »
      <a
        :href="site.base.slice(0, -1) + post.link"
        class="text-[var(--vp-c-brand-1)]"
      >
        {{ post.text }}
      </a>
    </li>
  </ul>
</template>
