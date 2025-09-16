// 扩展 window 的属性
declare interface Window {
  $: (selector: string) => JQuery;
}

class JQuery {
  selector: string;
  length: number;
  constructor(selector: string) {
    const domList = Array.prototype.slice.call(
      document.querySelectorAll(selector),
    );
    const length = domList.length;

    for (let i = 0; i < length; i++) {
      this[i] = domList[i];
    }
    this.selector = selector;
    this.length = length;
  }
  append(el: HTMLElement): JQuery {
    // append 的操作
    return this;
  }

  addClass(className: string): JQuery {
    // 添加 class 的操作
    return this;
  }
}

// 一般使用
const $div = new JQuery('div');

// 工厂模式
function $(selector: string) {
  return new JQuery(selector); // 逻辑分装
}
window.$ = $;

const $p = $('p');
