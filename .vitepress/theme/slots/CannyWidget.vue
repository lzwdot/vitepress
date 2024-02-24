<script setup lang="ts">
import { onMounted, watch, nextTick, ref } from 'vue';
import { useRouter as vUseRouter } from 'vue-router';
import { useData } from 'vitepress';

const vRouter = vUseRouter();
const cannyRoute = vRouter.resolve({ name: 'cannyWidget' });
const isLoaded = ref(false);
const { isDark, site, title } = useData();
const BoardToken = '5f064f41-648c-2d91-acd2-cfef5ee1e045';

watch(isDark, () => {
  nextTick(() => {
    reRender();
  });
});

function reRender() {
  Canny('render', {
    boardToken: BoardToken,
    basePath: cannyRoute.path, // See step 2
    ssoToken: null, // See step 3,
    theme: isDark.value ? 'dark' : 'light', // options: light [default], dark, auto
    onLoadCallback: () => nextTick(() => (isLoaded.value = true)),
  });
}

function loadSdk() {
  (function (w, d, i, s) {
    function l() {
      if (!d.getElementById(i)) {
        var f = d.getElementsByTagName(s)[0],
          e = d.createElement(s);
        (e.type = 'text/javascript'),
          (e.async = !0),
          (e.src = 'https://canny.io/sdk.js'),
          f.parentNode.insertBefore(e, f);
      }
    }
    if ('function' != typeof w.Canny) {
      var c = function () {
        c.q.push(arguments);
      };
      (c.q = []),
        (w.Canny = c),
        'complete' === d.readyState
          ? l()
          : w.attachEvent
            ? w.attachEvent('onload', l)
            : w.addEventListener('load', l, !1);
    }
  })(window, document, 'canny-jssdk', 'script');
}
onMounted(() => {
  loadSdk();
  reRender();

  document.title = title.value.replace('404', '反馈');
});
</script>

<template>
  <section
    data-canny
    :key="String(isDark)"
    class="mt-10 px-10"
    v-show="isLoaded"
  ></section>
  <section class="flex justify-center px-20 py-40" v-show="!isLoaded">
    <div class="w-full max-w-[960px]">
      <p class="w-9/12 animate-pulse">
        <span
          class="inline-block min-h-[1em] w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-700 opacity-50 dark:text-neutral-50"
        ></span>
      </p>
      <p class="w-12/12 animate-pulse">
        <span
          class="inline-block min-h-[1em] w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-700 opacity-50 dark:text-neutral-50"
        ></span>
      </p>
      <p class="w-6/12 animate-pulse">
        <span
          class="inline-block min-h-[1em] w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-700 opacity-50 dark:text-neutral-50"
        ></span>
      </p>
    </div>
  </section>
</template>
