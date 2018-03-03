/*
Make the Group class from the previous exercise iterable. Refer back to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.

If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. That would work, but defeats the purpose of this exercise.

It is okay if your iterator behaves strangely when the group is modified during iteration.
*/
class Group {
  constructor () {
    this.array = [];
  }
  add(value) {
    if (!this.has(value))   this.array.push(value);
  }

  has(value) {
    return this.array.includes(value);
  }

  delete(value) {
    this.array = this.array.filter(item => item != value);
  }

  static from (array) {
    let x = new Group();
    for (let i = 0; i < array.length; i++) x.add(array[i]);
    return x;
  }
}

class GroupIterator {
    constructor(group) {
        this.group = group;
        this.item = 0;
    }

    next() {
        if (this.item == this.group.array.length) return {done: true};
        let value = this.group.array[this.item];
        this.item++;
        return {value, done: false};
    }
}

Group.prototype[Symbol.iterator] = function() {
    return new GroupIterator(this);
  }

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
