// src/components/Admin/Reservas/ReservasStats.jsx
import React, { useState, useEffect } from 'react';
import { Users, Car, Calendar, XCircle, DollarSign, TrendingUp } from 'lucide-react';
import './ReservasStats.css';

const ReservasStats = ({ stats }) => {
  const [conductoresActivos, setConductoresActivos] = useState(0);
  const [ingresosTotales, setIngresosTotales] = useState(0);
  const [ingresosNetos, setIngresosNetos] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { collection, query, where, getDocs } = await import('firebase/firestore');
        const { db } = await import('../../../firebase/config');

        // Conductores activos/aprobados
        const qConductores = query(
          collection(db, 'conductores'),
          where('estado', 'in', ['activo', 'aprobado'])
        );
        const snapConductores = await getDocs(qConductores);
        setConductoresActivos(snapConductores.size);

        // Ingresos desde reservas (todas, no solo hoy)
        const snapReservas = await getDocs(collection(db, 'reservas'));
        let total = 0;
        snapReservas.forEach(doc => {
          const precio = doc.data().precio;
          if (precio) {
            const valor = parseFloat(precio.toString().replace('S/ ', '').replace(',', '.'));
            if (!isNaN(valor)) total += valor;
          }
        });
        setIngresosTotales(total);
        setIngresosNetos(total * 0.15);
      } catch (err) {
        console.error('Error cargando stats:', err);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      icon: <Car size={20} />,
      label: 'Conductores disponibles',
      value: conductoresActivos,
      color: 'green'
    },
    {
      icon: <Users size={20} />,
      label: 'Conductores en servicio',
      value: stats.conductoresEnServicio ?? 0,
      color: 'blue'
    },
    {
      icon: <Calendar size={20} />,
      label: 'Reservas hoy',
      value: stats.reservasHoy ?? 0,
      color: 'purple'
    },
    {
      icon: <XCircle size={20} />,
      label: 'Cancelaciones hoy',
      value: stats.canceladasHoy ?? 0,
      color: 'red'
    },
    {
      icon: <DollarSign size={20} />,
      label: 'Ingresos totales',
      value: `S/ ${ingresosTotales.toFixed(2)}`,
      color: 'yellow'
    },
    {
      icon: <TrendingUp size={20} />,
      label: 'Ingresos netos',
      value: `S/ ${ingresosNetos.toFixed(2)}`,
      color: 'orange'
    }
  ];

  return (
    <div className="reservas-stats">
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

export default ReservasStats;