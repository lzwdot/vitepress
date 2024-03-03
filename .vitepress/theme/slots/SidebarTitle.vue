<script setup lang="ts">
import { useRoute } from 'vitepress';
import locales from './../../config/locales';

const { path } = useRoute();
const type = Object.keys(locales.vars).find((v) =>
  path.includes(v),
) as keyof typeof locales.vars;
</script>

<template>
  <h2
    class="sticky top-0 z-10 w-[calc(var(--vp-sidebar-width)-32px)] bg-[var(--vp-sidebar-bg-color);]"
    :class="type"
  >
    {{ locales.vars[type] || type }}
  </h2>
</template>
