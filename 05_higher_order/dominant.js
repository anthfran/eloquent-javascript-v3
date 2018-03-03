/*
Write a function that computes the dominant writing direction in a string of text. Remember that each script object has a direction property that can be "ltr" (left-to-right), "rtl" (right-to-left), or "ttb" (top-to-bottom).

The dominant direction is the direction of a majority of the characters which have a script associated with them. The characterScript and countBy functions defined earlier in the chapter are probably useful here.
*/

const SCRIPTS = require("./scripts");
function characterScriptDirection(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script.direction;
    }
  }
  return null;
}

function dominantDirection(text) {
  let result = { ltr: 0, rtl: 0 };
  for (char of text) {
    let direction = characterScriptDirection(char.codePointAt(0));
    if (direction != null) result[direction]++;
  }
  if (result.ltr > result.rtl) return "ltr"
  else return "rtl"
}
console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
