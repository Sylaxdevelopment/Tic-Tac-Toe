const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = Array(9).fill(null);

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = parseInt(cell.dataset.index);
        if (board[index] === null) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWin()) {
                alert(`${currentPlayer} wins!`);
                reset();
            } else if (board.every(cell => cell !== null)) {
                alert('Draw!');
                reset();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

resetButton.addEventListener('click', reset);

function reset() {
    board = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

function checkWin() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
    );
}