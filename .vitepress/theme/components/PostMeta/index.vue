<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import dayjs from 'dayjs';
import { data as authors } from './author.data.js';

const { frontmatter: post } = useData();
const author = computed(() => authors[post.value.author]);
</script>

<template>
  <header class="vp-doc" v-if="post.title">
    <h1 class="mb-5">
      {{ post.title }}
    </h1>
    <div v-if="author && post.date" class="flex text-[var(--vp-c-text-3)]">
      <a
        :href="author.url"
        target="_blank"
        class="mr-1 size-[48px] overflow-hidden rounded-full font-bold no-underline"
      >
        <img :src="author.avatar" :alt="author.name" />
      </a>
      <div class="flex flex-auto flex-col justify-between">
        <div class="flex items-end justify-between">
          <a :href="author.url" target="_blank" class="text-blod text-lg">
            {{ author.name }}
          </a>
          <small>
            发布于
            {{ dayjs(post.date).format('YYYY年MM月DD日') }}
          </small>
        </div>
        <small>{{ author.desc }} </small>
      </div>
    </div>
  </header>
</template>
