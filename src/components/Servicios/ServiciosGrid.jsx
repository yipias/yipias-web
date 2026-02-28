import React from 'react';
import './ServiciosGrid.css';
import { Headphones, UserCheck, ShieldCheck, Car } from 'lucide-react';

const ServiciosGrid = () => {

  const servicios = [
    {
      img: 'callcenter.jpg',
      icon: <Headphones size={22} />,
      titulo: 'Soporte 24/7',
      desc: 'Optimizamos continuamente nuestro servicio con mejoras y contamos con especialistas a tu disposición. Atención las 24 horas del día.'
    },
    {
      img: 'profesionalidad.jpg',
      icon: <UserCheck size={22} />,
      titulo: 'Conductores Profesionales',
      desc: 'Nuestros conductores cuentan con evaluaciones psicológicas y verificaciones de antecedentes.'
    },
    {
      img: 'experiencia.jpeg',
      icon: <ShieldCheck size={22} />,
      titulo: '25 Años de Experiencia',
      desc: 'Trabajamos para tu satisfacción. Calidad, seguridad y experiencia que nos respaldan con más de 25 años en el mercado peruano.'
    },
    {
      img: 'modernidad.jpg',
      icon: <Car size={22} />,
      titulo: 'Flota Moderna',
      desc: 'Vehículos de última generación, con un máximo de 5 años de antigüedad y equipados con aire acondicionado.'
    }
  ];

  return (
    <section id="servicios" className="section servicios">
      <div className="container">

        <h2 className="section-title">
          Nuestros Servicios
        </h2>

        <p className="section-subtitle">
          Conoce por qué somos la mejor opción para tus viajes
        </p>

        <div className="servicios-grid">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="servicio-card con-imagen-lateral"
            >
              <div className="servicio-imagen-lateral">
                <img src={`/img/${servicio.img}`} alt={servicio.titulo} />
              </div>

              <div className="servicio-contenido-lateral">
                <div className="servicio-icon-wrapper">
                  <div className="servicio-icon">
                    {servicio.icon}
                  </div>
                </div>

                <h3>{servicio.titulo}</h3>
                <p>{servicio.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServiciosGrid;