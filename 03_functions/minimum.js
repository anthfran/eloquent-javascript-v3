/*
The previous chapter introduced the standard function Math.min that returns its smallest argument. We can build something like that now. Write a function min that takes two arguments and returns their minimum.

// Your code here.

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10
*/

function min (n, m) {
  if (n < m) return n;
  else return m;
}

console.log(min(0, 10));
console.log(min(0, -10));
