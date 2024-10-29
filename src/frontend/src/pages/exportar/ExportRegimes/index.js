import React, { useState } from 'react';
import './ExportRegimes.css'; // Asegúrate de crear este archivo para estilos personalizados

// Importa las imágenes
import courierBanner from './courier.jpg';
import exportaSimpleBanner from './exporta-simple.jpg';
import cargaGeneralBanner from './carga-general.jpg';
import tablaRegimenes from './tabla.png';

import {
  Box,
  
} from '@mui/material';

const ExportRegimes = () => {
  const [showPopup, setShowPopup] = useState(false); // Estado para manejar el popup

  // Función para mostrar el popup
  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  // Función para ocultar el popup
  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="export-regimes-container">
      <h1>Regímenes de Exportación en Argentina: ¿Cuál es el Mejor para tu PyME?</h1>
      <p>
        Si estás pensando en expandir tu negocio más allá de las fronteras nacionales, es esencial conocer los distintos regímenes de exportación disponibles. En Argentina, existen tres regímenes clave que ofrecen diferentes beneficios y requisitos. Cada uno está diseñado para adaptarse a necesidades específicas, por lo que es crucial elegir el que mejor se ajuste a tu tipo de exportación y situación empresarial. Vamos a desglosar cada régimen para que puedas tomar decisiones informadas y aprovechar al máximo tus oportunidades de exportación.
      </p>
      {/* Imagen introductoria */}
      <img src={tablaRegimenes} alt="Regimenes de exportación" className="export-regimenes-image" />

      <h2>1. Régimen de Courier: Ideal para envíos pequeños y muestras</h2>
      <p>
        El Régimen de Courier es perfecto si estás enviando pequeñas cantidades o muestras de tu producto. ¡Y lo mejor es que cualquier persona o empresa puede usarlo! Aquí te contamos los puntos clave:
      </p>
      <ul>
        <li><strong>Requisitos Mínimos:</strong> Solo necesitas tener el Nivel de Seguridad 3 y datos biométricos registrados en la AFIP.</li>
        <li><strong>Límites:</strong> Puedes enviar hasta 3,000 USD por envío y hasta 50 kg. Ideal para envíos rápidos y de bajo volumen.</li>
        <li><strong>Ventajas:</strong> Los envíos bajo este régimen suelen ser menos complejos en términos de procedimientos aduaneros, ya que <span className="courier-info-link" onClick={handlePopupOpen}>una empresa de courier se encarga de los trámites</span>. Sin embargo, el exportador debe asegurarse de que toda la documentación (factura comercial, descripción del producto, etc.) esté correcta para evitar problemas en la aduana. Otra ventaja de este régimen es que el cobro de tu venta no está obligado a realizarse en Argentina, lo que te da flexibilidad.</li>
        <li><strong>Consideraciones:</strong> No permite recibir reintegros y debes pagar retenciones y derechos. Aunque el proceso es simplificado, es importante que toda la documentación esté correcta para evitar problemas en la aduana.</li>
      </ul>

      {/* Imagen banner para Régimen de Courier */}
      <img src={courierBanner} alt="Régimen de Courier" className="export-regimes-banner" />

      {/* Popup informativo */}
      {showPopup && (
        <div className="courier-popup" onClick={handlePopupClose}>
          <div className="courier-popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>¿Qué es una empresa de Courier?</h3>
            <p>Las empresas de courier son servicios especializados en el transporte rápido de paquetes y documentos, tanto a nivel nacional como internacional. Estas empresas actúan como intermediarios en el proceso de envío, gestionando la logística y los trámites aduaneros asociados. Algunas de las empresas de courier más conocidas incluyen DHL, FedEx, UPS, y Mail Express.</p>
             
            <button onClick={handlePopupClose} className="close-popup-btn">Cerrar</button>
          </div>
        </div>
      )}

      <h2>2. Exporta Simple: El favorito de las PyMEs</h2>
      <p>
        Exporta Simple fue diseñado pensando en las pequeñas y medianas empresas que necesitan un régimen más accesible que el de Carga General. Aquí están los detalles esenciales:
      </p>
      <ul>
        <li><strong>Límites:</strong> Permite enviar hasta 15,000 USD por carga y hasta 600,000 USD anuales. Las restricciones de peso y volumen son mínimas, con excepciones en las dimensiones de los bultos (180 cm alto x 145 cm ancho).</li>
        <li><strong>Transporte:</strong> Solo se utiliza transporte aéreo, por lo que las restricciones son las que imponen las aerolíneas.</li>
        <li><strong>Ventajas:</strong> No necesitas despachante, ya que las empresas de courier manejan todo el proceso. Además, puedes percibir reintegros porque se exige el ingreso de divisas dentro de los 365 días desde la salida del país.</li>
        <li><strong>Consideraciones:</strong> Aunque es muy conveniente, recuerda que debes cumplir con las regulaciones de ingreso de divisas.</li>
      </ul>

      {/* Imagen banner para Exporta Simple */}
      <img src={exportaSimpleBanner} alt="Exporta Simple" className="export-regimes-banner" />

      <h2>3. Carga General: La opción más flexible</h2>
      <p>
        Para aquellos con necesidades más grandes o exportaciones más complejas, el Régimen de Carga General ofrece la mayor flexibilidad:
      </p>
      <ul>
        <li><strong>Límites:</strong> No hay restricciones en cuanto al peso o al valor de la carga. Puedes usar cualquier medio de transporte.</li>
        <li><strong>Requisitos:</strong> Necesitas un despachante de aduanas. Es obligatorio el ingreso de divisas según el tipo de producto.</li>
        <li><strong>Ventajas:</strong> Ofrece la posibilidad de recibir reintegros. A pesar de ser un poco más complejo, es la mejor opción si tus exportaciones son más grandes o variadas.</li>
        <li><strong>Consideraciones:</strong> Incluye costos adicionales en forma de retenciones.</li>
      </ul>

      {/* Imagen banner para Carga General */}
      <img src={cargaGeneralBanner} alt="Carga General" className="export-regimes-banner" />

      <p>
        Elegir el régimen de exportación adecuado puede marcar una gran diferencia en la eficiencia y rentabilidad de tus operaciones internacionales. Evalúa tus necesidades específicas, el tamaño de tus envíos y el tipo de productos que ofreces para tomar la mejor decisión.
      </p>
	  
	   <Box
        sx={{
          height: '1.5em',
          fontSize: 10,
          fontWeight: 'light',
          fontStyle: 'oblique',
          flexDirection: 'column',
        }}
      >
        <p>
          Fuente: Administración Federal de Ingresos Públicos:{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://www.afip.gob.ar/envios-internacionales/">
            https://www.afip.gob.ar/envios-internacionales/
          </a>
          .
        </p>
      </Box>
	  
    </div>
  );
};

export default ExportRegimes;
