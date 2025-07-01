import React, { useState } from 'react';
import FichaProducto from './FichaProducto';

const Inventario = () => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Cuadernos", cantidad: 3, precio: 0.8 },
    { id: 2, nombre: "Esferos", cantidad: 1, precio: 1 }
  ]);

  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', cantidad: '0', precio: '0' });
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  const siguienteId = productos.length > 0
    ? Math.max(...productos.map(p => p.id)) + 1
    : 1;

  const esValido = () => {
    const nombre = nuevoProducto.nombre.trim();
    const cantidad = parseFloat(nuevoProducto.cantidad);
    const precio = parseFloat(nuevoProducto.precio);

    if (nombre === '') return "El nombre no puede estar vacío.";
    if (productos.some(p => p.nombre.toLowerCase() === nombre.toLowerCase())) return "Ese nombre ya existe, ingrese otro diferente.";
    if (isNaN(cantidad) || cantidad <= 0) return "La cantidad debe ser mayor a 0.";
    if (isNaN(precio) || precio <= 0) return "El precio debe ser mayor a 0.";

    return "";
  };

  const agregarProducto = () => {
    const error = esValido();
    if (error !== "") {
      setMensaje(error);
      setTipoMensaje('error');
      return;
    }

    setProductos([
      ...productos,
      {
        id: siguienteId,
        nombre: nuevoProducto.nombre.trim(),
        cantidad: parseInt(nuevoProducto.cantidad),
        precio: parseFloat(nuevoProducto.precio)
      }
    ]);
    setNuevoProducto({ nombre: '', cantidad: '0', precio: '0' });
    setMensaje("Producto agregado correctamente");
    setTipoMensaje('exito');
  };

  const actualizarProducto = (id, nombre, cantidad, precio) => {
    const nombreTrim = nombre.trim();
    const cantidadNum = parseFloat(cantidad);
    const precioNum = parseFloat(precio);

    if (nombreTrim === '' || cantidadNum <= 0 || precioNum <= 0) {
      setMensaje("Error al actualizar: el nombre no debe estar vacío y la cantidad/precio deben ser mayores a 0.");
      setTipoMensaje('error');
      return;
    }

    const nombreDuplicado = productos.some(p => p.id !== id && p.nombre.toLowerCase() === nombreTrim.toLowerCase());
    if (nombreDuplicado) {
      setMensaje("Error al actualizar: ese nombre ya está en uso por otro producto.");
      setTipoMensaje('error');
      return;
    }

    setProductos(productos.map(p =>
      p.id === id ? { ...p, nombre: nombreTrim, cantidad: cantidadNum, precio: precioNum } : p
    ));
    setMensaje("Producto actualizado correctamente");
    setTipoMensaje('exito');
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
    setMensaje("Producto eliminado correctamente");
    setTipoMensaje('exito');
  };

  return (
    <div className="inventario">
      <h2>Gestión de Inventario</h2>
      {mensaje && (
        <p style={{ color: tipoMensaje === 'error' ? 'red' : 'green' }}>{mensaje}</p>
      )}

      <FichaProducto
        productos={productos}
        nuevoProducto={nuevoProducto}
        setNuevoProducto={setNuevoProducto}
        agregarProducto={agregarProducto}
        siguienteId={siguienteId}
        actualizarProducto={actualizarProducto}
        eliminarProducto={eliminarProducto}
      />
    </div>
  );
};

export default Inventario;