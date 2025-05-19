const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let isGameOver = false;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleClick(e) {
  const cell = e.target;
  if (cell.textContent !== '' || isGameOver) return;

  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    isGameOver = true;
  } else if (isDraw()) {
    statusText.textContent = "It's a Tie!";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWin(player) {
  return winningCombos.some(combo => {
    return combo.every(index => cells[index].textContent === player);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  isGameOver = false;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', resetGame);
