<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const stdout = ref('');
const codeRef = ref<HTMLElement>();
const iframeRef = ref<HTMLIFrameElement>();

onMounted(() => {
  const iframeDoc = iframeRef.value?.contentWindow?.document;
  if (iframeDoc) {
    let content = codeRef?.value?.textContent;
    // 去掉 html 标签
    const langTag = 'js';
    if (content?.trim().startsWith(langTag)) {
      content = content.trim().substring(langTag.length);
    }
    const contentLog = `
    <script>
      const logs = [];
      console.oldLog = console.log;
      console.log = function (...str) {
        console.oldLog(str);
        logs.push(str.map(v=>String(v)).join(' '));
      };  
      ${content};
      setTimeout(()=>{
        for (let i = 0; i < logs.length; i++) {
          document.write('> ', logs[i], '<br/>');
        }
        document.write('>');
      });
    <\/script>  
    `;

    // 把 slot 内容写入 iframe 里面
    iframeDoc.open();
    iframeDoc.write(contentLog);
    iframeDoc.close();

    // 获取控制台输出内容
    setTimeout(() => {
      stdout.value = iframeDoc.body.innerHTML;
    });
  }
});
</script>

<template>
  <section class="jsDemo">
    <header ref="codeRef">
      <slot></slot>
    </header>
    <iframe ref="iframeRef"></iframe>
    <details open="true" class="details custom-block" v-if="stdout">
      <summary>输出结果</summary>
      <pre class="consoleLog" v-html="stdout"></pre>
    </details>
  </section>
</template>

<style lang="scss" scoped>
.jsDemo {
  margin-bottom: 30px;
  iframe {
    display: none;
  }
  & > * {
    margin: 0 !important;
  }
  details {
    margin-top: -20px !important;
    border-radius: 0 0 8px 8px;
    summary {
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
    }
    .consoleLog {
      background: #1c1e21;
      color: #f5f6f7;
      padding: 10px;
    }
  }
}
</style>
