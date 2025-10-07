// 普通写法
function log1() {
  console.log('记录日志');
}

class Foo1 {
  fn() {
    log1();
    console.log('业务功能-点赞');
  }
}
const foo1 = new Foo1();
console.log(foo1.fn());

// 装饰器写法
function log2(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const oldMethod = descriptor.value; // 保存原有 fn 方法
  
  // 重写 Foo2.fn 方法
  descriptor.value = function() {
    console.log('记录日志');
    return oldMethod.apply(this, arguments);
  };
  
  return descriptor;
}

class Foo2 {
  @log2
  fn() {
    console.log('业务功能-点赞');
  }
}

const foo2 = new Foo2();
console.log(foo2.fn());