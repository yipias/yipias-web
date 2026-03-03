// src/pages/Admin/conductores/ConductoresPage.jsx
import React, { useState } from 'react';
import { useAdminConductores } from '../../../hooks/useAdminConductores';
import ConductoresPendientes from './ConductoresPendientes';
import ConductoresAprobados from './ConductoresAprobados';
import './ConductoresPage.css';

const ConductoresPage = () => {
  const [activeTab, setActiveTab] = useState('pendientes');
  const { conductores, loading } = useAdminConductores();

  const tabs = [
    { id: 'pendientes', label: 'Pendientes', count: conductores.pendientes.length },
    { id: 'aprobados', label: 'Aprobados', count: conductores.aprobados.length }
  ];

  if (loading) {
    return (
      <div className="conductores-loading">
        <div className="spinner"></div>
        <p>Cargando conductores...</p>
      </div>
    );
  }

  return (
    <div className="conductores-page">
      <div className="page-header">
        <h1>Gestión de Conductores</h1>
      </div>

      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'pendientes' && (
          <ConductoresPendientes conductores={conductores.pendientes} />
        )}
        {activeTab === 'aprobados' && (
          <ConductoresAprobados conductores={conductores.aprobados} />
        )}
      </div>
    </div>
  );
};

export default ConductoresPage;