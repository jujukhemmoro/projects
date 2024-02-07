const cells = document.querySelectorAll('.cell');
const statusArea = document.getElementById('statusArea');
const restartButton = document.getElementById('restartButton');
let xTurn = true;

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = xTurn ? 'X' : 'O';
    cell.textContent = currentClass;
    cell.setAttribute('data-value', currentClass);
    cell.removeEventListener('click', handleClick);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
};

const startGame = () => {
    xTurn = true;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
        cell.setAttribute('data-value', '');
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    statusArea.innerText = "Player X's turn";
};

const endGame = (draw) => {
    if (draw) {
        statusArea.innerText = 'Draw!';
    } else {
        statusArea.innerText = `${xTurn ? "Player X" : "Player O"} Wins!`;
    }
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
};

const swapTurns = () => {
    xTurn = !xTurn;
    statusArea.innerText = `${xTurn ? "Player X's" : "Player O's"} turn`;
};

const setBoardHoverClass = () => {
};

const checkWin = (currentClass) => {
    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
};

restartButton.addEventListener('click', startGame);

startGame();
