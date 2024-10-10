// src/frontend/pages/exportar/PaymentsAndReimbursements/index.js

import React from 'react';
import './style.css'; // Importar el CSS
import exportationTimeline from './calculadora.jpg'; // Importar imágenes
import exportationProcess from './dolares.jpg';
import reint from './reint.png';

import reintegroImage from './reintegro.jpg';
import {
  Box,
} from '@mui/material';


const PaymentsAndReimbursements = () => {
  return (
    <div className="payments-reimbursements-container">
      <h1>Cómo Cobrar una Exportación en Argentina:<br /> Proceso y Consideraciones para PYMEs</h1>
      <p>
        El proceso de cobrar una exportación en Argentina puede parecer complicado, pero con una buena planificación y entendiendo los pasos, cualquier PyME puede manejarlo sin problemas. A continuación, explicaremos en detalle cómo es este proceso y qué aspectos deben considerar las pequeñas y medianas empresas.
      </p>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src={reint} alt="Reintegros en Exportación" style={{ width: '750px', height: 'auto' }} />
</div>

      <h2>Plazos para el Ingreso de Divisas</h2>
      <p>
        En Argentina, cuando se exporta un producto, existe un plazo máximo para que el dinero obtenido por la exportación ingrese al país. Este plazo varía según el producto exportado. Por ejemplo, en el caso de exportar vinos, el pago debe ingresar al país dentro de los 180 días desde la fecha del "cumplido del permiso de embarque". Este "cumplido" es un trámite que confirma que la mercadería ha salido del país.
      </p>
      
      <img src={exportationTimeline} alt="Plazos para el Ingreso de Divisas" className="responsive-img" />

      <h2>Proceso de Cobro</h2>
      <p>Para que una PyME cobre por una exportación, el proceso generalmente sigue estos pasos:</p>
      <ol>
        <li>
          <strong>Recepción del Pago:</strong>
          <ul>
            <li>Cuando el cliente en el exterior hace el pago, este se recibe en dólares en el banco del exportador.</li>
            <li>El banco notificará al exportador (la PyME) sobre la recepción de los fondos.</li>
          </ul>
        </li>
        <li>
          <strong>Nacionalización del Cobro:</strong>
          <ul>
            <li>Una vez que el banco ha recibido el pago, la PyME tiene 5 días hábiles para "nacionalizar" el cobro. Esto significa convertir los dólares recibidos a pesos argentinos.</li>
            <li>Para hacerlo, la PyME debe enviar los documentos correspondientes al banco.</li>
          </ul>
        </li>
        <li>
          <strong>Liquidación de Divisas:</strong>
          <ul>
            <li>Según la normativa vigente, los exportadores deben liquidar el cobro de la siguiente manera:</li>
            <li>80% en MLC (Mercado Libre de Cambios)</li>
            <li>20% en CCL (Contado con Liquidación)</li>
            <li>El tipo de cambio promedio es el que finalmente determina cuántos pesos recibirá la PyME por cada dólar exportado.</li>
          </ul>
        </li>
      </ol>

      <h2>Consideraciones Importantes</h2>
      <ul>
        <li><strong>Cumplimiento de Plazos:</strong> Es fundamental que la PyME liquide las divisas dentro del plazo establecido (5 días hábiles). Si no se cumple con esto, puede quedar sujeta a la ley penal cambiaria y enfrentar multas.</li>
        <li><strong>Excepciones:</strong>
          <ul>
            <li>Régimen de Courier: No requiere el ingreso de divisas.</li>
            <li>Exporta Simple: Ofrece un plazo de 365 días para el ingreso de divisas, independientemente del producto exportado.</li>
          </ul>
        </li>
        <li><strong>Atrasos en el Pago:</strong> Si el cliente en el exterior se demora en el pago, es importante que la PyME se comunique con su banco para saber cómo presentar una nota o solicitar una excepción para evitar posibles problemas legales.</li>
      </ul>

      <img src={exportationProcess} alt="Proceso de Cobro" className="responsive-img" />

      <h2>Métodos de Exportación y Obligaciones</h2>
      <p>
        Dependiendo del método de exportación elegido, las obligaciones pueden variar:
      </p>
      <ul>
        <li><strong>Exporta Simple o Carga General:</strong> Es obligatorio ingresar divisas dentro del plazo establecido. No cumplir con esta obligación puede resultar en multas.</li>
      </ul>

      <h2>Recomendaciones para PYMEs</h2>
      <ol>
        <li><strong>Seguimiento de Plazos:</strong> Es crucial que las PyMEs mantengan un registro detallado de las fechas de embarque y los plazos correspondientes para el ingreso de divisas.</li>
        <li><strong>Comunicación con el Banco:</strong> Mantener una comunicación fluida con el banco es fundamental para estar al tanto de los pagos recibidos y los procedimientos de liquidación.</li>
        <li><strong>Documentación:</strong> Preparar y tener lista toda la documentación necesaria para la liquidación de divisas para evitar retrasos.</li>
        <li><strong>Planificación Financiera:</strong> Considerar el tipo de cambio promedio resultante de la liquidación (80% MLC + 20% CCL) al planificar financieramente la operación de exportación.</li>
        <li><strong>Anticipación a Problemas:</strong> Si se prevé un posible retraso en el pago por parte del cliente, es recomendable que la PyME se comunique proactivamente con el banco para explorar opciones y evitar sanciones.</li>
      </ol>

        <hr className="divider" />
      <h2>Reintegros en Exportación: Definición, Requisitos y Consideraciones para PYMEs</h2>
      <p>
        Los reintegros son beneficios que el gobierno argentino ofrece a los exportadores. Consisten en la devolución de parte de los impuestos que una empresa pagó durante la producción de los bienes que se exportaron. Esto puede ayudar a mejorar la rentabilidad de una exportación.
      </p>

      <h3>Definición</h3>
      <p>
        El reintegro es un régimen que permite la restitución total o parcial de los importes pagados en concepto de tributos internos (impuestos) por la mercadería de exportación para consumo. En otras palabras, es la devolución de impuestos que el exportador pagó durante la producción del bien exportado. El monto del reintegro se calcula como un porcentaje que depende del tipo de producto exportado (posición arancelaria).
      </p>

      <h3>Requisitos para Acceder a Reintegros</h3>
      <ol>
        <li>Registro del "cumplido" de la operación: La mercadería debe haber salido efectivamente del país.</li>
        <li>Liquidación del cobro de la exportación: La PyME debe haber recibido el pago por la venta internacional.</li>
        <li>Presentación de Documentación: Se deben presentar la factura comercial y otros documentos requeridos por el Sistema Informático Malvina (SIM).</li>
        <li>Ausencia de Bloqueos: No deben existir bloqueos que impidan el cobro de beneficios.</li>
        <li>Declaración de CBU: La empresa debe haber declarado una Clave Bancaria Uniforme (CBU) para la acreditación de fondos.</li>
        <li>Sin Embargos: No deben existir embargos sobre la operación o el exportador.</li>
        <li>Pago de Derechos: Se deben haber abonado los derechos a la exportación, si corresponde.</li>
        <li>Cumplimiento Fiscal: No deben registrarse incumplimientos fiscales por parte de la empresa.</li>
      </ol>
      <img src={reintegroImage} alt="Reintegros en Exportación" className="responsive-img" />
      <h3>Consideraciones Adicionales</h3>
      <ul>
        <li>El porcentaje de reintegro varía según el tipo de producto exportado. Es importante verificar este porcentaje antes de realizar la operación, ya que puede influir en la rentabilidad de la exportación.</li>
        <li>Los reintegros son un incentivo diseñado para fomentar las exportaciones, especialmente de productos con valor agregado.</li>
        <li>El proceso de solicitud y obtención de reintegros puede llevar tiempo, por lo que es importante considerarlo en la planificación financiera de la operación de exportación.</li>
        <li>Es recomendable mantener una documentación clara y ordenada de todas las operaciones y gastos relacionados con la producción y exportación del bien, para facilitar el proceso de solicitud de reintegros.</li>
      </ul>
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
          Fuente: Comisión Nacional de Comercio Exterior Argentino:{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://www.argentina.gob.ar/cnce">
            https://www.argentina.gob.ar/cnce
          </a>
          .
        </p>
      </Box>
      
    </div>
  );
};

export default PaymentsAndReimbursements;
