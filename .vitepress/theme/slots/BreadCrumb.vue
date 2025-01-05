<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useData, type DefaultTheme, useRouter } from 'vitepress';
import { useSidebar } from 'vitepress/theme';
import HomeIcon from './../assets/icons/Home.vue';

const { site, page, theme } = useData();
const { path } = useRoute();
const { hasSidebar } = useSidebar();
const router = useRouter();
const getNavItem = (path: string) => {
  return theme.value.nav.find(
    (v: DefaultTheme.NavItemWithLink) =>
      v.activeMatch && path.includes(v.activeMatch),
  );
};
const second = ref(getNavItem(path)) as unknown as DefaultTheme.NavItemWithLink;
router.onAfterRouteChanged = (path) => {
  second.value = getNavItem(path);
};
</script>

<template>
  <nav v-if="hasSidebar" class="mb-5 mt-[-32px] w-full">
    <small>
      <ol class="list-reset flex">
        <li>
          <a :href="site.base" class="text-[var(--vp-c-brand-1)]">
            <HomeIcon />
          </a>
        </li>
        <li>
          <span class="mx-2 text-neutral-400">></span>
        </li>
        <li>
          <a
            :href="site.base.slice(0, -1) + second.link"
            class="text-[var(--vp-c-brand-1)]"
          >
            {{ second.text }}
          </a>
        </li>
        <li>
          <span class="mx-2 text-neutral-400">></span>
        </li>
        <li class="text-neutral-400">{{ page.title }}</li>
      </ol>
    </small>
  </nav>
</template>
