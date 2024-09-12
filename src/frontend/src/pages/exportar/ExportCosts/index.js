import React from 'react';
import './costos.css'; // Asegúrate de tener un archivo CSS para los estilos

import costImage from './costos.jpg'; // Ruta de la imagen
import exportImage from './exportacostos.jpg'; // Ruta de la imagen

const IndexPage = () => {
  return (
    <div className="container">
      <h1>Costos a Considerar en una Exportación</h1>
      <p>
        Exportar productos puede ser una excelente oportunidad para hacer crecer tu negocio. Sin embargo, para asegurar una operación exitosa, es fundamental entender todos los costos involucrados. Aquí te explicamos de manera clara y sencilla los costos que debes considerar para que puedas presupuestar de manera efectiva y evitar sorpresas desagradables.
      </p>
      <img src={costImage} alt="Costos a Considerar" className="banner-image" />

      <h2>Desglose de Costos</h2>
      <ol>
        <li>
          <strong>Costos de Producción y Embalaje</strong>
          <ul>
            <li><strong>Producción:</strong> Determina cuánto cuesta fabricar una unidad de tu producto. Esto incluye materias primas, mano de obra y otros gastos de producción.</li>
            <li><strong>Embalaje:</strong> Incluye el costo del embalaje que utilizarás para proteger tu producto durante el transporte. El tipo de embalaje puede variar según cómo vayas a enviar tu producto (por ejemplo, en contenedor, palets, etc.).</li>
          </ul>
        </li>
        <li>
          <strong>Acarreo y Gastos de Despacho</strong>
          <ul>
            <li><strong>Acarreo:</strong> Es el costo de transportar tu producto desde tu fábrica o almacén hasta el puerto o aeropuerto desde donde se enviará.</li>
            <li><strong>Gastos de Despacho:</strong> Estos son costos adicionales que se incurre cuando tu producto llega al puerto o aeropuerto en el país de destino, y pueden incluir:
              <ul>
                <li>Depósitos Fiscales: Costos asociados con la inspección y almacenamiento en aduanas.</li>
                <li>Verificaciones: Costos por inspección y cumplimiento de regulaciones.</li>
                <li>Manipulación: Gastos por mover y manejar la mercadería.</li>
                <li>Consolidación: Costos para agrupar tu carga con otras si se utiliza un contenedor compartido.</li>
                <li>Otros Gastos: Otros costos relacionados que puedan surgir.</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <strong>Honorarios del Despachante de Aduana</strong>
          <ul>
            <li>Estos son los honorarios que pagarás a un agente de aduanas para que gestione el proceso de importación en el país de destino. Si estás usando un servicio como Exporta Simple o Courier, estos honorarios no se aplican.</li>
          </ul>
        </li>
        <li>
          <strong>Retenciones</strong>
          <ul>
            <li>También conocidas como derechos de exportación, son tarifas que se deben pagar al gobierno. El monto depende del tipo de producto que estás exportando.</li>
          </ul>
        </li>
        <li>
          <strong>Reintegros</strong>
          <ul>
            <li>Son reembolsos o beneficios que puedes recibir del gobierno por exportar productos. Aunque este ingreso es positivo, debe considerarse en el cálculo total de costos y beneficios.</li>
          </ul>
        </li>
        <li>
          <strong>Costo de Transporte Internacional y Seguro de Carga</strong>
          <ul>
            <li><strong>Transporte Internacional:</strong> El costo de enviar tu producto desde el puerto o aeropuerto en tu país hasta el país de destino. Esto depende del Incoterm que acuerdes con tu cliente (Incoterms son términos internacionales que definen responsabilidades y costos en la venta).</li>
            <li><strong>Seguro de Carga:</strong> Aunque el seguro de carga internacional puede no estar incluido en tu contrato de venta, es recomendable contar con un seguro local para cubrir el transporte hasta el punto de embarque internacional.</li>
          </ul>
        </li>
      </ol>

      <h2>Consideraciones Importantes</h2>
      <ul>
        <li>Presupuesto Previo: Antes de acordar un contrato con un cliente en el exterior, haz un presupuesto detallado que incluya todos estos costos.</li>
        <li>Verificación Posterior: Después de embarcar la carga, verifica los costos con la documentación final para ajustar cualquier diferencia.</li>
        <li>Condición de Venta (Incoterm): Asegúrate de entender cómo el Incoterm afecta qué costos asumes tú como exportador y cuáles asume el importador.</li>
        <li>Seguro de Carga: Incluso si el flete internacional no está incluido en el contrato, tener un seguro local es recomendable para proteger tu carga hasta el punto de embarque.</li>
      </ul>
     <img src={exportImage} alt="Proceso de Exportación" className="banner-image" />
      <h2>Recomendaciones</h2>
      <ol>
        <li>Análisis Detallado: Examina cada componente del costo para establecer el precio de venta de manera precisa.</li>
        <li>Actualización Regular: Revisa y actualiza tus costos frecuentemente, especialmente en un entorno económico cambiante.</li>
        <li>Asesoramiento Profesional: Consulta con expertos en comercio exterior para evitar costos ocultos o errores.</li>
        <li>Flexibilidad: Prepárate para adaptarte a cambios en los costos o requisitos del cliente.</li>
        <li>Documentación: Guarda un registro detallado de todos los costos para futuras referencias y para facilitar la toma de decisiones en operaciones futuras.</li>
      </ol>

    
    </div>
  );
};

export default IndexPage;
