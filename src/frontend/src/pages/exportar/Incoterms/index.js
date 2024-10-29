import React from 'react';
import './index.css'
import banner1 from './banner1.jpg';
import banner2 from './banner2.jpg';

import incoterms from './incoterms.png';
import exwimagen from './exw.png';
import fobimagen from './fob.png';

import {
  Box,
  
} from '@mui/material';

const Incoterms = () => {
  return (
   <div style={{ 
      padding: '30px', 
      fontFamily: 'Arial, sans-serif', 
      lineHeight: '1.6', 
      color: '#333', 
      maxWidth: '900px', 
      margin: '0 auto' 
    }}>
     
	  <h1 style={{ 
        color: '#0a417a', 
        textAlign: 'center' 
      }}>La logística internacional y los Incoterms: claves para una exportación eficiente</h1>
      <p style={{ textAlign: 'justify' }}>
        Expandir una PyME al mercado internacional es una oportunidad emocionante, pero también un desafío logístico y estratégico. 
        Para las PyMEs argentinas que desean competir a nivel global, entender cómo funciona la logística internacional y el rol de 
        los <strong>Incoterms</strong> (International Commercial Terms) es fundamental. Estos elementos permiten planificar mejor las 
        operaciones y minimizar riesgos en el proceso de exportación.
      </p>
	  
	    <img 
  src={banner1} 
  alt="Banner sobre logística internacional" 
  style={{ 
    width: '70%', 
    height: 'auto', 
    marginTop: '20px', 
    display: 'block', 
    marginLeft: 'auto', 
    marginRight: 'auto' 
  }} 
/>

      <h2 style={{ color: '#0a417a' }}>Logística internacional: optimizando el movimiento de mercancías</h2>
      <p style={{ textAlign: 'justify' }}>
        El transporte internacional abarca mucho más que simplemente enviar un producto de un país a otro. Las PyMEs deben coordinarse 
        con operadores logísticos, conocer las regulaciones aduaneras, y escoger el método de transporte más adecuado para su tipo de 
        mercancía y destino. Algunas variables clave incluyen:
      </p>
      <ul>
        <li><strong>Dimensiones de la carga y tipo de producto:</strong> Dependiendo de si la carga es perecedera, peligrosa o tiene 
          requisitos específicos de conservación, como refrigeración, se deben elegir los métodos y embalajes adecuados. Por ejemplo, 
          los productos congelados o líquidos requerirán sistemas de refrigeración especializados.
        </li>
        <li><strong>Tipo de transporte:</strong>
          <ul>
            <li><strong>Marítimo:</strong> Es el más usado a nivel global y el más rentable para transportar grandes volúmenes. Sin 
              embargo, su principal limitación es el tiempo, ya que los envíos pueden tardar semanas en llegar a destino.
            </li>
            <li><strong>Aéreo:</strong> Es mucho más rápido, pero los costos suelen ser significativamente más altos. Se utiliza principalmente 
              para productos de alto valor, urgentes o perecederos.
            </li>
            <li><strong>Terrestre:</strong> En el caso de exportaciones regionales a países vecinos como Bolivia, Chile, y Brasil, el 
              transporte terrestre es una opción eficiente, ya sea en camiones o trenes.
            </li>
            <li><strong>Multimodal:</strong> A menudo, la combinación de varios modos de transporte resulta ser la mejor opción para 
              optimizar tiempos y costos. Por ejemplo, una carga puede salir por tierra, luego viajar en avión y finalmente distribuirse 
              por camión en el país de destino.
            </li>
          </ul>
        </li>
        <li><strong>Control en la aduana:</strong> El cumplimiento de las normas aduaneras es crítico. Antes de ingresar una mercancía 
          a otro país, se debe verificar físicamente la carga para asegurarse de que cumple con las leyes locales y certificaciones necesarias, 
          tales como permisos sanitarios o certificados de origen.
        </li>
      </ul>
      
  
      <hr className="divider" />
      <h2 style={{ color: '#0a417a' }}>Incoterms: claridad y control en las operaciones de exportación</h2>
      <p style={{ textAlign: 'justify' }}>
        Los <strong>Incoterms</strong>, establecidos por la Cámara de Comercio Internacional (CCI), facilitan el comercio global al definir quién 
        es responsable de qué en una operación de exportación. Al estandarizar aspectos como costos, riesgos y trámites aduaneros, los Incoterms 
        permiten que exportadores e importadores hablen el mismo "lenguaje comercial". Aunque hay 11 términos reconocidos en total, en Argentina 
        predominan dos:
      </p>

      <h3 style={{ color: '#0a417a' }}>Ex Works (EXW)</h3>
      <p style={{ textAlign: 'justify' }}>
        Bajo este término, el exportador tiene la menor responsabilidad posible. Su obligación es preparar la mercancía en su fábrica o almacén y 
        el importador se hace cargo de todo lo demás (transporte, despacho aduanero, seguros, etc.).
      </p>
      <ul>
        <li><strong>Ventaja:</strong> Es ventajoso para el exportador porque implica menos gestión, pero a menudo no es ideal para PyMEs que buscan 
          tener más control sobre su producto y el proceso de transporte.
        </li>
        <li><strong>Consejo:</strong> EXW puede resultar más complicado para las PyMEs porque otorga menos control sobre la cadena logística, lo que 
          puede generar problemas si el transportista del importador no actúa conforme a los tiempos o estándares del exportador.
        </li>
      </ul>
    <img    
src={exwimagen} 
  alt="Banner sobre logística internacional" 
  style={{ 
    width: '65%', 
    height: 'auto', 
    marginTop: '20px', 
    display: 'block', 
    marginLeft: 'auto', 
    marginRight: 'auto' 
  }} 
/>

      <h3 style={{ color: '#0a417a' }}>Free on Board (FOB)</h3>
      <p style={{ textAlign: 'justify' }}>
        FOB es una opción más equilibrada para las PyMEs que desean mantener cierto control sobre el proceso de exportación. Bajo este término, 
        el exportador es responsable del producto hasta que esté cargado en el medio de transporte (barco, avión o camión), después de lo cual el 
        riesgo y los costos se transfieren al importador.
      </p>
      <ul>
        <li><strong>Ventaja:</strong> Este término permite al exportador gestionar la logística hasta el puerto o aeropuerto de salida, asegurando 
          que el producto está en buen estado y bien documentado. Además, permite tener una relación más cercana con el despachante de aduana, lo que 
          agiliza trámites y asegura que la mercancía cumple con todos los requisitos legales.
        </li>
        <li><strong>Desventaja:</strong> Requiere más trabajo por parte del exportador, ya que debe coordinarse con transportistas, despachantes y 
          aseguradores. Sin embargo, este esfuerzo adicional puede traducirse en mayor control y menos imprevistos.
        </li>
      </ul>
	   <img 
	  src={fobimagen} 
  alt="Banner sobre logística internacional" 
  style={{ 
    width: '65%', 
    height: 'auto', 
    marginTop: '20px', 
    display: 'block', 
    marginLeft: 'auto', 
    marginRight: 'auto' 
  }} 
/>
      

      <h3 style={{ color: '#0a417a' }}>Otros Incoterms relevantes para exportaciones argentinas</h3>
      <p style={{ textAlign: 'justify' }}>
        Además de EXW y FOB, las PyMEs argentinas pueden considerar otros Incoterms en función de las características de sus operaciones:
      </p>
      <ul>
        <li><strong>CIF (Cost, Insurance and Freight):</strong> Similar a FOB, pero el exportador también cubre el seguro y el flete hasta el puerto 
          de destino. Es ideal cuando el exportador desea ofrecer un servicio integral a sus clientes, pero implica más costos.
        </li>
        <li><strong>DDP (Delivered Duty Paid):</strong> En este caso, el exportador asume todas las responsabilidades, desde el envío hasta el pago 
          de impuestos en el país de destino. Este Incoterm es recomendable para empresas que quieren simplificar el proceso para el cliente final y 
          asumir todo el riesgo, pero también es más costoso.
        </li>
      </ul>
      <p> </p>
         <img 
  src={incoterms} 
  alt="Banner sobre logística internacional" 
  style={{ 
    width: '85%', 
    height: 'auto', 
    marginTop: '20px', 
    display: 'block', 
    marginLeft: 'auto', 
    marginRight: 'auto' 
  }} 
/>
 

      <h2 style={{ color: '#0a417a' }}>Despachantes de aduana: socios estratégicos</h2>
      <p style={{ textAlign: 'justify' }}>
        En cualquier exportación, especialmente bajo términos como FOB, el papel del <strong>despachante de aduana</strong> es crucial. Estos profesionales no solo 
        garantizan que la mercancía cumpla con las normativas aduaneras, sino que también ayudan a gestionar los documentos necesarios, como certificados de origen, 
        facturas pro forma y licencias de exportación.
      </p>
      <p style={{ textAlign: 'justify' }}>
        Para las PyMEs, contar con un despachante de confianza puede marcar la diferencia entre una exportación sin problemas y un proceso lleno de complicaciones. Además, 
        al establecer una relación cercana con el despachante de aduana, las PyMEs pueden beneficiarse de asesoramiento estratégico, conocimiento local y soluciones 
        personalizadas que optimizan tanto el tiempo como los costos de exportación.
      </p>
      <p style={{ textAlign: 'justify' }}>
        Es recomendable seleccionar un despachante con experiencia en el mercado objetivo y con un buen historial de cumplimiento aduanero. También es útil que conozca 
        las particularidades de los productos que se exportan, ya que esto puede facilitar la gestión de permisos especiales y certificaciones requeridas por los países de destino.
      </p>
      
     

      <h2 style={{ color: '#0a417a' }}>Conclusión: Prepararse para el éxito internacional</h2>
      <p style={{ textAlign: 'justify' }}>
        Las exportaciones representan una excelente oportunidad de crecimiento para las PyMEs argentinas, pero requieren planificación y conocimiento. La elección del 
        Incoterm adecuado, la gestión eficiente de la logística internacional, y la colaboración con despachantes de aduana experimentados son elementos esenciales para 
        garantizar una operación exitosa y sin contratiempos.
      </p>
      <p style={{ textAlign: 'justify' }}>
        Entender los aspectos mencionados permitirá a las PyMEs no solo minimizar riesgos y costos, sino también ofrecer un mejor servicio a sus clientes internacionales, 
        estableciendo relaciones comerciales más sólidas y duraderas.
      </p>

      <h3 style={{ color: '#0a417a' }}>Recursos adicionales</h3>
      <p style={{ textAlign: 'justify' }}>
        Para quienes desean profundizar en estos temas, recomendamos revisar las guías de exportación proporcionadas por cámaras de comercio y consultores expertos en 
        comercio exterior. Asegurarse de estar bien informado es el primer paso hacia el éxito en los mercados internacionales.
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
          Fuente: Sitio Web Oficial del Gobierno Argentino:{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://www.argentina.gob.ar/sites/default/files/incoterms.pdf">
            https://www.argentina.gob.ar/sites/default/files/incoterms.pdf
          </a>
          .
        </p>
      </Box>
	  
	  
    </div>
  );
};

export default Incoterms;
