<script setup lang="ts">
import { useData } from 'vitepress';
import dayjs from 'dayjs';
import allPosts from './../../data/allPost.json';

const { site } = useData();
const posts = allPosts.sort((a, b) => (b.date > a.date ? 1 : -1)).slice(0, 10);
</script>

<template>
  <div
    class="mb-4 mt-5 flex items-center rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
    role="alert"
  >
    <svg
      class="mr-2 h-4 w-4 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
      />
    </svg>
    <span class="font-medium"> 网站已使用VitePress重新构建，欢迎访问！ </span>
  </div>
  <ul class="ml-5 list-[square] text-left">
    <li v-for="post in posts" :key="post.url">
      {{ dayjs(post.date).format('YYYY年MM月DD日') }}
      »
      <a :href="site.base + post.url" class="text-[var(--vp-c-brand-1)]">
        {{ post.title }}
      </a>
    </li>
  </ul>
</template>
