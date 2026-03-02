// src/pages/ConductorRegistro.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import FormularioConductor from '../components/Conductores/FormularioConductor';
import { useRegistroConductor } from '../hooks/useRegistroConductor';
import './ConductorRegistro.css';

const ConductorRegistro = () => {
  const navigate = useNavigate();
  const { registrarConductor, loading, error, success } = useRegistroConductor();

  const handleSubmit = async (datos, fotoFile) => {
    const resultado = await registrarConductor(datos, fotoFile);
    if (resultado.success) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  if (success) {
    return (
      <div className="conductor-success">
        <div className="success-card">
          <CheckCircle size={64} className="success-icon" />
          <h2>¡Solicitud enviada!</h2>
          <p>Gracias por tu interés en ser parte de YipiAs.</p>
          <p>Revisaremos tu información y te contactaremos pronto.</p>
          <button onClick={() => navigate('/')} className="btn-volver">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="conductor-registro-container">
      {error && (
        <div className="error-mensaje">
          {error}
        </div>
      )}
      <FormularioConductor 
        onSubmit={handleSubmit} 
        loading={loading}
      />
    </div>
  );
};

export default ConductorRegistro;