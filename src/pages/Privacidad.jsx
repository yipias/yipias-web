// src/pages/Privacidad.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Privacidad.css';

const Privacidad = () => {
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
    <main className="privacidad-page">
      <div className="container privacidad-container">
        <h1>POLÍTICA DE PRIVACIDAD</h1>
        <div className="fecha">YipiAs Premium · Última actualización: 15/02/2026</div>

        <div className="legal-block">
          <p><strong>Responsable del tratamiento:</strong><br />
          Plataformas y Soluciones Digitales S.A.C.<br />
          RUC: 20610695257<br />
          Marca: YipiAs Premium<br />
          Correo: soporte@yipias.com</p>
        </div>

        <h2>1. DATOS PERSONALES RECOPILADOS</h2>
        <p>YIPIAS recopila únicamente datos necesarios para la operación de los servicios:</p>
        <ul>
          <li>Nombre completo</li>
          <li>Documento de identidad (DNI u otro equivalente)</li>
          <li>Número de teléfono</li>
          <li>Correo electrónico</li>
          <li>Dirección de origen y destino</li>
          <li>Información de ubicación durante el servicio</li>
          <li>Historial de servicios</li>
          <li>Datos de facturación</li>
        </ul>
        <p>En caso de usuarios corporativos:</p>
        <ul>
          <li>Empresa</li>
          <li>Cargo</li>
          <li>Datos de contacto laboral</li>
        </ul>

        <h2>2. FINALIDAD DEL TRATAMIENTO</h2>
        <p>Los datos se usan exclusivamente para:</p>
        <ul>
          <li>Gestión y coordinación de los traslados</li>
          <li>Facturación electrónica</li>
          <li>Atención de solicitudes y reclamos</li>
          <li>Seguridad y prevención de fraudes</li>
          <li>Supervisión de conductores y cumplimiento operativo</li>
        </ul>
        <p>No se usarán para fines publicitarios ni comerciales, salvo autorización expresa posterior.</p>

        <h2>3. BASE LEGAL</h2>
        <p>El tratamiento de datos se realiza sobre la base de:</p>
        <ul>
          <li>Consentimiento del titular</li>
          <li>Ejecución del servicio contratado</li>
          <li>Cumplimiento de obligaciones legales y tributarias</li>
        </ul>

        <h2>4. CONSERVACIÓN DE DATOS</h2>
        <p>Los datos se conservarán:</p>
        <ul>
          <li>Mientras exista relación contractual activa</li>
          <li>Durante los plazos exigidos por ley</li>
          <li>Hasta que el titular solicite su cancelación, siempre que no exista obligación legal de conservarlos</li>
        </ul>

        <h2>5. TRANSFERENCIA DE DATOS</h2>
        <p>Los datos podrán compartirse solo con:</p>
        <ul>
          <li>Conductores afiliados (solo lo necesario para la prestación del servicio)</li>
          <li>Proveedores tecnológicos para hosting, facturación electrónica o soporte operativo</li>
          <li>Autoridades competentes cuando la ley lo exija</li>
        </ul>
        <p>No se cederán datos a terceros con fines publicitarios.</p>

        <h2>6. DERECHOS DEL TITULAR (ARCO)</h2>
        <p>El titular puede ejercer:</p>
        <ul>
          <li>Acceso</li>
          <li>Rectificación</li>
          <li>Cancelación</li>
          <li>Oposición</li>
        </ul>
        <p>Para ello debe enviar solicitud al correo: <strong>soporte@yipias.com</strong><br />
        Indicando nombre completo y número de documento.</p>

        <h2>7. MEDIDAS DE SEGURIDAD</h2>
        <p>YIPIAS aplica medidas técnicas y organizativas razonables para proteger los datos contra:</p>
        <ul>
          <li>Acceso no autorizado</li>
          <li>Uso indebido</li>
          <li>Pérdida o alteración</li>
        </ul>

        <h2>8. MODIFICACIONES</h2>
        <p>YIPIAS puede actualizar esta Política cuando lo considere necesario.<br />
        Las modificaciones se publicarán en la plataforma y entrarán en vigor desde su publicación.</p>

        <h2>9. LEY APLICABLE</h2>
        <p>La presente Política se rige por las leyes de la República del Perú.</p>

        <hr />

        <div className="contacto-final">
          <p><strong>CONTACTO</strong><br />
          Correo: soporte@yipias.com<br />
          WhatsApp: +51 904-635-462</p>
          <p>© 2026 YipiAs Premium. Todos los derechos reservados.</p>
        </div>

        <div className="footer-checkbox">
          <input 
            type="checkbox" 
            id="privacidadCheckbox" 
            checked={aceptado}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="privacidadCheckbox">
            He leído y acepto la Política de Privacidad y autorizo el tratamiento de mis datos personales exclusivamente para fines operativos según la Ley N.º 29733.
          </label>
        </div>
      </div>
    </main>
  );
};

export default Privacidad;