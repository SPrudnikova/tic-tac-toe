class TicTacToe {
    constructor() {
        this._field = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this._firstSymbol = 'x';
        this._secondSymbol = 'o';
        this._currentPlayerSymbol = 'x';
    }

    getCurrentPlayerSymbol() {

        return this._currentPlayerSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if (!this._field[rowIndex][columnIndex]) {
            const currentPlayerSymbol = this.getCurrentPlayerSymbol();
            this._field[rowIndex][columnIndex] = currentPlayerSymbol;
            this._currentPlayerSymbol = currentPlayerSymbol === this._firstSymbol ? this._secondSymbol : this._firstSymbol;
        }
    }

    getWinner() {
        //check main diagonal
        const mainDiagonal = this._field[0].map((cell, index) => this._field[index][index]);
        if ([...new Set(mainDiagonal)].length === 1) {
            return mainDiagonal[0];
        }

        //check secondary diagonal
        const secondaryDiagonal = this._field[0].map((cell, index, array) => this._field[index][array.length - 1 - index]);
        if ([...new Set(secondaryDiagonal)].length === 1) {
            return secondaryDiagonal[0];
        }

        //check vertical and horizontal
        const rowAndColumnLength = this._field[0].length;
        for (let i = 0; i < rowAndColumnLength; i++) {
            const row = this._field[0].map((cell, index) => this._field[i][index]);

            if ([...new Set(row)].length === 1) {
                return row[0];
            }

            const column = this._field[0].map((cell, index) => this._field[index][i]);
            if ([...new Set(column)].length === 1) {
                return column[0];
            }
        }

        return null;
    }

    noMoreTurns() {
        const emptyCells = [].concat.apply([],this._field).filter(cell => cell === null);
        return !emptyCells.length;
    }

    isDraw() {
        return this.noMoreTurns() && !this.getWinner();
    }

    isFinished() {
        return this.isDraw() || !!this.getWinner();
    }

    getFieldValue(rowIndex, colIndex) {
        return this._field[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
