<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vitepress';

const router = useRouter();

onMounted(() => {
  loadScript();

  router.onAfterRouteChanged = trackPageview;
});

function trackPageview(path: string) {
  if (window.hasOwnProperty.call('_hmt')) {
    window['_hmt'].push(['_trackPageview', path]);
  }
}

function loadScript() {}
</script>
<template>
  <span></span>
</template>
