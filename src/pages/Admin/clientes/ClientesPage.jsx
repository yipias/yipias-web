// src/pages/Admin/clientes/ClientesPage.jsx
import React, { useState, useMemo } from 'react';
import { useClientes } from '../../../hooks/admin/useClientes';
import { 
  Users, Search, X, ChevronLeft, ChevronRight,
  Download
} from 'lucide-react';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import ClienteCard from '../../../components/Admin/Clientes/ClienteCard';
import ClienteStats from '../../../components/Admin/Clientes/ClienteStats';
import './ClientesPage.css';

const ClientesPage = () => {
  const { clientes, loading, error, getEstadisticas, eliminarCliente } = useClientes();
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  
  const itemsPorPagina = 12;

  // Filtrar clientes
  const clientesFiltrados = useMemo(() => {
    return clientes.filter(cliente => {
      if (busqueda) {
        const texto = busqueda.toLowerCase();
        const nombre = (cliente.nombreCompleto || '').toLowerCase();
        const email = (cliente.email || '').toLowerCase();
        const telefono = cliente.telefono || '';
        const dni = cliente.dni || '';
        
        if (!nombre.includes(texto) && !email.includes(texto) && 
            !telefono.includes(texto) && !dni.includes(texto)) {
          return false;
        }
      }
      return true;
    });
  }, [clientes, busqueda]);

  // Paginación
  const totalPaginas = Math.ceil(clientesFiltrados.length / itemsPorPagina);
  const clientesPagina = clientesFiltrados.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  const handleExportarExcel = () => {
    const datos = clientesFiltrados.map(c => ({
      'Nombre': c.nombreCompleto || '',
      'Email': c.email || '',
      'Teléfono': c.telefono || '',
      'DNI': c.dni || '',
      'Fecha Registro': new Date(c.fechaRegistro).toLocaleDateString('es-PE')
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, 'Clientes');
    XLSX.writeFile(wb, `clientes_${new Date().toISOString().split('T')[0]}.xlsx`);

    Swal.fire({
      icon: 'success',
      title: 'Exportado',
      text: `${datos.length} clientes exportados a Excel`,
      timer: 2000,
      showConfirmButton: false,
      background: '#1e1e2e',
      color: '#f1f5f9'
    });
  };

  if (loading) {
    return (
      <div className="clientes-loading">
        <div className="spinner"></div>
        <p>Cargando clientes desde Firebase...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="clientes-error">
        <p>Error cargando clientes: {error.message}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="clientes-page">
      <div className="clientes-header">
        <div className="header-left">
          <h2><Users size={28} style={{ color: '#dc2626', marginRight: '10px' }} /> Gestión de Clientes</h2>
          <p className="header-subtitle">{clientes.length} clientes registrados</p>
        </div>
        <button className="btn-exportar" onClick={handleExportarExcel}>
          <Download size={16} />
          Exportar Excel
        </button>
      </div>

      <ClienteStats stats={getEstadisticas()} />

      <div className="filtros-section">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre, email, teléfono o DNI..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button className="clear-search" onClick={() => setBusqueda('')}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="clientes-grid">
        {clientesPagina.map(cliente => (
          <ClienteCard 
            key={cliente.id} 
            cliente={cliente} 
            onDelete={eliminarCliente}
          />
        ))}
      </div>

      {clientesPagina.length === 0 && (
        <div className="clientes-empty">
          <Users size={48} />
          <p>No se encontraron clientes</p>
        </div>
      )}

      {totalPaginas > 1 && (
        <div className="paginacion">
          <button 
            className="pag-btn"
            onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
            disabled={paginaActual === 1}
          >
            <ChevronLeft size={16} />
          </button>
          
          <span className="pag-info">
            Página {paginaActual} de {totalPaginas}
          </span>
          
          <button 
            className="pag-btn"
            onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
            disabled={paginaActual === totalPaginas}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientesPage;