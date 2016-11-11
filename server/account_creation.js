  Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
  });
 
  Accounts.onCreateUser(function (options, user) {
  if(! user.services.facebook) { 
    if (options.profile) { 
      user.profile = options.profile;
      user.profile.name = user.profile.firstName+" "+user.profile.lastName;
      user.estado_usuario = "habilitado";
      
    };
  } else {
    if(options.profile){
        user.profile = options.profile;
        user.profile.firstName = user.services.facebook.first_name;
        user.profile.lastName =user.services.facebook.last_name; 
        user.estado_usuario = "habilitado";     
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
    return "Restablecer contraseña en Sale Partido";
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
    return '<div style="width:100%;padding:24px 0 16px 0;background-color:#c9c9c9;text-align:justify"><table style="border-collapse:collapse;width:310px;margin:0 auto;background-color:#f5f5f5" width="310" border="0" align="center" cellspacing="0" cellpadding="0"><tbody><tr style="page-break-before:always"><td id="m_-2906203497531590466firefox-logo" style="padding:20px 0" align="center"><img src="https://rawgit.com/Fede135/salepartido/master/public/logo_salepartido5.png" alt="" class="CToWUd" width="88" height="95"></td></tr><tr style="page-break-before:always"><h1 style="font-family:sans-serif;font-weight:normal;margin:0 0 24px 0;text-align:center">Restablecer contraseña</h1><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0 0 24px 0;text-align:center">Ingresá al siguiente enlace y cambiá tu contraseña:<br><br></p></td></tr>  <tr height="50"><td valign="top" align="center"><table id="m_-2906203497531590466email-button" style="border-collapse:collapse;background-color:#0996f8;border-radius:4px;height:50px;width:310px!important" width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="page-break-before:always"><td style="font-family:sans-serif;font-weight:normal;text-align:center;margin:0;color:#ffffff;font-size:20px;line-height:100%" valign="middle" align="center"><a href="'+url+'" style="font-family:sans-serif;color:#fff;display:block;padding:15px;text-decoration:none;width:280px" target="_blank" data-saferedirecturl="url">Restablecer contraseña</a></td></tr></tbody></table></td></tr><tr style="page-break-before:always"><td border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><br><p width="310" class="m_-2906203497531590466secondary" style="font-family:sans-serif;font-weight:normal;margin:0 0 12px 0;text-align:center;color:#8a9ba8;font-size:11px;line-height:13px;width:310px!important;word-wrap:break-word;word-break:break-all">Además:<a href="'+url+'" style="color:#1bb3af;text-decoration:none;width:310px!important;display:block"><br><font style="word-break:break-all">'+url+'</font></a></p></td></tr><tr style="page-break-before:always"><td valign="top"><p style="font-family:sans-serif;font-weight:normal;margin:0;text-align:center;color:#8a9ba8;font-size:11px;line-height:13px;width:310px!important;word-wrap:break-word">Sale Partido 2016, Mendoza, Argentina<br><a href="http://localhost:3000/TerminosDeUso" style="color:#1bb3af;text-decoration:none;font-family:sans-serif" target="_blank" data-saferedirecturl="http://localhost:3000/TerminosDeUso">Terminos y condiciones de Sale Partido</a></p></td></tr></tbody></table><div class="yj6qo"></div><div class="adL"></div></div>';
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
    return '<div style="width:100%;padding:24px 0 16px 0;background-color:#c9c9c9;text-align:justify"><table style="border-collapse:collapse;width:310px;margin:0 auto;background-color:#f5f5f5" width="310" border="0" align="center" cellspacing="0" cellpadding="0"><tbody><tr style="page-break-before:always"><td id="m_-2906203497531590466firefox-logo" style="padding:20px 0" align="center"><img src="https://rawgit.com/Fede135/salepartido/master/public/logo_salepartido5.png" alt="" class="CToWUd" width="88" height="95"></td></tr><tr style="page-break-before:always"><h1 style="font-family:sans-serif;font-weight:normal;margin:0 0 24px 0;text-align:center">Bienvenido!</h1><h2 style="font-family:sans-serif;font-weight:normal;margin:0 0 24px 0;text-align:center">Gracias por registrarte en <font color="#1bb3af">SALE PARTIDO</font></h2><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0 0 24px 0;text-align:center">Para terminar el proceso de registración visitá el siguiente enlace y comenzá a utilizar la aplicación:<br><br></p></td></tr>  <tr height="50"><td valign="top" align="center"><table id="m_-2906203497531590466email-button" style="border-collapse:collapse;background-color:#1bb3af";border-radius:4px;height:50px;width:310px!important" width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="page-break-before:always"><td style="font-family:sans-serif;font-weight:normal;text-align:center;margin:0;color:#ffffff;font-size:20px;line-height:100%" valign="middle" align="center"><a href="'+url+'" style="font-family:sans-serif;color:#fff;display:block;padding:15px;text-decoration:none;width:280px" target="_blank" data-saferedirecturl="url">Confirmar inicio de sesión</a></td></tr></tbody></table></td></tr><tr style="page-break-before:always"><td border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><br><p width="310" class="m_-2906203497531590466secondary" style="font-family:sans-serif;font-weight:normal;margin:0 0 12px 0;text-align:center;color:#8a9ba8;font-size:11px;line-height:13px;width:310px!important;word-wrap:break-word;word-break:break-all">Además:<a href="'+url+'" style="color:#0996f8;text-decoration:none;width:310px!important;display:block"><br><font style="word-break:break-all">'+url+'</font></a></p></td></tr><tr style="page-break-before:always"><td valign="top"><p style="font-family:sans-serif;font-weight:normal;margin:0;text-align:center;color:#8a9ba8;font-size:11px;line-height:13px;width:310px!important;word-wrap:break-word">Sale Partido 2016, Mendoza, Argentina<br><a href="http://localhost:3000/TerminosDeUso" style="color:#0996f8;text-decoration:none;font-family:sans-serif" target="_blank" data-saferedirecturl="http://localhost:3000/TerminosDeUso">Terminos y condiciones de Sale Partido</a></p></td></tr></tbody></table><div class="yj6qo"></div><div class="adL"></div></div>';
},
};

