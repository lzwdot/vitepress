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

function loadScript() {
  const _hmt = _hmt || [];
  (function () {
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?4ba49a0c57f7fbbc00269ce8700cfb0b';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
  })();
}
</script>
