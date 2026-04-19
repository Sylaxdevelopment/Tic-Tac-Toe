const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const statusDiv = document.getElementById('status');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameOver = false;

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = parseInt(cell.dataset.index);
        if (!gameOver && board[index] === null) {
            board[index] = currentPlayer;
            cell.classList.add(currentPlayer);
            const winPattern = checkWin();
            if (winPattern) {
                highlight(winPattern);
                statusDiv.textContent = `${currentPlayer} wins! 🎉`;
                gameOver = true;
            } else if (board.every(cell => cell !== null)) {
                statusDiv.textContent = 'It\'s a draw! 🤝';
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

resetButton.addEventListener('click', reset);

function reset() {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.classList.remove('X', 'O', 'win');
    });
    statusDiv.textContent = '';
    currentPlayer = 'X';
    gameOver = false;
}

function checkWin() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return winPatterns.find(pattern =>
        pattern.every(index => board[index] === currentPlayer)
    ) || false;
}

function highlight(pattern) {
    pattern.forEach(index => {
        cells[index].classList.add('win');
    });
}