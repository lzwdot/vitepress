<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useData } from 'vitepress';

const { title } = useData();
const height = ref(0);
const code = ref('');
const codeRef = ref<HTMLElement>();
const iframeRef = ref<HTMLIFrameElement>();

function openWin() {
  const win = window?.open('');
  if (win) {
    win.focus();

    // 把 slot 内容写入 iframe 里面
    win.document.write(
      `<style>html,body{margin:0;padding:0}</style>${code.value}`,
    );
    win.document.title = `代码在线运行 | ${title.value}`;

    win.document.close();
  }
}

onMounted(() => {
  const iframeDoc = iframeRef.value?.contentWindow?.document;
  if (iframeDoc) {
    let content = codeRef?.value?.textContent;
    // 去掉 html 标签
    const langTag = 'html';
    if (content?.trim().startsWith(langTag)) {
      content = content.trim().substring(langTag.length);
    }
    code.value = content || '';
    // 把 slot 内容写入 iframe 里面
    iframeDoc.open();
    iframeDoc.write(`<style>html,body{margin:0;padding:0}</style>${content}`);
    iframeDoc.close();
    // 高度等于内容高度
    if (iframeRef?.value) {
      iframeRef.value.onload = () => {
        height.value = height.value + iframeDoc.body.scrollHeight + 20;
      };
    }
  }
});
</script>
<template>
  <section class="htmlDemo">
    <header>
      <code>源码预览</code>
      <a @click="openWin">打开窗口</a>
    </header>
    <iframe
      ref="iframeRef"
      :height="height"
      frameBorder="0"
      scrolling="no"
      allowFullScreen="true"
      width="100%"
    ></iframe>
    <details class="details custom-block">
      <summary>查看源码</summary>
      <div ref="codeRef">
        <slot></slot>
      </div>
    </details>
  </section>
</template>

<style lang="scss" scoped>
.htmlDemo {
  margin-bottom: 30px;
  iframe {
    /* 网格效果 */
    background-image: linear-gradient(to right, #eee 1px, transparent 1px),
      linear-gradient(to bottom, #eee 1px, transparent 1px);
    /* 网格大小 */
    background-size: 10px 10px;
    /* 设置右边和底部边框 */
    border: 1px solid #eee;
    border-left: none;
    border-top: none;
    box-sizing: border-box;
    padding: 10px;
    min-height: 300px;
  }
  & > * {
    margin: 0 !important;
  }
  header {
    display: flex;
    justify-content: space-between;
    & > a {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  details {
    border-radius: 0 0 8px 8px;
    summary {
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
    }
  }
}
</style>
