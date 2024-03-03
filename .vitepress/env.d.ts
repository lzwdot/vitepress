/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}

interface ArchiveItem {
  text?: string;
  desc?: string;
  link?: string;
  date?: string;
  path?: string;
  items?: ArchiveItem[];
}
