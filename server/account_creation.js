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
 html(user, url) {
    return '<div style="width:100%;padding:24px 0 16px 0;background-color:#f5f5f5;text-align:center"><div style="padding:24px 32px 24px 32px;background:#fff;border-right:1px solid #eaeaea;border-left:1px solid #eaeaea" dir="ltr"><h1><font color="#1bb3af">SALE PARTIDO</font><font color="#444443"><h2>Restablecimiento de contraseña.</h2><h3>Ingresá al siguiente enlace y cambiá tu contraseña:</h3></font><h4>'+url+'</h4></div><table style="padding:14px 10px 0 10px" role="presentation" dir="ltr"><tbody><tr><td style="width:100%;font-size:11px;font-family:Roboto,Arial,Helvetica,sans-serif;color:#646464;line-height:20px;min-height:40px;vertical-align:middle">Sale Partido 2016, Mendoza, Argentina</td></tr></tbody></table></div>';
  }
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
    return '<div style="width:100%;padding:24px 0 16px 0;background-color:#f5f5f5;text-align:center"><div style="padding:24px 32px 24px 32px;background:#fff;border-right:1px solid #eaeaea;border-left:1px solid #eaeaea"><h1><font color="#444443">Gracias por registrarte en </font><font color="#1bb3af">SALE PARTIDO</font>.</h1></font><font color="#444443"><h3>Para terminar el proceso de registración, visitá el siguiente enlace y comenzá a utilizar la aplicación:</h3></font><h4>'+url+'</h4></div><table style="padding:14px 10px 0 10px" role="presentation" dir="ltr"><tbody><tr><td style="width:100%;font-size:11px;font-family:Roboto,Arial,Helvetica,sans-serif;color:#646464;line-height:20px;min-height:40px;vertical-align:middle">Sale Partido 2016, Mendoza, Argentina</td></tr></tbody></table></div>';
},
};

