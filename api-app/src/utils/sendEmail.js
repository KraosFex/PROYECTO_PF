'use strict'
const nodemailer = require('nodemailer');
require('dotenv').config();
this.Bienvenida = (pnombre, correo = "valentina@gmail.com") => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port:process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  });
  let mail_options = {
    from: 'CodeLine',
    port:process.env.MAIL_PORT,
    to: correo +"m",
    subject: 'Bienvenido a la aplicación',
    html: `
            <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                <tr height="200px">  
                    <td bgcolor="" width="600px">
                        <h1 style="color: #fff; text-align:center">Bienvenido</h1>
                        <p  style="color: #fff; text-align:center">
                            <span style="color: #e84393">${pnombre}</span> 
                            a la aplicación
                        </p>
                    </td>
                </tr>
                <tr bgcolor="#fff">
                    <td style="text-align:center">
                        <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                    </td>
                </tr>
            </table>
        `
  };
  transporter.sendMail(mail_options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('El correo se envío correctamente ' + info.response);
    }
  });
};
this.Password = (link, correo = "valentina@gmail.com") => {
  let transporter2 = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port:process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  });
  let mail_options = {
    from: 'CodeLine',
    port:process.env.MAIL_PORT,
    to: correo+"m" ,
    subject: 'Restablece tu contraseña',
    html: `
            <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                <tr height="200px">  
                    <td bgcolor="" width="600px">
                        <h1 style="color: #fff; text-align:center">Hola, para setear tu contraseña has click en  el siguiente link</h1>
                        <p  style="color: #fff; text-align:center">
                            <a href=${link} >CLICK ME</a> 
                            a la aplicación
                        </p>
                    </td>
                </tr>
                <tr bgcolor="#fff">
                    <td style="text-align:center">
                        <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                    </td>
                </tr>
            </table>
        `
  };
  transporter2.sendMail(mail_options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('El correo se envío correctamente ' + info.response);
    }
  });
};
module.export = this;