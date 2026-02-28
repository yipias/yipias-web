// src/components/Auth/AuthModal.jsx
import React, { useState } from 'react';
import { auth, db } from '../../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { User, Mail, Lock, CheckCircle } from 'lucide-react'; // SOLO ÍCONOS NECESARIOS
import './AuthModal.css';

const AuthModal = ({ onClose, onSuccess }) => {
  const [modo, setModo] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombres: '',
    confirmPassword: '' // Solo para registro
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Iniciar sesión con email y contraseña
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;
      
      // Obtener datos adicionales de Firestore
      const userDoc = await getDocs(query(
        collection(db, 'usuarios'), 
        where('uid', '==', user.uid)
      ));
      
      if (!userDoc.empty) {
        const userData = userDoc.docs[0].data();
        setSuccess(`¡Bienvenido ${userData.nombres}!`);
        sessionStorage.setItem('user', JSON.stringify(userData));
        
        if (onSuccess) onSuccess(userData);
        setTimeout(onClose, 1500);
      }

    } catch (error) {
      console.error('Error:', error);
      if (error.code === 'auth/invalid-credential') {
        setError('Email o contraseña incorrectos');
      } else {
        setError('Error al iniciar sesión');
      }
    }
    setLoading(false);
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    const nombreCompleto = formData.nombres.trim();
    if (!nombreCompleto.includes(' ')) {
      setError('Ingresa tu nombre completo (nombres y apellidos)');
      setLoading(false);
      return;
    }

    try {
      const espacioIndex = nombreCompleto.indexOf(' ');
      const nombres = nombreCompleto.substring(0, espacioIndex).trim();
      const apellidos = nombreCompleto.substring(espacioIndex + 1).trim();

      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      const user = userCredential.user;

      // Guardar datos en Firestore
      const userData = {
        nombres: nombres,
        apellidos: apellidos,
        nombreCompleto: nombreCompleto,
        email: formData.email,
        rol: 'cliente',
        fechaRegistro: new Date().toISOString(),
        uid: user.uid,
        estado: 'activo'
      };

      await setDoc(doc(db, 'usuarios', user.uid), userData);

      setSuccess('✅ ¡Registro exitoso! Ya puedes iniciar sesión.');

      setTimeout(() => {
        setModo('login');
        setFormData({ email: '', password: '', nombres: '', confirmPassword: '' });
        setAceptaTerminos(false);
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('Este email ya está registrado');
      } else {
        setError('Error al registrarse');
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>×</button>
        
        {/* LOGO DE YIPIAS */}
        <div className="auth-logo">
          <img src="/img/banner.png" alt="YipiAs" />
        </div>

        {/* Selector deslizante */}
        <div className="auth-slider">
          <div className={`slider-bg ${modo === 'login' ? 'login-active' : 'registro-active'}`} />
          <button 
            className={`slider-btn ${modo === 'login' ? 'active' : ''}`}
            onClick={() => setModo('login')}
          >
            Iniciar Sesión
          </button>
          <button 
            className={`slider-btn ${modo === 'registro' ? 'active' : ''}`}
            onClick={() => setModo('registro')}
          >
            Registrarse
          </button>
        </div>

        {modo === 'login' ? (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="input-group">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Correo electrónico"
              />
            </div>

            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Contraseña"
              />
            </div>

            {error && <div className="auth-error">{error}</div>}
            {success && <div className="auth-success">{success}</div>}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegistro} className="auth-form">
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                required
                placeholder="Nombres y apellidos"
              />
            </div>

            <div className="input-group">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Correo electrónico"
              />
            </div>

            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Contraseña (mín. 6 caracteres)"
              />
            </div>

            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirmar contraseña"
              />
            </div>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
              />
              <CheckCircle size={16} className={`checkbox-icon ${aceptaTerminos ? 'checked' : ''}`} />
              <span>Acepto términos y condiciones</span>
            </label>

            {error && <div className="auth-error">{error}</div>}
            {success && <div className="auth-success">{success}</div>}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarme'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;