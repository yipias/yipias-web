// src/components/Admin/Clientes/ClienteCard.jsx - ACTUALIZADO
import React from 'react';
import { Mail, Phone, Calendar, MessageCircle, User } from 'lucide-react';
import './ClienteCard.css';

const ClienteCard = ({ cliente }) => {
  const getInitials = (nombre) => {
    if (!nombre) return '?';
    return nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const getAvatarColor = (email) => {
    if (!email) return '#dc2626';
    const colors = ['#dc2626', '#d97706', '#059669', '#2563eb', '#7c3aed', '#db2777'];
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const formatFecha = (fecha) => {
    if (!fecha) return '—';
    const d = new Date(fecha);
    return d.toLocaleDateString('es-PE', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }).replace('.', '');
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    if (cliente.telefono) {
      const mensaje = `Hola ${cliente.nombreCompleto || ''}, te contactamos de YipiAs.`;
      window.open(`https://wa.me/${cliente.telefono.replace(/\D/g, '')}?text=${encodeURIComponent(mensaje)}`, '_blank');
    }
  };

  return (
    <div className="cliente-card">
      <div className="card-header">
        <div className="card-avatar" style={{ background: getAvatarColor(cliente.email) }}>
          {getInitials(cliente.nombreCompleto)}
        </div>
        <h3 className="cliente-nombre">{cliente.nombreCompleto || '—'}</h3>
      </div>
      
      <div className="cliente-info">
        <div className="info-item">
          <Mail size={14} />
          <span>{cliente.email || '—'}</span>
        </div>
        
        <div className="info-item">
          <Phone size={14} />
          <span>{cliente.telefono || '—'}</span>
        </div>
        
        <div className="info-item">
          <User size={14} />
          <span className="dni-value">{cliente.dni || '—'}</span>
        </div>
        
        <div className="info-item">
          <Calendar size={14} />
          <span>{formatFecha(cliente.fechaRegistro)}</span>
        </div>
      </div>

      {cliente.telefono && (
        <button className="btn-whatsapp-card" onClick={handleWhatsApp}>
          <MessageCircle size={16} />
          Contactar por WhatsApp
        </button>
      )}
    </div>
  );
};

export default ClienteCard;