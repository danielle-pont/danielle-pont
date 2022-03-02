document.addEventListener('DOMContentLoaded', startGame)

var restartButton;

// Define your `board` object here!
// it is an object that contains an array of objects.

var board = { cells: [] }

function makeBoard(rowSize, colSize) {
  board.cells = []
  // r (the number of rows) begins at LINE 0 and goes until 5 so there will be 5 rows
  // c refers to the number of columns, there are also 5 as will be dictated in the values
  // given to makeboard() below, which is run when the game is started ???????????????????????
  for (let r = 0; r < rowSize; r++) {

  for (let c = 0; c < colSize; c++) {
    //this is the cell object. row and col are both the properties of the cell object.
    // I want row to have the value of r (WHICH IS RUN FOR LESS THAN THE GIVEN ROW SIZE which is 0-5) same goes for col.
      const cell = {
        row: r,
        col: c,
        // isMine is a property of cell. It dictates whether the cell (there will be 25 cells made because of the value
        // given to the for loop) is a mine. I don't want to dictate this manually. math.random() module can be used so
        // that a random number of mines are on the board every refresh.
        // HOWEVER - I am just dictating this to ONE mine as it is now in the for loop (before I could have just I THINK
        // written math.random() on its own next to the individual isMine properties) and so probability must be thought of
        // here ????????????????? because math.random() only brings an integer - but this is a boolean! 
        // < 0.2 will allow for there to be a 20 percent probablility of isMine being true which means that there will also
        // be a random number of mines on the board at any refresh AND a tiny probability that all will be true. If I wrote
        // 1 instead of 0.2, it would be 100 percent probable that it would be true.
        // future reference: https://stackoverflow.com/questions/36756331/js-generate-random-boolean
        isMine: Math.random() < 0.2,
        hidden: true
      }
      board.cells.push(cell)
    }
  }
}

// ****************must make below into a loop*********************************************
// var board = {
//   cells: [{isMine: false, hidden: false, row: 0, col: 0 },]}
// *****************************************************************************************



function startGame () {



  //call checkForWin every time the left mouse button is clicked
  document.addEventListener ("click", checkForWin)
  //right mouse button (contextmenu) is clicked (the right mouse click allows for the mine to be found making user win)
  document.addEventListener ("contextmenu", checkForWin)




  // "This should loop through the contents of board.cells - Remember, board.cells is an array of objects."
  // the '.length' function loops through the given length of the array. It will go through once.


    makeBoard(5, 5)

      // Don't remove this function call: it makes the game work!
    lib.initBoard()
    const cellsIndex = board.cells
    for (let i = 0; i < cellsIndex.length; i++) {
      cellsIndex[i].surroundingMines = countSurroundingMines(cellsIndex[i])
    }
  }


  function refreshPage(){
    window.location.reload();
} 
  // restartButton = document.getElementById("restartButton");
  // // listening for click event for the button
  // restartButton.addEventListener("click", gameRestart);



// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
// this needs to loop through all of board.cells to see if both .isMine and .isMarked are true
// If any mine still exists that isn't marked, the player hasn't won yet and you can return to exit out of the function
// AND If every mine is marked, but there are still cells with the hidden property set to true,
// the player hasn't won yet and you can return out of the function
// If both these criteria pass, the player has won
// There's a displayMessage function call at the bottom of checkForWin you can use to tell them so
function checkForWin() {
  for (let i = 0; i < board["cells"].length; i++) {
    const cell = board["cells"][i];
    if ((cell.isMine && !cell.isMarked) || (!cell.isMine && cell.hidden)) {
      return;
    }
  }
  lib.displayMessage("Thanks!");
}


// function checkForWin () {
//   for (let i = 0; i < board.cells.length; i++) {
//     if (cell.isMine && !cell.isMarked) {
//       return
//     }
//     else if (cell.isMine && cell.hidden) {
//       return
//     }

//   }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
//     lib.displayMessage('You win!')
// }

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  //getting the surrounding cells
  let surrounding = lib.getSurroundingCells(cell.row, cell.col);

  let count = 0;

  for (let i = 0; i < surrounding.length; i++) {
    surrounding[i].isMine ? count += 1 : count;
  }
  return count;
}

