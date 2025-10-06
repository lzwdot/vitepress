const obj = {
  x: 10,
  [Symbol('y')]: 20,
};

console.log(Object.keys(obj)); // [ 'x' ]
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(y) ]
console.log(Reflect.ownKeys(obj)); // [ 'x', Symbol(y) ]