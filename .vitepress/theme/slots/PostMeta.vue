<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import dayjs from 'dayjs';
import { data as authors } from './../../data/load/author.data.ts';

const { frontmatter: post } = useData();
const author = computed(() => authors[post.value.author]);
</script>

<template>
  <header class="vp-doc text-[var(--vp-c-text-3)]" v-if="author && post.date">
    <div class="flex items-center justify-between">
      <a :href="author.url" target="_blank" class="text-blod">
        <img
          :src="author.avatar"
          :alt="author.name"
          class="mr-1 inline-block w-5 rounded-full"
        />
        {{ author.name }}
      </a>
      <small>
        发布于
        {{ dayjs(post.date).format('YYYY年MM月DD日') }}
      </small>
    </div>
    <small>{{ author.desc }} </small>
  </header>
</template>
