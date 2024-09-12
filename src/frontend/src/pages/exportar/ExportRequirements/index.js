import React from 'react';
import './index.css'; // Importa el CSS

// Importa las imágenes
import imagen1 from './imagen1.jpg'; // Reemplaza con la ruta y nombre de tu imagen
import imagen2 from './imagen2.jpg'; // Reemplaza con la ruta y nombre de tu imagen

const ExportacionPage = () => {
  return (
    <div style={{ 
      padding: '30px', 
      fontFamily: 'Arial, sans-serif', 
      lineHeight: '1.6', 
      color: '#333', 
      maxWidth: '900px', 
      margin: '0 auto'

    }}>
      <h1>Guía Detallada de Exportación para Empresas Argentinas:<br/>Requisitos y documentos claves</h1>
      
      

      <section>
        <h2>Introducción</h2>
        <p>
          La exportación representa una oportunidad fundamental para el crecimiento de las empresas argentinas, ofreciendo acceso a nuevos mercados y diversificación de ingresos. Aunque el proceso puede parecer complejo, con la correcta planificación y conocimiento, cualquier empresa puede gestionar sus operaciones de exportación de manera eficiente. Esta guía busca proporcionar una explicación detallada de los requisitos, procedimientos y aspectos esenciales para exportar desde Argentina.
        </p>
      </section>
     
      <section>
        <h2>Cambios Recientes en la Normativa de Exportación</h2>
        <p>
          En diciembre de 2023, la Administración Federal de Ingresos Públicos (AFIP) implementó cambios significativos en el sistema de exportación, mediante la Resolución General 5472/2023. Uno de los cambios más relevantes fue la eliminación del antiguo Registro de Exportadores e Importadores, que fue reemplazado por el nuevo "Perfil del Exportador-Importador". Este cambio simplifica el proceso de registro, eliminando trámites burocráticos innecesarios. A partir de ahora, las empresas que cumplan con ciertos requisitos se incorporan automáticamente en el sistema de exportadores.
        </p>
        <p>
          El nuevo perfil permite que las empresas puedan operar en comercio exterior sin necesidad de inscribirse de manera individual. Los requisitos necesarios para obtener este perfil están alineados con el cumplimiento de las normativas fiscales y aduaneras del país, lo que garantiza un proceso más ágil y automático, siempre que la empresa mantenga sus obligaciones al día. Este cambio ha sido clave para agilizar las operaciones de exportación y reducir los tiempos de aprobación.
        </p>
      </section>
    <img src={imagen1} alt="Imagen de Exportación" className="banner" />
      <section>
        <h2>Requisitos para Exportar</h2>
        <p>
          El primer paso para una empresa que desee exportar es contar con el "Perfil del Exportador-Importador" en AFIP. Para obtener este perfil, las empresas deben cumplir con varios requisitos, comenzando por la presentación de un certificado de antecedentes penales, que es obligatorio tanto para personas físicas como para jurídicas. En el caso de las personas jurídicas, este certificado debe ser presentado por todos los socios de la empresa, y debe gestionarse a través del Registro Nacional de Reincidencia.
        </p>
        <p>
          Otro de los requisitos esenciales es estar dado de alta en al menos uno de los principales impuestos nacionales: el Impuesto al Valor Agregado (IVA), el Impuesto a las Ganancias o el Régimen Simplificado para Pequeños Contribuyentes (Monotributo). Asimismo, es fundamental que la situación fiscal de la empresa esté regularizada, lo que implica no estar en concurso preventivo o quiebra, y no tener antecedentes negativos en el Registro de Infractores de la AFIP.
        </p>
        <p>
          Además, las empresas deben registrar sus datos biométricos en AFIP y obtener el Nivel de Seguridad 3, que les permite operar digitalmente en el sistema aduanero. Este trámite debe realizarse de manera presencial en las oficinas de la AFIP. Para las personas jurídicas, también es necesario tener actualizados los datos societarios en la Inspección General de Justicia (IGJ), especialmente en lo que respecta a la designación de autoridades.
        </p>
        <p>
          El uso de sistemas de comunicación aduanera es otro de los pilares para la exportación. Es indispensable que las empresas estén dadas de alta en el SICNEA (Sistema Informático de Comunicación y Notificación Electrónica Aduanera) y en el SITA (Sistema Informático de Trámites Aduaneros). Estos sistemas son esenciales para la recepción de notificaciones y la realización de trámites electrónicos vinculados al comercio exterior.
        </p>
      </section>

      <section>
        <h2>Documentación Esencial para Exportar</h2>
		
		
        <p>
          Uno de los aspectos más importantes para el éxito en una operación de exportación es la correcta gestión de la documentación. El documento central en este proceso es la Factura E, que es la factura electrónica de exportación emitida a través del sistema de AFIP. Esta factura debe incluir detalles completos del producto que se exporta, como la cantidad, el valor unitario y total, el Incoterm utilizado, el plazo de pago, y la información del cliente en el país de destino. A diferencia de una factura nacional, la Factura E contiene información específica sobre la operación internacional.
        </p>
        <p>
          Otro documento esencial es la Lista de Empaque o Packing List, que describe en detalle la cantidad total de bultos o cajas, el peso neto de la mercadería, el peso bruto total y las dimensiones de los bultos. Este documento es fundamental para el transporte de la mercadería y el despacho aduanero, tanto en origen como en destino.
        </p>
        <p>
          Dependiendo del medio de transporte utilizado, se requiere un documento de transporte específico. Para el transporte aéreo, se utiliza la Guía Aérea (Air Waybill), mientras que para el transporte marítimo se requiere el Conocimiento de Embarque (Bill of Lading), y para el transporte terrestre, la Carta de Porte o CRT. Todos estos documentos deben incluir información sobre el exportador, el importador, los detalles logísticos del envío, y la descripción de la mercadería.
        </p>
        <p>
          El Certificado de Origen es otro documento clave, aunque no es obligatorio en todas las exportaciones. Este certificado es especialmente relevante para exportaciones dentro del Mercosur o a países con acuerdos comerciales preferenciales. El Certificado de Origen certifica el país de procedencia de los productos y puede proporcionar beneficios arancelarios en el país de destino.
        </p>
      </section>
<img src={imagen2} alt="Imagen de Consideraciones" className="banner2" />
      <section>
        <h2>Consideraciones Adicionales</h2>
        <p>
          Además de los requisitos y la documentación, las empresas exportadoras deben prestar especial atención a las regulaciones del país de destino. Cada país tiene sus propias normativas para la importación de productos, y es fundamental cumplir con ellas para evitar que la mercadería sea retenida en la aduana de destino. En algunos casos, se pueden requerir certificaciones específicas o cumplir con restricciones de tipo sanitario o fitosanitario.
        </p>
        <p>
          Es crucial que las empresas clasifiquen correctamente sus productos utilizando la posición arancelaria, un código numérico que determina los aranceles y regulaciones aplicables. Una clasificación incorrecta puede dar lugar a problemas aduaneros y costos adicionales, por lo que es importante verificar que se esté utilizando el código adecuado para cada tipo de producto.
        </p>
        <p>
          Para conocer tu código arancelario y las regulaciones de cada país visita la sección de Buscar normativas que tiene Hubber.
        </p>
      </section>

      
    </div>
  );
};

export default ExportacionPage;
