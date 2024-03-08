const arr1 = [1, 3, 2, 'a', 'b'];

const arr2 = arr1.sort((a, b) => {
  console.log(a, b, a > b ? 1 : -1);

  return a < b ? 1 : -1;
});

console.log(arr2);
