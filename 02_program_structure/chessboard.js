/*
Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines. At each position of the grid there is either a space or a "#" character. The characters should form a chess board.

 # # # # # # # #
# # # # # # # #
 # # # # # # # #
# # # # # # # #
 # # # # # # # #
# # # # # # # #
 # # # # # # # #
# # # # # # # #

*/

function buildChessBoard(size) {
  let hashString = '';
  for (let i = 0; i < size; i++) hashString += "# ";
  for (let j = 0; j < size; j++) {
    if (j % 2 == 0) {
      process.stdout.write(" ");
    }
    console.log(hashString);
  }
}

buildChessBoard(8);
buildChessBoard(16);
