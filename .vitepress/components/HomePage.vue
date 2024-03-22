<script lang="ts" setup>
const links = [
  { name: '友情链接 1', url: 'https://example.com/link1' },
  { name: '友情链接 2', url: 'https://example.com/link2' },
  { name: '友情链接 3', url: 'https://example.com/link3' },
];
</script>

<template>
  <div class="links-page">
    <h1 class="page-title">友情链接</h1>
    <div class="links-list">
      <div v-for="(link, index) in links" :key="index" class="link-item">
        <a :href="link.url" target="_blank">{{ link.name }}</a>
      </div>
    </div>
  </div>
</template>

<style>
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.links-list {
  display: flex;
  flex-direction: column;
}

.link-item {
  margin-bottom: 10px;
}

.link-item a {
  color: #333;
  text-decoration: none;
}

.link-item a:hover {
  color: #007bff; /* 更换为你喜欢的链接悬停颜色 */
}
</style>
