// src/components/Admin/Reservas/ReservasFiltros.jsx
import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import './ReservasFiltros.css';

const ReservasFiltros = ({ filtros, setFiltros }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      fechaServicio: '',
      tipoReserva: 'todos',
      busqueda: ''
    });
  };

  const hayFiltros =
    filtros.fechaServicio ||
    filtros.tipoReserva !== 'todos' ||
    filtros.busqueda;

  return (
    <div className="reservas-filtros">
      <div className="filtros-grid">

        <div className="filtro-group">
          <label>Fecha del servicio</label>
          <input
            type="date"
            name="fechaServicio"
            value={filtros.fechaServicio}
            onChange={handleChange}
          />
        </div>

        <div className="filtro-group">
          <label>Tipo de reserva</label>
          <select
            name="tipoReserva"
            value={filtros.tipoReserva}
            onChange={handleChange}
          >
            <option value="todos">Todos</option>
            <option value="programada">Punto a punto</option>
            <option value="horas">Por horas</option>
          </select>
        </div>

        <div className="filtro-group search-group">
          <label>Buscar</label>
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              name="busqueda"
              placeholder="Nombre, email, teléfono, DNI..."
              value={filtros.busqueda}
              onChange={handleChange}
            />
            {filtros.busqueda && (
              <button
                className="clear-search"
                onClick={() => setFiltros(prev => ({ ...prev, busqueda: '' }))}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

      </div>

      {hayFiltros && (
        <button className="btn-limpiar" onClick={limpiarFiltros}>
          <Filter size={14} />
          Limpiar filtros
        </button>
      )}
    </div>
  );
};

export default ReservasFiltros;