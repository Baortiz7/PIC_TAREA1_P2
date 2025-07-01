// matematicas.js - Funciones simples para cálculos

// Calcular determinante de matriz 3x3
export const calcularDeterminante = (matriz) => {
  const a = parseFloat(matriz[0][0]);
  const b = parseFloat(matriz[0][1]);
  const c = parseFloat(matriz[0][2]);
  const d = parseFloat(matriz[1][0]);
  const e = parseFloat(matriz[1][1]);
  const f = parseFloat(matriz[1][2]);
  const g = parseFloat(matriz[2][0]);
  const h = parseFloat(matriz[2][1]);
  const i = parseFloat(matriz[2][2]);

  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
};

// Resolver sistema usando regla de Cramer
export const resolverSistema = (coeficientes, terminos) => {
  // Convertir a números
  const matriz = coeficientes.map(fila => fila.map(val => parseFloat(val)));
  const b = terminos.map(val => parseFloat(val));

  // Calcular determinante principal
  const detA = calcularDeterminante(coeficientes);

  if (Math.abs(detA) < 0.000001) {
    return { error: "El sistema no tiene solución única" };
  }

  // Crear matrices para cada variable
  const matrizX = [
    [terminos[0], coeficientes[0][1], coeficientes[0][2]],
    [terminos[1], coeficientes[1][1], coeficientes[1][2]],
    [terminos[2], coeficientes[2][1], coeficientes[2][2]]
  ];

  const matrizY = [
    [coeficientes[0][0], terminos[0], coeficientes[0][2]],
    [coeficientes[1][0], terminos[1], coeficientes[1][2]],
    [coeficientes[2][0], terminos[2], coeficientes[2][2]]
  ];

  const matrizZ = [
    [coeficientes[0][0], coeficientes[0][1], terminos[0]],
    [coeficientes[1][0], coeficientes[1][1], terminos[1]],
    [coeficientes[2][0], coeficientes[2][1], terminos[2]]
  ];

  // Calcular determinantes
  const detX = calcularDeterminante(matrizX);
  const detY = calcularDeterminante(matrizY);
  const detZ = calcularDeterminante(matrizZ);

  // Calcular solución
  const x = detX / detA;
  const y = detY / detA;
  const z = detZ / detA;

  return { x, y, z, detA, detX, detY, detZ };
};
