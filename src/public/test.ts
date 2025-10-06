const obj = {};
console.log(obj.__proto__ === Object.prototype); // true

const arr = [];
console.log(arr.__proto__ === Array.prototype); // true

function Person() {}
const person = new Person();
console.log(person.__proto__ === Person.prototype); // true