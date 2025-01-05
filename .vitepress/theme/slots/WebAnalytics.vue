<script lang="ts" setup>
import { defineClientComponent } from 'vitepress';

const ClientComp = defineClientComponent(() => {
  return import('./client/WebAnalytics.vue');
});
</script>

<template>
  <ClientComp />
</template>
