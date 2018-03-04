/*
For documentation, see http://eloquentjavascript.net/07_robot.html
*/
const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      // console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    // console.log(`Moved to ${action.direction}`);
  }
}

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
// console.log(runRobot(VillageState.random(), goalOrientedRobot, []));


/* Begin Exercises
Measuring a robot
It’s hard to objectively compare robots by just letting them solve a few scenarios. Maybe one robot just happened to get easier tasks, or the kind of tasks that it is good at, whereas the other didn’t.

Write a function compareRobots which takes two robots (and their starting memory). It should generate a hundred tasks, and let each of the robots solve each of these tasks. When done, it should output the average number of steps each robot took per task.

For the sake of fairness, make sure that you give each task to both robots, rather than generating different tasks per robot.
*/

function compareRobots(robot1, memory1, robot2, memory2) {
  let result1 = 0, result2 = 0;
  for (let testCount = 0; testCount < 1000; testCount++) {
    let testState = VillageState.random();
    result1 += runRobot(Object.create(testState), robot1, memory1);
    result2 += runRobot(testState, robot2, memory2);
  }
  console.log("result robot1", result1);
  console.log("result robot2", result2);
  console.log("robot1/robot2", result1/result2);
  if (result1 < result2) return robot1
  else return robot2
}

// console.log(compareRobots(routeRobot, [], goalOrientedRobot, []));
// → result robot1 18184
// → result robot2 14764
// → robot1/robot2 1.2316445407748577
// → [Function: goalOrientedRobot]

/*
Robot efficiency
Can you write a robot that finishes the delivery task faster than goalOrientedRobot? If you observe that robot’s behavior, what obviously stupid things does it do? How could those be improved?

If you solved the previous exercise, you might want to use your compareRobots function to verify whether you improved the robot.
*/

function myRobot ({place, parcels}, route) {
  if (route.length == 0) {
    // for each parcel, find a route
    let options = parcels.map(parcel => {
      // not at the place of the parcel, this is a pickup to be prioritized
      if (parcel.place != place) {
        return {route: findRoute(roadGraph, place, parcel.place),
                pickUp: true};
      // at the place of the parcel, this is a delivery
      } else {
        return {route: findRoute(roadGraph, place, parcel.address),
                pickUp: false};
      }
    });

    // check all routes
    for (let i=0; i < options.length; i++) {
      // if this is the first option, set it as the route
      if (route.length == 0) route = options[i].route;
      // if this option is of equal length, and is a pickUp, prioritize it
      else if (route.length >= options[i].route.length && options[i].pickUp) route = options[i].route;
      // if this option is shorter, prioritize it
      else if (route.length > options[i].route.length) route = options[i].route;
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

// console.log(runRobot(VillageState.random(), myRobot, []));

console.log(compareRobots(myRobot, [], goalOrientedRobot, []));
// → result robot1 12093
// → result robot2 14832
// → robot1/robot2 0.815331715210356
// → [Function: myRobot]

/*
Persistent group
Most data structures provided in a standard JavaScript environment aren’t very well suited for persistent use. Arrays have slice and concat methods, which allow us to easily create new arrays without damaging the old one. But Set, for example, has no methods for creating a new set with an item added or removed.

Write a new class PGroup, similar to the Group class from Chapter 6, which stores a set of values. Like Group, it has add, delete, and has methods.

Its add method, however, should return a new PGroup instance with the given member added, and leave the old one unchanged. Similarly, delete creates a new instance without a given member.

The class should work for keys of any type, not just strings. It does not have to be efficient when used with large amounts of keys.

The constructor shouldn’t be part of the class’ interface (though you’ll definitely want to use it internally). Instead, there is an empty instance, PGroup.empty, that can be used as a starting value.

Why do you only need one PGroup.empty value, rather than having a function that creates a new, empty map every time?
*/

class PGroup {
  constructor() {
    this.array = [];
  }
  static empty() {
    let x = new PGroup();
    return x
  }
  add(value) {
    let x = PGroup.empty;
    console.log(value);
  }
}
//
let a = PGroup.empty.add("a");
// let ab = a.add("b");
// let b = ab.delete("a");
//
// console.log(b.has("b"));
// // → true
// console.log(a.has("b"));
// // → false
// console.log(b.has("a"));
// // → false
