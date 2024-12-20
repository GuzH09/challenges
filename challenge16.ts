// Los elfos están trabajando arduamente para limpiar los caminos llenos de nieve mágica ❄️. Esta nieve tiene una propiedad especial: si dos montículos de nieve idénticos y adyacentes se encuentran, desaparecen automáticamente.

// Tu tarea es escribir una función que ayude a los elfos a simular este proceso. El camino se representa por una cadena de texto y cada montículo de nieve un carácter.

// Tienes que eliminar todos los montículos de nieve adyacentes que sean iguales hasta que no queden más movimientos posibles.

// El resultado debe ser el camino final después de haber eliminado todos los montículos duplicados:

// removeSnow('zxxzoz') // -> "oz"
// // 1. Eliminamos "xx", quedando "zzoz"
// // 2. Eliminamos "zz", quedando "oz"

// removeSnow('abcdd') // -> "abc"
// // 1. Eliminamos "dd", quedando "abc"

// removeSnow('zzz') // -> "z"
// // 1. Eliminamos "zz", quedando "z"

// removeSnow('a') // -> "a"
// // No hay montículos repetidos

function removeSnow(s: string): string {
  const regex = /([A-Za-z])\1(?!\1)/;
  let snow = s;
  while ( snow.match(regex) ) {
    let res = snow.match(regex)[0];
    let idx = snow.indexOf(res);
    const totalPhrase = snow.split("");
    totalPhrase.splice(idx, res.length);
    snow = totalPhrase.join("");
  }
  return snow;
}