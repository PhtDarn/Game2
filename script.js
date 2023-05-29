document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.board');
  const cells = document.querySelectorAll('.cell');
  const resetButton = document.getElementById('resetButton');

  let currentPlayer = 'X';
  let gameEnded = false;

  // Добавляем обработчики событий на каждую ячейку
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (!gameEnded && cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        checkWinCondition();
        switchPlayer();
      }
    });
  });

  // Проверяем условие победы после каждого хода
  function checkWinCondition() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтальные
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикальные
      [0, 4, 8], [2, 4, 6] // диагональные
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (cells[a].textContent === currentPlayer &&
          cells[b].textContent === currentPlayer &&
          cells[c].textContent === currentPlayer) {
        endGame(`${currentPlayer} выиграл!`);
        break;
      }
    }

    if (!gameEnded && isBoardFull()) {
      endGame('Ничья');
    }
  }

  // Переключаем игрока
  function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  // Проверяем, заполнено ли игровое поле
  function isBoardFull() {
    return Array.from(cells).every(cell => cell.textContent !== '');
  }

  // Завершаем игру и выводим сообщение
  function endGame(message) {
    gameEnded = true;
    alert(message);
  }

  // Сбрасываем игру и начинаем заново
  function resetGame() {
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
    gameEnded = false;
  }

  // Назначаем обработчик события на кнопку сброса
  resetButton.addEventListener('click', resetGame);
});