  Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
  });
  Accounts.onCreateUser(function (options, user) {
  if(! user.services.facebook) { 
    if (options.profile) { 
      user.profile = options.profile;
      user.profile.name = user.profile.firstName+" "+user.profile.lastName;
      
    };
  } else {
    if(options.profile){
        user.profile = options.profile;
        user.profile.firstName = user.services.facebook.first_name;
        user.profile.lastName =user.services.facebook.last_name;      
        var emails = {
          address: user.services.facebook.email,
          verified : true
        };
        user.emails = [emails];

      ;
    }
  }; 

  Meteor.setTimeout(function () {
    if (Meteor.users.find().count() === 1 ){
     Roles.addUsersToRoles(user._id, ['admin'], Roles.GLOBAL_GROUP);
    }else{  
    Roles.addUsersToRoles(user._id, ['player'], Roles.GLOBAL_GROUP);
    }
      });
 
  return user;
})

//Accounts.emailTemplates.siteName = "Sale Partido"; //The public name of your application. Defaults to the DNS name of the application
Accounts.emailTemplates.from = "Sale Partido <salepartido2016@gmail.com>"
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
 /* html(user, url) {
    process.env.MAIL_URL = "smtp://salepartido2016@gmail.com:adrigato@smtp.googlemail.com:587"
    // This is where HTML email content would go.
    // See the section about html emails below.
  }*/
};
Accounts.emailTemplates.verifyEmail = {
  subject(user) {
    return "Verificacion correo electrónico. Sale Partido";//Asunto del correo
  },
  text(user, url) {
    return `Hola!
Para verificar su cuenta de correo electrónico, haga clic en el enlace de abajo.
${url}

Gracias,
El equipo de Sale Partido.
`
  },

  html (user, url) {
    /* Return your HTML code here: */
    return '<h1>Gracias por registrarte.</h1><br/><a href="' + url + '">Click para verificar el correo electrónico</a>';
},
};

