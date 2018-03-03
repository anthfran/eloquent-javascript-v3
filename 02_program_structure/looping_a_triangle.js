/*
Write a loop that makes seven calls to console.log to output the following triangle:

#
##
###
####
#####
######
#######
*/

// for loops
for (let i=1; i<8; i++) {
  let hashString ='';
  for (let j=0; j < i; j++) {
    hashString += '#';
  }
  console.log(hashString);
}

// while loops
let n = 1;
while (n < 8) {
  let k = 0;
  let hashString = '';
  while (k < n) {
    hashString += '#';
    k++;
  }
  console.log(hashString);
  n++;
}

// do while loops

let m = 1;
do {
  let k = 0;
  let hashString = '';
  do {
    hashString += '#';
    k++;
  } while (k < m)
  console.log(hashString);
  m++;
} while (m < 8);
