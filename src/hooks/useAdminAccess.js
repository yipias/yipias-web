// src/hooks/useAdminAccess.js
import { useAuth } from '../context/AuthContext';

// Lista de correos autorizados
const ADMIN_EMAILS = [
  'enseguin@gmail.com',
  'ensegcor@gmail.com'
];

export const useAdminAccess = () => {
  const { currentUser } = useAuth();
  
  // Verificar si el email está en la lista
  const isAdmin = currentUser?.email ? ADMIN_EMAILS.includes(currentUser.email) : false;
  
  return { isAdmin, currentUser };
};