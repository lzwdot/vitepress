<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import sidebarData from './../data/sidebar.json';

const { site } = useData();
const docs = computed(() => sidebarData['docs']);
</script>

<template>
  <ul class="text-left">
    <li v-for="(item, key) in docs" :key="key" class="flex items-center">
      <svg
        style="width: 20px; height: 20px; fill: #8e8e8e"
        viewBox="0 0 448 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
        ></path>
      </svg>
      <a :href="site.base.slice(0, -1) + key + '/README'" class="ml-1">
        {{ item[0]['text'] }}
      </a>
    </li>
  </ul>
</template>
