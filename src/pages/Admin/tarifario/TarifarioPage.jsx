// src/pages/Admin/tarifario/TarifarioPage.jsx
import React, { useState } from 'react';
import { useTarifas } from '../../../hooks/useTarifas';
import { 
  RefreshCw, TrendingUp, Edit2, Check, X, Clock, 
  MapPin, Search, Percent, RotateCcw, History, 
  Calendar, TrendingDown, Save,
  ChevronLeft, ChevronRight, DollarSign
} from 'lucide-react';
import Swal from 'sweetalert2';
import './TarifarioPage.css';

const TarifarioPage = () => {
  const {
    tarifasKm,
    historial,
    loading,
    error,
    lastUpdate,
    actualizarTarifaKm,
    aplicarIncrementoKm,
    restablecerBase,
    sobrescribirBase,
    tieneBaseOriginal
  } = useTarifas();

  const [editMode, setEditMode] = useState({ tipo: null, index: null });
  const [editValues, setEditValues] = useState({ km: 0, tarifa1_4: 0, tarifa5_6: 0 });
  const [searchKm, setSearchKm] = useState('');
  const [showHistorial, setShowHistorial] = useState(false);
  const [historialPage, setHistorialPage] = useState(1);
  const itemsPerPage = 8;

  const handleEdit = (index, tarifa) => {
    setEditMode({ tipo: 'km', index });
    setEditValues({
      km: tarifa[0],
      tarifa1_4: tarifa[1],
      tarifa5_6: tarifa[2]
    });
  };

  const handleSave = async (index) => {
    const nuevosValores = [
      parseInt(editValues.km) || 0,
      parseInt(editValues.tarifa1_4) || 0,
      parseInt(editValues.tarifa5_6) || 0
    ];

    const result = await actualizarTarifaKm(index, nuevosValores);

    if (result.success) {
      setEditMode({ tipo: null, index: null });
      Swal.fire({
        icon: 'success',
        title: 'Tarifa actualizada',
        text: 'Los cambios se reflejarán en tiempo real',
        timer: 1500,
        showConfirmButton: false,
        background: '#1e1e2e',
        color: '#f1f5f9',
        iconColor: '#22c55e'
      });
    }
  };

  // ===== INCREMENTO SIN LÍMITE =====
  const handleIncremento = async () => {
    const { value: formValues } = await Swal.fire({
      title: `Aplicar incremento a tarifas por kilómetro`,
      html: `
        <div style="padding: 5px;">
          <div style="margin-bottom: 20px;">
            <div style="background: #1e1e2e; border-radius: 12px; padding: 20px;">
              <div style="margin-bottom: 16px;">
                <label style="color: #9ca3af; font-size: 12px; display: block; margin-bottom: 6px; text-align: left;">
                  Porcentaje
                </label>
                <input 
                  type="number" 
                  id="porcentaje" 
                  class="swal2-input" 
                  placeholder="Ej: 15" 
                  step="0.1" 
                  min="0"
                  style="
                    width: 100%;
                    padding: 12px;
                    background: #0f172a;
                    border: 1px solid #374151;
                    border-radius: 10px;
                    color: #e2e8f0;
                    font-size: 15px;
                    outline: none;
                    box-sizing: border-box;
                  "
                >
              </div>
              <div>
                <label style="color: #9ca3af; font-size: 12px; display: block; margin-bottom: 6px; text-align: left;">
                  Tipo de cambio
                </label>
                <div style="display: flex; gap: 10px;">
                  <label class="tipo-radio" data-value="aumentar" style="
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 12px;
                    background: #0f172a;
                    border: 1px solid #374151;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.2s;
                  ">
                    <input type="radio" name="tipo_cambio" value="aumentar" checked style="display: none;">
                    <TrendingUp size={18} />
                    <span style="color: #e2e8f0; font-size: 14px;">Aumentar</span>
                  </label>
                  <label class="tipo-radio" data-value="disminuir" style="
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 12px;
                    background: #0f172a;
                    border: 1px solid #374151;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.2s;
                  ">
                    <input type="radio" name="tipo_cambio" value="disminuir" style="display: none;">
                    <TrendingDown size={18} />
                    <span style="color: #e2e8f0; font-size: 14px;">Disminuir</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      confirmButtonText: 'Aplicar',
      confirmButtonColor: '#dc2626',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#4b5563',
      background: '#1a1a24',
      color: '#e2e8f0',
      width: '480px',
      padding: '20px',
      didOpen: () => {
        const labels = document.querySelectorAll('.tipo-radio');
        
        labels.forEach((label, index) => {
          label.addEventListener('click', () => {
            labels.forEach(l => {
              l.style.borderColor = '#374151';
              l.style.background = '#0f172a';
            });
            label.style.borderColor = index === 0 ? '#22c55e' : '#ef4444';
            label.style.background = index === 0 ? '#1a2e1a' : '#2a1a1a';
            
            const radio = label.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
          });
        });
      },
      preConfirm: () => {
        const porcentaje = parseFloat(document.getElementById('porcentaje').value);
        const tipoCambio = document.querySelector('input[name="tipo_cambio"]:checked')?.value;
        
        if (isNaN(porcentaje) || porcentaje <= 0) {
          Swal.showValidationMessage('❌ Ingresa un porcentaje válido');
          return false;
        }
        return { porcentaje, tipoCambio };
      }
    });

    if (formValues) {
      const result = await aplicarIncrementoKm(formValues.porcentaje, formValues.tipoCambio);

      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Tarifas actualizadas',
          html: `
            <div style="text-align: center;">
              <div style="font-size: 16px; margin-bottom: 8px; color: #22c55e;">
                ${formValues.tipoCambio === 'aumentar' ? '+' : '-'}${formValues.porcentaje}%
              </div>
              <div style="color: #9ca3af; font-size: 13px;">
                Se aplicó a todas las tarifas por kilómetro
              </div>
            </div>
          `,
          timer: 2500,
          showConfirmButton: false,
          background: '#1a1a24',
          color: '#e2e8f0',
          iconColor: '#22c55e'
        });
      }
    }
  };

  // ===== RESTABLECER A BASE ORIGINAL =====
  const handleRestablecerBase = async () => {
    const result = await Swal.fire({
      title: '¿Restablecer a base original?',
      text: 'Volverás a las tarifas guardadas como base original',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, restablecer',
      cancelButtonText: 'Cancelar',
      background: '#1e1e2e',
      color: '#f1f5f9',
      iconColor: '#f59e0b'
    });

    if (result.isConfirmed) {
      await restablecerBase();
      Swal.fire({
        icon: 'success',
        title: 'Base restablecida',
        text: 'Se han restaurado las tarifas de la base original',
        timer: 2000,
        background: '#1e1e2e',
        color: '#f1f5f9',
        iconColor: '#22c55e'
      });
    }
  };

  // ===== SOBREESCRIBIR BASE ORIGINAL =====
  const handleSobrescribirBase = async () => {
    const result = await Swal.fire({
      title: '¿Sobrescribir base original?',
      html: `
        <div style="text-align: center; color: #e2e8f0;">
          <p>Las tarifas actuales se convertirán en la <strong>nueva base original</strong>.</p>
          <p style="color: #ef4444; margin-top: 10px;">Esta acción no se puede deshacer.</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, sobrescribir base',
      cancelButtonText: 'Cancelar',
      background: '#1e1e2e',
      color: '#f1f5f9',
      iconColor: '#f59e0b'
    });

    if (result.isConfirmed) {
      const res = await sobrescribirBase();
      if (res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Base original actualizada',
          text: 'Las tarifas actuales ahora son la base original',
          timer: 2000,
          background: '#1e1e2e',
          color: '#f1f5f9',
          iconColor: '#22c55e'
        });
      }
    }
  };

  const formatFechaHistorial = (fecha) => {
    if (!fecha) return '—';
    const d = fecha.toDate ? fecha.toDate() : new Date(fecha);
    return d.toLocaleString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAccionIcon = (accion) => {
    switch(accion) {
      case 'incremento': return <TrendingUp size={14} />;
      case 'decremento': return <TrendingDown size={14} />;
      case 'restablecer': return <RotateCcw size={14} />;
      case 'sobrescribir': return <Save size={14} />;
      default: return <Edit2 size={14} />;
    }
  };

  const getAccionColor = (accion) => {
    switch(accion) {
      case 'incremento': return '#22c55e';
      case 'decremento': return '#ef4444';
      case 'restablecer': return '#3b82f6';
      case 'sobrescribir': return '#a855f7';
      default: return '#9ca3af';
    }
  };

  const tarifasFiltradas = tarifasKm.filter(t => 
    !searchKm || t[0].toString().includes(searchKm)
  );

  const historialOrdenado = [...historial].reverse();
  const totalPaginas = Math.ceil(historialOrdenado.length / itemsPerPage);
  const historialPaginado = historialOrdenado.slice(
    (historialPage - 1) * itemsPerPage,
    historialPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="tarifario-loading">
        <div className="spinner"></div>
        <p>Cargando tarifario desde Firebase...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tarifario-error">
        <p>Error cargando tarifas: {error.message}</p>
        <button onClick={() => window.location.reload()} className="btn-reload">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="tarifario-page">
      <div className="tarifario-header">
        <div className="header-left">
          <h2><DollarSign size={28} style={{ display: 'inline', marginRight: '8px', color: '#dc2626' }} /> Tarifario</h2>
          <p className="header-subtitle">Gestiona los precios por kilómetro</p>
          {tieneBaseOriginal && (
            <span className="badge-base">Base original activa</span>
          )}
        </div>
        <div className="header-right">
          {lastUpdate && (
            <div className="last-update">
              <Calendar size={14} />
              <span>Actualizado: {lastUpdate.toLocaleString('es-PE')}</span>
            </div>
          )}
        </div>
      </div>

      <div className="tarifario-tabs" style={{ justifyContent: 'flex-start' }}>
        <button
          className={`tab-btn ${!showHistorial ? 'active' : ''}`}
          onClick={() => setShowHistorial(false)}
        >
          <MapPin size={16} />
          Por Kilómetro
        </button>
        <button
          className={`tab-btn ${showHistorial ? 'active' : ''}`}
          onClick={() => {
            setShowHistorial(!showHistorial);
            setHistorialPage(1);
          }}
        >
          <History size={16} />
          Historial de cambios
        </button>
      </div>

      {!showHistorial ? (
        <>
          <div className="actions-bar">
            <div className="search-container">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar por kilómetros..."
                value={searchKm}
                onChange={(e) => setSearchKm(e.target.value)}
                className="search-input"
              />
              {searchKm && (
                <button className="search-clear" onClick={() => setSearchKm('')}>
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="action-buttons">
              <button className="btn-increment" onClick={handleIncremento}>
                <Percent size={16} />
                <span>Incremento %</span>
              </button>
              <button className="btn-overwrite" onClick={handleSobrescribirBase}>
                <Save size={16} />
                <span>Sobrescribir base</span>
              </button>
              <button className="btn-reset" onClick={handleRestablecerBase}>
                <RotateCcw size={16} />
                <span>Restablecer</span>
              </button>
            </div>
          </div>

          <div className="table-card">
            <div className="table-header">
              <h3>Tarifas por kilómetro</h3>
              <span className="table-count">{tarifasFiltradas.length} registros</span>
            </div>
            <div className="table-container">
              <table className="tarifario-table">
                <thead>
                  <tr>
                    <th>Kilómetros</th>
                    <th>1-4 pasajeros</th>
                    <th>5-6 pasajeros</th>
                    <th>Precio por km</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tarifasFiltradas.map((tarifa, index) => {
                    const isEditing = editMode.tipo === 'km' && editMode.index === index;
                    const precioPorUnidad = tarifa[0] > 0 ? (tarifa[1] / tarifa[0]).toFixed(2) : '0.00';
                    
                    return (
                      <tr key={index} className={isEditing ? 'editing' : ''}>
                        <td className="km-cell">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editValues.km}
                              onChange={(e) => setEditValues({ ...editValues, km: e.target.value })}
                              className="edit-input"
                              autoFocus
                            />
                          ) : (
                            <strong>{tarifa[0]} km</strong>
                          )}
                        </td>
                        <td className="price-cell">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editValues.tarifa1_4}
                              onChange={(e) => setEditValues({ ...editValues, tarifa1_4: e.target.value })}
                              className="edit-input"
                            />
                          ) : (
                            <span className="price">S/ {tarifa[1]}</span>
                          )}
                        </td>
                        <td className="price-cell">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editValues.tarifa5_6}
                              onChange={(e) => setEditValues({ ...editValues, tarifa5_6: e.target.value })}
                              className="edit-input"
                            />
                          ) : (
                            <span className="price">S/ {tarifa[2]}</span>
                          )}
                        </td>
                        <td className="price-per-unit">
                          <span className="unit-badge">S/ {precioPorUnidad}/km</span>
                        </td>
                        <td className="actions-cell">
                          {isEditing ? (
                            <>
                              <button className="btn-icon save" onClick={() => handleSave(index)} title="Guardar">
                                <Check size={16} />
                              </button>
                              <button className="btn-icon cancel" onClick={() => setEditMode({ tipo: null, index: null })} title="Cancelar">
                                <X size={16} />
                              </button>
                            </>
                          ) : (
                            <button className="btn-icon edit" onClick={() => handleEdit(index, tarifa)} title="Editar">
                              <Edit2 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="historial-card">
          <div className="historial-header">
            <h3><History size={18} style={{ marginRight: '8px' }} /> Historial de cambios</h3>
            <button className="historial-close" onClick={() => setShowHistorial(false)}>
              <X size={18} />
            </button>
          </div>
          
          {historial.length === 0 ? (
            <div className="historial-empty">
              <History size={40} />
              <p>No hay cambios registrados aún</p>
            </div>
          ) : (
            <>
              <div className="historial-list">
                {historialPaginado.map((item, index) => (
                  <div key={index} className="historial-item">
                    <div className="historial-item-icon" style={{ background: `${getAccionColor(item.accion)}20` }}>
                      <span style={{ color: getAccionColor(item.accion) }}>
                        {getAccionIcon(item.accion)}
                      </span>
                    </div>
                    <div className="historial-item-content">
                      <div className="historial-item-header">
                        <span className="historial-accion" style={{ color: getAccionColor(item.accion) }}>
                          {item.accion.charAt(0).toUpperCase() + item.accion.slice(1)}
                        </span>
                        <span className="historial-fecha">{formatFechaHistorial(item.fecha)}</span>
                      </div>
                      <p className="historial-descripcion">{item.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>

              {totalPaginas > 1 && (
                <div className="historial-pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setHistorialPage(p => Math.max(1, p - 1))}
                    disabled={historialPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="pagination-info">
                    Página {historialPage} de {totalPaginas}
                  </span>
                  <button
                    className="pagination-btn"
                    onClick={() => setHistorialPage(p => Math.min(totalPaginas, p + 1))}
                    disabled={historialPage === totalPaginas}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TarifarioPage;