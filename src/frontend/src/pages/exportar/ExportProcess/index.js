import React from 'react';
import './ExportProcess.css'; // Importa el archivo de estilos CSS para darle estilo a la página
import roadmapImage from './roadmap.png';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExportProcess = () => {
  return (
    <div className="export-process-container">
      <h1>
        Guía Práctica para exportar <br />tus productos desde Argentina
      </h1>
      <p>
        Exportar tus productos puede parecer un proceso complicado, especialmente si es la primera vez que lo intentas. Por eso, preparamos esta guía simple y directa que te ayudará a entender cada paso del proceso de exportación en Argentina. Considéralo una ruta a seguir para planificar tus ventas al exterior.
      </p>

      {/* Imagen introductoria */}
      <img src={roadmapImage} alt="Proceso de exportación" className="export-process-image" />
    
<p></p>
      {/* Secciones como Acordeones */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h6">1. Proceso Productivo: Todo comienza en el local</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Antes de pensar en trámites y permisos, debes conocer bien los costos de producción y de embalaje de tus productos. Saber cuánto te cuesta producir y embalar es clave para calcular el precio final de exportación y asegurarte de que sea rentable.
          </Typography>
          <Box mt={2}>
            <a href="/exportar/costos" className="more-info-link">¿Qué costos contempla una exportación?</a>
            &nbsp;&nbsp;
            <a href="/exportar/regimenes" className="more-info-link">¿Qué métodos para exportar existen?</a>
          </Box>
        </AccordionDetails>
      </Accordion>
<p></p>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography variant="h6">2. Trámites Previos: Nada sale sin los papeles correctos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Algunos productos requieren trámites específicos antes de salir de Argentina. Estos trámites se llaman "Intervenciones de terceros organismos" y son esenciales para evitar problemas en la aduana. Asegúrate de cumplir con estos requisitos para evitar que tu mercancía quede retenida.
          </Typography>
          <Box mt={2}>
            <a href="/exportar/requisitos" className="more-info-link">¿Qué trámites previos debo realizar?</a>
          </Box>
        </AccordionDetails>
      </Accordion>
<p></p>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
          <Typography variant="h6">3. Documentos de Exportación: El pasaporte de tu mercadería</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Cada exportación debe estar acompañada por documentos que respalden la operación. Estos documentos no solo te permiten cobrar la transacción, sino que también son necesarios para que tu cliente pueda nacionalizar la mercancía en su país. No subestimes la importancia de esta documentación.
          </Typography>
          <Box mt={2}>
            <a href="/exportar/requisitos" className="more-info-link">¿Qué documentos necesito?</a>
          </Box>
        </AccordionDetails>
      </Accordion>
<p></p>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
          <Typography variant="h6">4. Pedido de Booking: Reservando el transporte para tu mercadería</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Una vez que tengas todo listo (costos, trámites y documentos), es hora de reservar el transporte. El "booking" es, básicamente, una reserva para transportar tu carga a través de un puerto, aeropuerto, o depósito fiscal. Piensa en esto como comprar un boleto de avión para tus productos.
          </Typography>
          <Box mt={2}>
            <a href="/exportar/incoterms" className="more-info-link">Aprende sobre Logística Internacional</a>
          </Box>
        </AccordionDetails>
      </Accordion>
<p></p>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content" id="panel5a-header">
          <Typography variant="h6">5. Ingreso a Aduana: El último paso en casa</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Con la reserva de booking, puedes ingresar tu mercadería a la aduana. Aquí es donde las cosas se ponen serias. La mercancía pasa por un proceso de verificación física y debes obtener el "permiso de embarque".
          </Typography>
        </AccordionDetails>
      </Accordion>
<p></p>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6a-content" id="panel6a-header">
          <Typography variant="h6">6. Embarque: ¡Todo listo para partir!</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Una vez cumplidos todos los controles, tu mercadería se carga en el transporte y sale del país. Este es el momento en que todo tu trabajo duro comienza a dar frutos.
          </Typography>
        </AccordionDetails>
      </Accordion>
<p></p>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel7a-content" id="panel7a-header">
          <Typography variant="h6">7. Cobro: Asegurando tu dinero</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            El cobro no siempre ocurre después del embarque; depende de lo que hayas negociado con tu cliente. A veces, puedes pedir un anticipo o que paguen una parte antes de que el producto llegue a destino.
          </Typography>
          <Box mt={2}>
            <a href="/exportar/cobros" className="more-info-link">¿Cómo cobro una venta internacional?</a>
          </Box>
        </AccordionDetails>
      </Accordion>
<p></p>
     
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

export default ExportProcess;
