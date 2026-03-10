import React from 'react';
import { 
  X, Mail, Phone, Calendar, User, MapPin, 
  CreditCard, CheckCircle, XCircle, Clock,
  Download, MessageCircle
} from 'lucide-react';
import './ClienteModal.css';

const ClienteModal = ({ cliente, isOpen, onClose }) => {
  if (!isOpen || !cliente) return null;

  const formatFecha = (fecha) => {
    if (!fecha) return '—';
    const d = new Date(fecha);
    return d.toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleWhatsApp = () => {
    if (cliente.telefono) {
      const mensaje = `Hola ${cliente.nombreCompleto}, te contactamos de YipiAs.`;
      window.open(`https://wa.me/${cliente.telefono.replace(/\D/g, '')}?text=${encodeURIComponent(mensaje)}`, '_blank');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content cliente-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalles del Cliente</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="cliente-avatar-section">
            <div className="cliente-avatar-grande" style={{ background: cliente.email ? '#dc2626' : '#4b5563' }}>
              {cliente.nombreCompleto?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'}
            </div>
            <div className="cliente-titulo">
              <h3>{cliente.nombreCompleto || '—'}</h3>
              <div className="badges-container">
                <span className={`badge-modal ${cliente.emailVerified ? 'verificada' : 'no-verificada'}`}>
                  {cliente.emailVerified ? <CheckCircle size={12} /> : <XCircle size={12} />}
                  {cliente.emailVerified ? 'Email verificado' : 'Email no verificado'}
                </span>
                <span className={`badge-modal estado ${cliente.estado || 'activo'}`}>
                  {cliente.estado || 'activo'}
                </span>
              </div>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-section">
              <h4>Información personal</h4>
              <div className="info-fields">
                <div className="info-field">
                  <Mail size={16} />
                  <div>
                    <label>Email</label>
                    <span>{cliente.email || '—'}</span>
                  </div>
                </div>
                <div className="info-field">
                  <Phone size={16} />
                  <div>
                    <label>Teléfono</label>
                    <span>{cliente.telefono || '—'}</span>
                  </div>
                </div>
                <div className="info-field">
                  <CreditCard size={16} />
                  <div>
                    <label>DNI</label>
                    <span>{cliente.dni || '—'}</span>
                  </div>
                </div>
                <div className="info-field">
                  <User size={16} />
                  <div>
                    <label>Nombres</label>
                    <span>{cliente.nombres || '—'}</span>
                  </div>
                </div>
                <div className="info-field">
                  <User size={16} />
                  <div>
                    <label>Apellidos</label>
                    <span>{cliente.apellidos || '—'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h4>Fechas</h4>
              <div className="info-fields">
                <div className="info-field">
                  <Calendar size={16} />
                  <div>
                    <label>Fecha de registro</label>
                    <span>{formatFecha(cliente.fechaRegistro)}</span>
                  </div>
                </div>
                <div className="info-field">
                  <Clock size={16} />
                  <div>
                    <label>Última actividad</label>
                    <span>—</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h4>Información de Firebase</h4>
            <div className="info-fields firebase-info">
              <div className="info-field">
                <label>UID:</label>
                <span className="mono">{cliente.uid || '—'}</span>
              </div>
              <div className="info-field">
                <label>Email verificado:</label>
                <span>{cliente.emailVerified ? 'Sí' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {cliente.telefono && (
            <button className="btn-whatsapp" onClick={handleWhatsApp}>
              <MessageCircle size={18} />
              Contactar por WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClienteModal;