/*
The == operator compares objects by identity. But sometimes, you would prefer to compare the values of their actual properties.

Write a function, deepEqual, that takes two values and returns true only if they are the same value or are objects with the same properties, where the values of the properties are equal when compared with a recursive call to deepEqual.

To find out whether to compare two things by identity (use the === operator for that) or by looking at their properties, you can use the typeof operator. If it produces "object" for both values, you should do a deep comparison. But you have to take one silly exception into account: because of a historical accident, typeof null also produces "object".

The Object.keys function will be useful when you need to go over the properties of objects to compare them.
*/
function deepEqual (x, y) {
  let xKeys = Object.keys(x);
  let yKeys = Object.keys(y);
  // immediately return false if different number of keys
  if (xKeys.length != yKeys.length) return false
  for (let i = 0; i < xKeys.length; i++) {
    // verify that the keys are the same
    if (!yKeys.includes(xKeys[i])) return false
    // if a key is an object, return deepEqual of that key
    if (typeof x[xKeys[i]] == 'object' && x[xKeys[i]] != null && typeof y[xKeys[i]] == 'object' && y[xKeys[i]] != null) {
      return deepEqual(x[xKeys[i]], y[xKeys[i]]);
    } else {
      // verify key value is the same, else return false
      if (x[xKeys[i]] != y[xKeys[i]]) return false
    }
  }
  return true;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// // → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// // → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// // → true
