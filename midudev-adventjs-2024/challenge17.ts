// El Grinch ha estado haciendo de las suyas en el Polo Norte y ha sembrado bombas de carbón explosivo 💣 en la fábrica de juguetes de los duendes. Quiere que todos los juguetes queden inutilizados y por eso ha dejado una cuadrícula donde algunas celdas tienen carbón explosivo (true) y otras están vacías (false).

// Los duendes necesitan tu ayuda para mapear las zonas peligrosas. Cada celda vacía debe mostrar un número que indique cuántas bombas de carbón explosivo hay en las posiciones adyacentes, incluidas las diagonales.

// detectBombs([
//   [true, false, false],
//   [false, true, false],
//   [false, false, false]
// ])
// // [
// //   [1, 2, 1],
// //   [2, 1, 1],
// //   [1, 1, 1]
// // ]

// detectBombs([
//   [true, false],
//   [false, false]
// ])
// // [
// //   [0, 1],
// //   [1, 1]
// // ]

// detectBombs([
//   [true, true],
//   [false, false],
//   [true, true]
// ])

// // [
// //   [1, 1],
// //   [4, 4],
// //   [1, 1]
// // ]
// Nota: ¿Quieres una pista? Seguro que has jugado al juego de buscaminas antes… 😉

function detectBombs(grid: boolean[][]): number[][] {
  const newArray: number[][] = [];

  for (let yIndex=0; yIndex<grid.length; yIndex++) {
    let localRow: number[] = [];

    for (let xIndex=0; xIndex<grid[yIndex].length; xIndex++) {
      let localSum = 0;

      const localYIndex: number = yIndex - 1
      const localYStop: number = yIndex + 2

      const localXIndex: number = xIndex - 1
      const localXStop: number = xIndex + 2

      for (let _yIndex=localYIndex; _yIndex<localYStop; _yIndex++) {
        if (_yIndex < 0 || _yIndex > grid.length - 1) continue

        for (let _xIndex=localXIndex; _xIndex<localXStop; _xIndex++) {
          if (_xIndex < 0 || _xIndex > grid[yIndex].length - 1) continue
          if (_xIndex == xIndex && _yIndex == yIndex) continue

          if ( ( grid[_yIndex]?.[_xIndex] ) == true ) localSum += 1;
        }
      }

      localRow.push(localSum);
    }
    newArray.push(localRow);
  }

  return newArray;
}