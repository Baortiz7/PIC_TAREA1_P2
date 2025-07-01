// SistemasEcuaciones3x3.tsx - Componente React
import React, { useState } from 'react';
import { resolverSistema } from './matematicas';

const SistemaEcuaciones3x3: React.FC = () => {
  // Estados para los coeficientes
  const [coeficientes, setCoeficientes] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  
  // Estados para términos independientes
  const [terminos, setTerminos] = useState<string[]>(['', '', '']);
  
  // Estados para resultados
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState<string>('');

  // Cambiar coeficiente
  const cambiarCoeficiente = (fila: number, columna: number, valor: string): void => {
    const nuevos: string[][] = [...coeficientes];
    nuevos[fila][columna] = valor;
    setCoeficientes(nuevos);
  };

  // Cambiar término
  const cambiarTermino = (indice: number, valor: string): void => {
    const nuevos: string[] = [...terminos];
    nuevos[indice] = valor;
    setTerminos(nuevos);
  };

  // Resolver el sistema
  const resolver = (): void => {
    // Verificar que todos los campos estén llenos
    let todoLleno: boolean = true;
    
    coeficientes.forEach(fila => {
      fila.forEach(coef => {
        if (coef === '' || isNaN(Number(coef))) todoLleno = false;
      });
    });
    
    terminos.forEach(termino => {
      if (termino === '' || isNaN(Number(termino))) todoLleno = false;
    });
    
    if (!todoLleno) {
      setError('Complete todos los campos con números válidos');
      setResultado(null);
      return;
    }
    
    // Resolver
    const solucion = resolverSistema(coeficientes, terminos);
    
    if (solucion.error) {
      setError(solucion.error);
      setResultado(null);
    } else {
      setError('');
      setResultado(solucion);
    }
  };

  // Limpiar todo
  const limpiar = (): void => {
    setCoeficientes([['', '', ''], ['', '', ''], ['', '', '']]);
    setTerminos(['', '', '']);
    setResultado(null);
    setError('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Sistema de Ecuaciones 3x3</h2>
      
      <h3>Coeficientes:</h3>
      <table border={1} cellPadding="10" cellSpacing="0">
        <tbody>
          {coeficientes.map((fila, i) => (
            <tr key={i}>
              {fila.map((coef, j) => (
                <td key={j}>
                  <input
                    type="number"
                    value={coef}
                    onChange={(e) => cambiarCoeficiente(i, j, e.target.value)}
                    placeholder={`a${i+1}${j+1}`}
                    style={{ width: '60px', textAlign: 'center' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <h3>Términos independientes:</h3>
      <table border={1} cellPadding="10" cellSpacing="0">
        <tbody>
          <tr>
            {terminos.map((termino, i) => (
              <td key={i}>
                <input
                  type="number"
                  value={termino}
                  onChange={(e) => cambiarTermino(i, e.target.value)}
                  placeholder={`b${i+1}`}
                  style={{ width: '60px', textAlign: 'center' }}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      
      <div style={{ margin: '20px 0' }}>
        <button onClick={resolver} style={{ marginRight: '10px', padding: '10px 20px' }}>
          Resolver
        </button>
        <button onClick={limpiar} style={{ padding: '10px 20px' }}>
          Limpiar
        </button>
      </div>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {resultado && (
        <div style={{ border: '1px solid #ccc', padding: '15px', backgroundColor: '#f9f9f9' }}>
          <h3>Solución:</h3>
          <p><strong>x = {resultado.x.toFixed(4)}</strong></p>
          <p><strong>y = {resultado.y.toFixed(4)}</strong></p>
          <p><strong>z = {resultado.z.toFixed(4)}</strong></p>
          
          <h4>Determinantes:</h4>
          <p>det(A) = {resultado.detA.toFixed(4)}</p>
          <p>det(Ax) = {resultado.detX.toFixed(4)}</p>
          <p>det(Ay) = {resultado.detY.toFixed(4)}</p>
          <p>det(Az) = {resultado.detZ.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
};

export default SistemaEcuaciones3x3;
