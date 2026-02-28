// src/pages/Terminos.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Terminos.css';

const Terminos = () => {
  const navigate = useNavigate();
  const [aceptado, setAceptado] = useState(false);

  const handleCheckboxChange = (e) => {
    setAceptado(e.target.checked);
    if (e.target.checked) {
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  };

  return (
    <main className="terminos-page" style={{ paddingTop: "30px" }}>
      <div className="container terminos-container">
        <h1>TÉRMINOS Y CONDICIONES – YipiAs Premium</h1>
        <div className="fecha">Última actualización: 15/02/2026</div>

        <p>Los presentes Términos y Condiciones regulan el acceso y uso de los servicios ofrecidos por <strong>YipiAs Premium</strong>, marca operada por <strong>Plataformas y Soluciones Digitales S.A.C.</strong>, República del Perú (en adelante, “YIPIAS”). RUC 20610695257 – email corporativo <strong>soporte@yipias.com</strong>.</p>
        <p>El uso de la plataforma implica la aceptación plena, expresa y sin reservas de todas las disposiciones aquí contenidas.</p>

        <h2>1. NATURALEZA DEL SERVICIO Y POSICIONAMIENTO</h2>
        <p>YipiAs es una plataforma tecnológica de soluciones de movilidad ejecutiva y corporativa, orientada a estándares superiores de calidad, puntualidad, seguridad y confidencialidad.</p>
        
        <div className="legal-block">
          <p><strong>YipiAs:</strong></p>
          <ul>
            <li>No opera como empresa de taxi tradicional.</li>
            <li>No funciona bajo el modelo de aplicación masiva de transporte urbano.</li>
            <li>No es una app de "carreras inmediatas" de bajo costo.</li>
          </ul>
        </div>

        <div className="legal-block">
          <p><strong>YipiAs:</strong></p>
          <ul>
            <li>Establece estándares operativos.</li>
            <li>Define condiciones de servicio.</li>
            <li>Gestiona reservas y pagos.</li>
            <li>Supervisa cumplimiento.</li>
            <li>Mantiene protocolos de calidad ejecutiva.</li>
          </ul>
        </div>

        <p>El traslado es ejecutado materialmente por conductores afiliados previamente verificados, quienes actúan bajo su responsabilidad operativa conforme a la normativa vigente en el Perú.</p>

        <h3>1.1 Cómo funciona YipiAs Premium – Para pasajeros</h3>
        <ul>
          <li><strong>Solicita tu viaje:</strong> Solo desde yipias.com, acepta los Términos y Condiciones. Elige inmediato o programado.</li>
          <li><strong>Reserva validada:</strong> Nuestro equipo revisa tu solicitud y asigna un conductor que cumpla estándares de seguridad, limpieza y presentación.</li>
          <li><strong>Pago seguro:</strong>
            <ul>
              <li>Anticipado: transferencia o billetera digital (YAPE/PLIN)</li>
              <li>En efectivo: al conductor, quien registrará tu pago en la plataforma.</li>
            </ul>
          </li>
          <li><strong>Disfruta el viaje:</strong> Puntualidad, trato cordial y aire acondicionado operativo garantizados.</li>
          <li><strong>Comprobante:</strong> Recibe tu boleta o factura electrónica según tu forma de pago.</li>
        </ul>

        <p>Nuestros conductores: Seleccionados para asegurar seguridad, confort y confiabilidad en cada traslado.</p>

        <h2>2.0 REGISTRO Y CUENTA DE USUARIO</h2>
        <p><strong>2.1 Cuenta Personal e Intransferible</strong> – Cada usuario debe registrarse con datos reales, exactos y actualizados. La cuenta es personal e intransferible. El titular asume responsabilidad total por toda reserva realizada desde su cuenta.</p>
        <p><strong>2.2 Capacidad Legal</strong> – Solo pueden registrarse mayores de 18 años. Los menores deberán viajar bajo supervisión de adulto responsable.</p>
        <p><strong>2.3 Facultades de YipiAs</strong> – YipiAs podrá suspender o cancelar cuentas cuando exista información falsa, se incumplan normas de conducta o se detecte uso indebido.</p>

        <h2>3. CÓDIGO DE CONDUCTA Y ESTÁNDAR EJECUTIVO</h2>
        <p>YipiAs promueve un modelo de movilidad ejecutiva basado en respeto, formalidad y trato profesional.</p>
        <p><strong>3.1 Trato Respetuoso</strong> – El usuario deberá mantener conducta adecuada hacia conductor y unidad.</p>
        <p><strong>3.2 Tolerancia Cero</strong> – No se permitirá discriminación, acoso, agresividad o intoxicación que comprometa seguridad. La infracción podrá generar suspensión definitiva sin reembolso.</p>
        <p><strong>3.3 Uso Lícito</strong> – Queda prohibido utilizar el servicio para actividades ilícitas. El conductor podrá cancelar el servicio sin derecho a reembolso si detecta riesgo legal o de seguridad.</p>

        <h2>4. MODALIDADES DE SERVICIO</h2>
        <p><strong>4.1 Servicio por Trayecto</strong> – Traslado entre origen y destino determinados.</p>
        <p><strong>4.2 Servicio por Tiempo</strong> – Disponibilidad del conductor por horas contratadas.</p>

        <h2>5. POLÍTICA DE RESERVAS Y HORARIOS</h2>
        <p><strong>5.1 Anticipación</strong> – Reserva mínima: 30 minutos previos al servicio.</p>
        <p><strong>5.2 Horario Ordinario de atención</strong> – 24/7 los 365 días del año. 6:00 a.m. – 12:00 a.m.</p>
        <p><strong>5.3 Horario Extraordinario</strong> – 12:00 a.m. – 6:00 a.m. Incrementos de tarifa según demanda en fechas festivas o en circunstancias de tráfico de horas punta. Servicio sujeto a disponibilidad operativa.</p>

        <h2>6. TARIFAS Y PAGOS</h2>
        <p>Modalidades: Pago anticipado, pago inmediato o prepago corporativo. YipiAs no otorga créditos.</p>
        <p><strong>6.1 Medios Aceptados</strong> – Transferencia bancaria, YAPE, PLIN, efectivo (monto exacto).</p>
        <p><strong>6.2 Facturación</strong> – Comprobantes electrónicos emitidos dentro de 24 horas.</p>
        <p><strong>6.3 No Pago</strong> – Bloqueo inmediato, gestión de cobranza y suspensión hasta cancelación total.</p>

        <h2>7. GESTIÓN DE TIEMPOS</h2>
        <p><strong>7.1 Punto a Punto</strong> – 5 minutos de cortesía. S/ 0.70 por minuto adicional. 15 minutos sin presentarse = No Show.</p>
        <p><strong>7.2 Servicios por Horas</strong> – 20 km por hora incluidos. S/ 3.00 por km adicional. Excesos menores a 30 min = media hora. Mayores a 30 min = hora completa.</p>

        <h2>8. PASAJEROS, EQUIPAJE Y MASCOTAS</h2>
        <p>Capacidad determinada por cinturones de seguridad. Equipaje incluido si cabe en maletera. Mascotas permitidas con aviso previo. El usuario asume daños o limpieza adicional.</p>

        <h2>9. CANCELACIONES Y PENALIDADES</h2>
        <ul>
          <li>Más de 2 horas: 0%</li>
          <li>1–2 horas: 10%</li>
          <li>Menos de 1 hora: 20%</li>
          <li>No Show: 50%</li>
        </ul>
        <p>YipiAs podrá cancelar por fuerza mayor con reembolso total o re-agendamiento.</p>

        <h2>10. RESPONSABILIDAD Y SEGUROS</h2>
        <p>Las unidades cuentan con SOAT vigente. YipiAs actúa como facilitador tecnológico. No responde por factores externos (tráfico, clima, bloqueos), conducta del usuario o fuerza mayor. La responsabilidad total de YIPIAS no excederá el monto pagado por el servicio que origine la reclamación.</p>

        <h2>11. SERVICIOS CORPORATIVOS</h2>
        <p>YipiAs podrá celebrar contratos específicos con empresas para la prestación de servicios de movilidad ejecutiva y empresarial...</p>

        <h2>12. PROHIBICIÓN DE DESINTERMEDIACIÓN</h2>
        <p>Está prohibido contratar directamente con conductores afiliados fuera de la plataforma. El incumplimiento podrá generar suspensión y acciones legales.</p>

        <h2>13. PROPIEDAD INTELECTUAL</h2>
        <p>Todos los contenidos, marcas, diseños y software pertenecen a YipiAs y están protegidos por ley.</p>

        <h2>14. PROTECCIÓN DE DATOS</h2>
        <p>El tratamiento de datos personales se rige por la Política de Privacidad publicada por YipiAs, conforme a la Ley N.º 29733.</p>

        <h2>15. FUERZA MAYOR</h2>
        <p>YipiAs no será responsable por manifestaciones, desastres naturales, bloqueos de vías, disposiciones gubernamentales o fallas técnicas externas.</p>

        <h2>16. MODIFICACIONES</h2>
        <p>YipiAs podrá modificar estos Términos cuando lo considere necesario. Las modificaciones entrarán en vigor 5 días hábiles después de su publicación.</p>

        <h2>17. LEY APLICABLE Y JURISDICCIÓN</h2>
        <p>Los presentes Términos se rigen por las leyes de la República del Perú. Toda controversia será sometida a los jueces y tribunales competentes de la ciudad de Piura.</p>

        <hr />

        <div className="contacto-final">
          <p><strong>CONTACTO</strong><br />
          Correo: soporte@yipias.com<br />
          WhatsApp: +51 904-635-462</p>
          <p>© 2026 YipiAs PREMIUM. Todos los derechos reservados.</p>
        </div>

        <div className="footer-checkbox">
          <input 
            type="checkbox" 
            id="volverCheckbox" 
            checked={aceptado}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="volverCheckbox">
            He leído y acepto los Términos y Condiciones. Al marcar, seré redirigido al inicio.
          </label>
        </div>

      </div>
    </main>
  );
};

export default Terminos;