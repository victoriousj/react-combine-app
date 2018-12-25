export default () => ({
  checkGameBoard: gameBoard => {
    let winningPeices = [];
    // vertical
    for (let columnIndex = 0; columnIndex <= 6; columnIndex++) {
      const column = gameBoard[columnIndex];

      for (let cellIndex = 0; cellIndex <= 2; cellIndex++) {
        if (column[cellIndex] === 0) continue;

        const verticalGroup = [
          column[cellIndex],
          column[cellIndex + 1],
          column[cellIndex + 2],
          column[cellIndex + 3],
        ];

        if (areIdentical(verticalGroup)) {
          winningPeices = [
            { column: columnIndex, row: cellIndex + 0 },
            { column: columnIndex, row: cellIndex + 1 },
            { column: columnIndex, row: cellIndex + 2 },
            { column: columnIndex, row: cellIndex + 3 },
          ];
        }
      }
    }

    // horizontal
    for (let rowIndex = 5; rowIndex >= 0; rowIndex--) {
      const rows = gameBoard.map((column, i) => [column[rowIndex], i]);

      for (let cellIndex = 0; cellIndex <= 3; cellIndex++) {
        if (rows[cellIndex][0] === 0) continue;

        const horizontalGroup = [
          rows[cellIndex + 0][0],
          rows[cellIndex + 1][0],
          rows[cellIndex + 2][0],
          rows[cellIndex + 3][0],
        ];

        if (areIdentical(horizontalGroup)) {
          winningPeices = [
            ...winningPeices,
            { column: rows[cellIndex + 0][1], row: rowIndex },
            { column: rows[cellIndex + 1][1], row: rowIndex },
            { column: rows[cellIndex + 2][1], row: rowIndex },
            { column: rows[cellIndex + 3][1], row: rowIndex },
          ];
        }
      }
    }

    // diagonal, up-to-the-right
    for (let diagonalYIndex = 0; diagonalYIndex <= 3; diagonalYIndex++) {
      for (
        let diagonalGroupXIndex = 0;
        diagonalGroupXIndex <= 2;
        diagonalGroupXIndex++
      ) {
        if (gameBoard[diagonalYIndex][diagonalGroupXIndex] === 0) continue;

        const diagonalGroup = [
          gameBoard[diagonalYIndex + 0][diagonalGroupXIndex + 0],
          gameBoard[diagonalYIndex + 1][diagonalGroupXIndex + 1],
          gameBoard[diagonalYIndex + 2][diagonalGroupXIndex + 2],
          gameBoard[diagonalYIndex + 3][diagonalGroupXIndex + 3],
        ];

        if (areIdentical(diagonalGroup)) {
          winningPeices = [
            ...winningPeices,
            { column: diagonalYIndex + 0, row: diagonalGroupXIndex + 0 },
            { column: diagonalYIndex + 1, row: diagonalGroupXIndex + 1 },
            { column: diagonalYIndex + 2, row: diagonalGroupXIndex + 2 },
            { column: diagonalYIndex + 3, row: diagonalGroupXIndex + 3 },
          ];
        }
      }
    }

    // diagonal down-to-the-right
    for (let diagonalYIndex = 0; diagonalYIndex <= 3; diagonalYIndex++) {
      for (
        let diagonalGroupXIndex = 6;
        diagonalGroupXIndex >= 0;
        diagonalGroupXIndex--
      ) {
        if (gameBoard[diagonalYIndex][diagonalGroupXIndex] === 0) continue;

        const diagonalGroup = [
          gameBoard[diagonalYIndex + 0][diagonalGroupXIndex - 0],
          gameBoard[diagonalYIndex + 1][diagonalGroupXIndex - 1],
          gameBoard[diagonalYIndex + 2][diagonalGroupXIndex - 2],
          gameBoard[diagonalYIndex + 3][diagonalGroupXIndex - 3],
        ];

        if (areIdentical(diagonalGroup)) {
          winningPeices = [
            ...winningPeices,
            { column: diagonalYIndex + 0, row: diagonalGroupXIndex - 0 },
            { column: diagonalYIndex + 1, row: diagonalGroupXIndex - 1 },
            { column: diagonalYIndex + 2, row: diagonalGroupXIndex - 2 },
            { column: diagonalYIndex + 3, row: diagonalGroupXIndex - 3 },
          ];
        }
      }
      if (winningPeices.length > 0) return winningPeices;
    }
  },
});

const areIdentical = arr => arr.every(v => v === arr[0]);
