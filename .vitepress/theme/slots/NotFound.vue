<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRouter as vUseRouter } from 'vue-router';
import NotFound from 'vitepress/dist/client/theme-default/NotFound.vue';

const vRouter = vUseRouter();
const isNotFound = ref(false);

onMounted(() => {
  nextTick(() => {
    if (!vRouter.currentRoute.value.matched.length) {
      isNotFound.value = true;
    }
  });
});
</script>

<template>
  <NotFound v-if="isNotFound"></NotFound>
  <RouterView v-else></RouterView>
</template>
