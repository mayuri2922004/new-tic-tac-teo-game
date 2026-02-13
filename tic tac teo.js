const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if(gameActive) statusText.textContent = `Turn: ${currentPlayer}`;
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a,b,c] = condition;
    if (board[a] === '' || board[b] === '' || board[c] === '') continue;
    if (board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Turn: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initial status
statusText.textContent = `Turn: ${currentPlayer}`;
sss