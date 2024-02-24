<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter as vUseRouter } from 'vue-router';
import { useRouter } from 'vitepress';

const vRouter = vUseRouter();
const router = useRouter();
const cannyRoute = vRouter.resolve({ name: 'cannyWidget' });

router.onAfterRouteChanged = trackPageview;
window.addEventListener('message', onMessage);

function onMessage(e: MessageEvent) {
  const { origin, data } = e;

  if (!origin.includes('canny')) return;

  if (data.includes('[canny]')) {
    const msg = JSON.parse(data.replace('[canny]', ''));
    if (msg.type == 'path') {
      trackPageview(cannyRoute.path + msg.data);
    }
  }
}

function trackPageview(path: string) {
  if (window.hasOwnProperty('_hmt')) {
    window['_hmt'].push(['_trackPageview', path]);
  }
}

function loadScript() {
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?4ba49a0c57f7fbbc00269ce8700cfb0b';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
  })();
}
onMounted(() => {
  loadScript();
});
</script>
<template></template>
