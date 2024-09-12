import React from 'react';
import './ExportProcess.css'; // Importa el archivo de estilos CSS para darle estilo a la página
import roadmapImage from './roadmap.png';

const ExportProcess = () => {
  return (
    <div className="export-process-container">
      <h1>Guía Práctica para exportar <br />tus productos desde Argentina</h1>
      <p>
        Exportar tus productos puede parecer un proceso complicado, especialmente si es la primera vez que lo intentas. Por eso, preparamos esta guía simple y directa que te ayudará a entender cada paso del proceso de exportación en Argentina. Considéralo una ruta a seguir para planificar tus ventas al exterior.
      </p>

      {/* Imagen introductoria */}
      <img src={roadmapImage} alt="Proceso de exportación" className="export-process-image" />

      <h2>1. Proceso Productivo: Todo comienza en el local</h2>
      <p>
        Antes de pensar en trámites y permisos, debes conocer bien los costos de producción y de embalaje de tus productos. Saber cuánto te cuesta producir y embalar es clave para calcular el precio final de exportación y asegurarte de que sea rentable.
      </p>
      <a href="/exportar/costos" className="more-info-link">¿Qué costos conntempla una exportación?</a>  
	  &nbsp; {/* Esto añade un espacio entre los enlaces */}
	  &nbsp; {/* Esto añade un espacio entre los enlaces */}
	  <a href="/exportar/regimenes" className="more-info-link">¿Qué métodos para exportar existen?</a>

     

      <h2>2. Trámites Previos: Nada sale sin los papeles correctos</h2>
      <p>
        Algunos productos requieren trámites específicos antes de salir de Argentina. Estos trámites se llaman "Intervenciones de terceros organismos" y son esenciales para evitar problemas en la aduana. Asegúrate de cumplir con estos requisitos para evitar que tu mercancía quede retenida.
      </p>
      <a href="/exportar/requisitos" className="more-info-link">¿Qué trámites previos debo realizar?</a>

    

      <h2>3. Documentos de Exportación: El pasaporte de tu mercadería</h2>
      <p>
        Cada exportación debe estar acompañada por documentos que respalden la operación. Estos documentos no solo te permiten cobrar la transacción, sino que también son necesarios para que tu cliente pueda nacionalizar la mercancía en su país. No subestimes la importancia de esta documentación.
      </p>
      <a href="/exportar/requisitos" className="more-info-link">¿Qué documentos necesito?</a>

     
      <h2>4. Pedido de Booking: Reservando el transporte para tu mercadería</h2>
      <p>
        Una vez que tengas todo listo (costos, trámites y documentos), es hora de reservar el transporte. El "booking" es, básicamente, una reserva para transportar tu carga a través de un puerto, aeropuerto, o depósito fiscal. Piensa en esto como comprar un boleto de avión para tus productos.
      </p>
	<a href="/exportar/incoterms" className="more-info-link">Aprende sobre Logística Internacional</a>
     
      <h2>5. Ingreso a Aduana: El último paso en casa</h2>
      <p>
        Con la reserva de booking, puedes ingresar tu mercadería a la aduana. Aquí es donde las cosas se ponen serias. La mercancía pasa por un proceso de verificación física y debes obtener el "permiso de embarque".
      </p>
       
     
      <h2>6. Embarque: ¡Todo listo para partir!</h2>
      <p>
        Una vez cumplidos todos los controles, tu mercadería se carga en el transporte y sale del país. Este es el momento en que todo tu trabajo duro comienza a dar frutos.
      </p>

      
      <h2>7. Cobro: Asegurando tu dinero</h2>
      <p>
        El cobro no siempre ocurre después del embarque; depende de lo que hayas negociado con tu cliente. A veces, puedes pedir un anticipo o que paguen una parte antes de que el producto llegue a destino.
      </p>
     <a href="/exportar/cobros" className="more-info-link">¿Cómo cobro una venta internacional?</a>
    
      <p>
        Exportar no tiene por qué ser complicado. Con esta línea de ruta orientativa, esperamos darte una primera visión clara de los pasos a seguir. Cada exportación es única, pero con esta base, estarás mejor preparado para enfrentar los desafíos y hacer crecer tu negocio internacionalmente. 
		</p>
		<p>¡Anímate a dar el paso y explorar nuevos mercados!
      </p>
    </div>
  );
};

export default ExportProcess;
