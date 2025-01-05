// Los elfos están jugando con un tren 🚂 mágico que transporta regalos. Este tren se mueve en un tablero representado por un array de strings.

// El tren está compuesto por una locomotora (@), seguida de sus vagones (o), y debe recoger frutas mágicas (*) que le sirve de combustible. El movimiento del tren sigue las siguientes reglas:

// Recibirás dos parámetros board y mov.

// board es un array de strings que representa el tablero:

// @ es la locomotora del tren.
// o son los vagones del tren.
// * es una fruta mágica.
// · son espacios vacíos.
// mov es un string que indica el próximo movimiento del tren desde la cabeza del tren @:

// 'L': izquierda
// 'R': derecha
// 'U': arriba
// 'D': abajo.
// Con esta información, debes devolver una cadena de texto:

// 'crash': Si el tren choca contra los bordes del tablero o contra sí mismo.
// 'eat': Si el tren recoge una fruta mágica (*).
// 'none': Si avanza sin chocar ni recoger ninguna fruta mágica.
// Ejemplo:

// const board = [
//   '·····',
//   '*····',
//   '@····',
//   'o····',
//   'o····'
// ]

// console.log(moveTrain(board, 'U'))
// // ➞ 'eat'
// // Porque el tren se mueve hacia arriba y encuentra una fruta mágica

// console.log(moveTrain(board, 'D'))
// // ➞ 'crash'
// // El tren se mueve hacia abajo y la cabeza se choca consigo mismo

// console.log(moveTrain(board, 'L'))
// // ➞ 'crash'
// // El tren se mueve a la izquierda y se choca contra la pared

// console.log(moveTrain(board, 'R'))
// // ➞ 'none'
// // El tren se mueve hacia derecha y hay un espacio vacío en la derecha

type Board = string[]
type Movement = 'U' | 'D' | 'R' | 'L'
type Result = 'none' | 'crash' | 'eat'

function moveTrain(board: Board, mov: Movement): Result {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const headIndex = board[rowIndex].indexOf('@')

    if ( headIndex > -1 ) {
      let auxStr = ""

      switch ( mov ) {
        case 'U':
          auxStr = board[rowIndex - 1]?.[headIndex];
        break;
        
        case 'D':
          auxStr = board[rowIndex + 1]?.[headIndex];
        break;

        case 'L':
          auxStr = board[rowIndex]?.[headIndex - 1];
        break;

        case 'R':
          auxStr = board[rowIndex]?.[headIndex + 1];
        break;
      }

      switch (auxStr) {
        case '·': {
          return "none"
        }

        case undefined:
        case '@':
        case 'o': {
          return "crash"
        }

        case '*': {
          return "eat"
        }       
      }
    }
  }

  return 'none';
}