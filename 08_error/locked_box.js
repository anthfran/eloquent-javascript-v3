/*
Consider the following (rather contrived) object:
*/
const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};
/*
It is a box with a lock. There is an array in the box, but you can get at it only when the box is unlocked. Directly accessing the private _content property is forbidden.

Write a function called withBoxUnlocked that takes a function value as argument, unlocks the box, runs the function, and then ensures that the box is locked again before returning, regardless of whether the argument function returned normally or threw an exception.
*/

function withBoxUnlocked(body) {
  if (box.locked) box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});
console.log(box);
// → { locked: true,
// → unlock: [Function: unlock],
// → lock: [Function: lock],
// → _content: [ 'gold piece' ],
// → content: [Getter] }

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked);
// → true

try {
  console.log(box.content);
} catch (e) {
  console.log("Error raised:", e);
}
// → Error raised: Error: Locked!
