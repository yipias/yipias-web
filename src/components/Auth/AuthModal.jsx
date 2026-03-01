// src/components/Auth/AuthModal.jsx
import React, { useState } from 'react';
import { auth, db } from '../../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { User, Mail, Lock, CheckCircle, Phone, CreditCard } from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ onClose, onSuccess }) => {
  const [modo, setModo] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombres: '',
    telefono: '',
    dni: '',
    confirmPassword: ''
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
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;
      
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

    if (formData.dni.length < 8 || formData.dni.length > 12) {
      setError('El DNI debe tener entre 8 y 12 dígitos');
      setLoading(false);
      return;
    }

    if (formData.telefono.length < 9) {
      setError('El teléfono debe tener al menos 9 dígitos');
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

      // Verificar si el DNI ya está registrado
      const dniQuery = query(collection(db, 'usuarios'), where('dni', '==', formData.dni));
      const dniSnapshot = await getDocs(dniQuery);
      
      if (!dniSnapshot.empty) {
        setError('Este DNI ya está registrado');
        setLoading(false);
        return;
      }

      // Verificar si el email ya está registrado
      const emailQuery = query(collection(db, 'usuarios'), where('email', '==', formData.email));
      const emailSnapshot = await getDocs(emailQuery);
      
      if (!emailSnapshot.empty) {
        setError('Este email ya está registrado');
        setLoading(false);
        return;
      }

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
        telefono: formData.telefono,
        dni: formData.dni,
        rol: 'cliente',
        fechaRegistro: new Date().toISOString(),
        uid: user.uid,
        estado: 'activo'
      };

      await setDoc(doc(db, 'usuarios', user.uid), userData);

      setSuccess('¡Registro exitoso! Ya puedes iniciar sesión.');

      setTimeout(() => {
        setModo('login');
        setFormData({ 
          email: '', 
          password: '', 
          nombres: '', 
          telefono: '', 
          dni: '', 
          confirmPassword: '' 
        });
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
          <img src="/img/premium.png" alt="YipiAs" />
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

        {/* ENLACE PARA CONDUCTORES - WHATSAPP */}
        <div className="conductor-link">
          <span>¿Eres conductor? </span>
          <a 
            href="https://wa.me/51904635462?text=¡Hola!%20Deseo%20más%20información%20para%20ser%20conductor%20de%20YipiAs%20Premium."
            target="_blank" 
            rel="noopener noreferrer"
          >
            Haz clic aquí
          </a>
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
              <Phone size={18} className="input-icon" />
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                placeholder="Ingresa tu teléfono"
                maxLength="9"
              />
            </div>

            <div className="input-group">
              <CreditCard size={18} className="input-icon" />
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                required
                placeholder="Ingresa tu DNI"
                maxLength="8"
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
              <span>Acepto los términos y condiciones, junto a las políticas de privacidad</span>
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