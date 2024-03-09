<script setup lang="ts">
import { useRoute } from 'vitepress';

const { path } = useRoute();
</script>

<template>
  <div :class="{ post: path?.includes('post') }"></div>
</template>
