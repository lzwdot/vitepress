<script lang="ts" setup>
import { useSlots } from 'vue';
import { defineClientComponent } from 'vitepress';

const slots = useSlots();
const ClientComp = defineClientComponent(
  () => import('./client/HtmlDemo.vue'),
  [
    {},
    {
      default: () => slots.default(),
    },
  ],
);
</script>

<template>
  <ClientComp>
    <slot></slot>
  </ClientComp>
</template>
