<script lang="ts" setup>
import { defineClientComponent } from 'vitepress';

const ClientComp = defineClientComponent(() => {
  return import('./client/BdAnalytics.vue');
});
</script>

<template>
  <ClientComp />
</template>
