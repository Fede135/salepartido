//Configuracion de campos adicionales al momento de registrarse.
//Solicitamos Nombre y Apellido para obtener los mismos datos que se obtienen por defecto desde Facebook, asi utilizamos solo una plantilla de editar perfil y no pedir esos datos.
/*Accounts.emailTemplates.from = "Sale Partido <salepartido2016@gmail.com>"
Accounts.emailTemplates.resetPassword = {
  subject(user) {
    return "Resetee su contraseña en Sale Partido";
  },
  text(user, url) {
    return `Hola!
Presione el siguiente link para resetear su contraseña en Sale Partido.
${url}
Si usted no solicito este cambio, ignore este mail
Gracias,
El equipo de Sale Partido.
`
  },
  html(user, url) {
    process.env.MAIL_URL = "smtp://salepartido2016@gmail.com:adrigato@smtp.googlemail.com:465"
    // This is where HTML email content would go.
    // See the section about html emails below.
  }
};*/

Accounts.ui.config({ 
  requestPermissions: {
    facebook: ['public_profile','email','user_friends']
  }, 
  extraSignupFields: [
    {
    fieldName: 'firstName',
    fieldLabel: 'Nombre',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Ingrese su nombre");
            return false;
          } else {
           return true;
          }
    }
  },
  {
    fieldName: 'lastName',
    fieldLabel: 'Apellido',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Ingrese su apellido");
            return false;
          } else {
           return true;
          }
    },
    
  }]
  
});

//setear a castellano lo de logeo
accountsUIBootstrap3.setLanguage('es');

//Accounts.emailTemplates.from = "Sale Partido <salepartido2016@gmail.com>";


