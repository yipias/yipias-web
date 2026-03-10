// src/components/Admin/Clientes/ClienteStats.jsx
import React from 'react';
import { Users, Calendar } from 'lucide-react';
import './ClienteStats.css';

const ClienteStats = ({ stats }) => {
  const cards = [
    {
      icon: <Users size={20} />,
      label: 'Total clientes',
      value: stats.total,
      color: 'blue'
    },
    {
      icon: <Calendar size={20} />,
      label: 'Registrados hoy',
      value: stats.nuevosHoy,
      color: 'orange'
    }
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div key={index} className={`stat-card stat-${card.color}`}>
          <div className="stat-icon">{card.icon}</div>
          <div className="stat-content">
            <span className="stat-label">{card.label}</span>
            <span className="stat-value">{card.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClienteStats;