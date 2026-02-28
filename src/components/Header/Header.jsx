// src/components/Header/Header.jsx
import React, { useState } from 'react';
import { UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import MobileMenu from './MobileMenu';
import AuthModal from '../Auth/AuthModal';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { currentUser, userData } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAuthModal = () => {
    setShowAuthModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutConfirm(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Obtener primera palabra del nombre
  const getFirstName = () => {
    if (!userData || !userData.nombres) return '';
    return userData.nombres.split(' ')[0];
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="nav-container">
            <div className="brand-container">
              <img src="/img/YipiAs_logo.png" alt="Icono YipiAs" className="brand-icon" />
              <img src="/img/banner.png" alt="YipiAs" className="brand-logo-wide" />
            </div>
            
            <div className="nav-right">
              {currentUser ? (
                // USUARIO LOGUEADO - ícono + nombre (ambos clickeables)
                <div className="user-profile-wrapper">
                  <div 
                    className="user-profile"
                    onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}
                  >
                    <UserCircle size={24} className="user-icon" />
                    <span className="user-name">{getFirstName()}</span>
                  </div>
                  
                  {/* Menú de logout */}
                  {showLogoutConfirm && (
                    <div className="logout-menu">
                      <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={16} />
                        <span>Cerrar sesión</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // USUARIO NO LOGUEADO - solo ícono
                <button 
                  className="user-btn" 
                  onClick={openAuthModal} 
                  title="Iniciar sesión / Registrarse"
                >
                  <UserCircle size={28} />
                </button>
              )}
              
              <button 
                className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`} 
                onClick={toggleMenu}
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
            </div>
          </div>
        </div>
        
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </nav>

      {showAuthModal && (
        <AuthModal 
          onClose={closeAuthModal} 
          onSuccess={() => {
            closeAuthModal();
          }}
        />
      )}
    </>
  );
};

export default Header;