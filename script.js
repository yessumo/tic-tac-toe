document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const board = document.querySelector('.board');
    const messageDiv = document.getElementById('message');
    let currentPlayer = 'X';
    let gameActive = true;

    function handleClick(event) {
        const cell = event.target;
        if (cell.textContent === '' && gameActive) {
            cell.textContent = currentPlayer;
            if (checkWin()) {
                messageDiv.textContent = `${currentPlayer} wins!`;
                gameActive = false;
                return;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        const winningCombination = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        return winningCombination.some(combination => {
            const [a, b, c] = combination;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    function resetGame() {
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
        messageDiv.textContent = '';
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    // Add a reset button to the board
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Game';
    resetButton.addEventListener('click', resetGame);
    board.appendChild(resetButton);
});
