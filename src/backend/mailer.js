const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
    user: 'notificaciones.hubber@gmail.com', 
    pass: 'rmpf kvwn hytb teqt', 
    }
});

function generaHTML(notificacion){

  let htmlContent = `
  <body style="font-family: Arial, sans-serif; line-height: 1.5;">
    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
      <div style="background-color: #f5f5f5; padding: 10px; text-align: center;">
        <h1 style="color: #333;">Notificación de Nueva Normativa</h1>
      </div>
      <div style="padding: 20px;">
        <p>Estimado usuario,</p>
        <p>Te notificamos que ha sido publicada una <strong>${notificacion.motivo}</strong>: <span style="color: #ff6600; font-weight: bold;">${notificacion.interes}</span>.</p>
        
        <h2 style="color: #333;">Detalles de la Normativa</h2>
        <p><strong>Título:</strong> ${notificacion.normativa.titulo}</p>
        <p><strong>Descripción:</strong> ${notificacion.normativa.descripcion}</p>
        <p><strong>Normativa Origen:</strong> ${notificacion.normativa.normativaOrigen} Publicada por ${notificacion.normativa.agencia}</p>
        <p><strong>Fecha de Implementación:</strong> ${notificacion.fecha}</p>

        <p>Si tienes alguna consulta o deseas obtener más información, por favor consulta la publicación oficial de la normativa o comunícate con las autoridades correspondientes del país mencionado.</p>

        <p>Saludos cordiales,</p>
        <p>El equipo de Hubber</p>
      </div>
      <div style="background-color: #f5f5f5; padding: 10px; text-align: center;">
        <p style="font-size: 12px; color: #666;">Por favor, no respondas a este correo. Este mensaje ha sido enviado desde una dirección de correo electrónico no supervisada.</p>
      </div>
    </div>
  </body>
`;

return htmlContent;
}

function enviarMail(notificaciones){
    for (let notificacion of notificaciones){
        mailer(notificacion);
    }
}

function mailer(notificacion){
    let mailOptions = {
        from: 'notificaciones.hubber@gmail.com', 
        to: notificacion.email,  
        subject: notificacion.motivo, 
        text: notificacion.motivo,  
        html: generaHTML(notificacion)  
    };
    
    // Enviar el correo
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log('Error al enviar el correo:', error);
        } else {
        console.log('Correo enviado: ' + info.response);
        }
    });
}


module.exports = enviarMail;


