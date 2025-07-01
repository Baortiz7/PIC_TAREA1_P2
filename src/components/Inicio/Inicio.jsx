import React from 'react';

const Inicio = () => {
  return (
    <section className="inventario"> {/* reutilizo estilo de caja blanca con sombra */}
      <h1>Bienvenida</h1>
      <p>
        Bienvenidos al sistema de componentes React desarrollado para la asignatura de <b>Programación Integrativa de Componentes</b>.
      </p>
      <p>
        Este proyecto está conformado por tres módulos principales, implementados como componentes funcionales en React.js:
      </p>
      <ul>
        <li>
          <b>Calculadora Estadística:</b> Permite a los usuarios ingresar datos numéricos y realizar análisis estadísticos básicos como media, mediana, moda, varianza y desviación estándar, proporcionando resultados claros y visualmente accesibles.
        </li>
        <li>
          <b>Sistema de Resolución de Ecuaciones Lineales 3x3:</b> Facilita la solución interactiva de sistemas de ecuaciones mediante la regla de Cramer, permitiendo el ingreso de coeficientes y visualización paso a paso de los cálculos.
        </li>
        <li>
          <b>Gestión de Inventario:</b> Un módulo para administrar productos, controlar cantidades y actualizar información en tiempo real, diseñado para apoyar la gestión eficiente en un entorno empresarial.
        </li>
      </ul>
      <p>
        El objetivo de este trabajo es ofrecer herramientas educativas e interactivas que contribuyan al aprendizaje y aplicación práctica de conceptos matemáticos y administrativos, utilizando una arquitectura basada en componentes reutilizables de React.js, en un entorno web moderno, intuitivo y eficiente.
      </p>
    </section>
  );
};

export default Inicio;
