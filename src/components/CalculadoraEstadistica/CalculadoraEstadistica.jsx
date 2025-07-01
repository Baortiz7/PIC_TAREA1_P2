import React, { useState } from "react";
import FichaEstadistica from "./FichaEstadistica";
import {
  calcularMedia,
  calcularMediana,
  calcularModa,
  calcularVarianzaMuestral,
  calcularVarianzaPoblacional,
  calcularDesviacion,
  calcularRango,
  calcularMinimo,
  calcularMaximo,
} from "./funcionesEstadistica";

const CalculadoraEstadistica = () => {
  const [cantidad, setCantidad] = useState("");
  const [numeros, setNumeros] = useState([]);
  const [error, setError] = useState("");
  const [resultados, setResultados] = useState(null);

  // Cuando cambia la cantidad, crea el array de inputs vacío
  const manejarCantidad = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      // solo números
      setCantidad(val);
      const cantNum = parseInt(val);
      if (!isNaN(cantNum) && cantNum > 0) {
        setNumeros(Array(cantNum).fill(""));
      } else {
        setNumeros([]);
      }
      setResultados(null);
      setError("");
    }
  };

  // Cambia el valor de un número en la posición i
  const manejarNumero = (index, valor) => {
    const nuevos = [...numeros];
    nuevos[index] = valor;
    setNumeros(nuevos);
  };

  // Calcular con los valores ingresados
  const calcular = () => {
    // Convertir a números filtrando vacíos o inválidos
    const numsParseados = numeros
      .map((n) => parseFloat(n))
      .filter((n) => !isNaN(n));

    if (numsParseados.length < 2) {
      setError("Ingrese al menos 2 valores numéricos válidos.");
      setResultados(null);
      return;
    }

    setError("");
    const res = {
      Media: calcularMedia(numsParseados),
      Mediana: calcularMediana(numsParseados),
      Moda: calcularModa(numsParseados),
      "Varianza Muestral": calcularVarianzaMuestral(numsParseados),
      "Varianza Poblacional": calcularVarianzaPoblacional(numsParseados),
      "Desviación Muestral": calcularDesviacion(numsParseados, true),
      "Desviación Poblacional": calcularDesviacion(numsParseados, false),
      Rango: calcularRango(numsParseados),
      Mínimo: calcularMinimo(numsParseados),
      Máximo: calcularMaximo(numsParseados),
    };

    setResultados(res);
  };

  const limpiar = () => {
    setCantidad("");
    setNumeros([]);
    setError("");
    setResultados(null);
  };

  return (
    <div
      style={{ padding: "20px", border: "2px solid #ccc", marginTop: "20px" }}
    >
      <h2>Calculadora Estadística</h2>

      <label>
        Cantidad de números a ingresar:
        <input
          type="text"
          value={cantidad}
          onChange={manejarCantidad}
          placeholder="Ingrese el valor"
          style={{ marginLeft: "10px", width: "115px" }}
        />
      </label>

      <div
        style={{
          marginTop: "10px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // 2 columnas iguales
          gap: "10px", // espacio entre inputs
          maxWidth: "200px", // opcional, para que no quede muy ancho
        }}
      >
        {numeros.map((num, i) => (
          <input
            key={i}
            type="number"
            value={num}
            onChange={(e) => manejarNumero(i, e.target.value)}
            placeholder={`Número ${i + 1}`}
            style={{ width: "100%" }} // que el input ocupe todo el ancho de la celda
          />
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={calcular} disabled={numeros.length < 2}>
          Calcular
        </button>
        <button onClick={limpiar} style={{ marginLeft: "10px" }}>
          Limpiar datos
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {resultados && <FichaEstadistica resultados={resultados} />}
    </div>
  );
};

export default CalculadoraEstadistica;
