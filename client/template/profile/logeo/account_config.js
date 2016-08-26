//Configuracion de campos adicionales al momento de registrarse.
//Solicitamos Nombre y Apellido para obtener los mismos datos que se obtienen por defecto desde Facebook, asi utilizamos solo una plantilla de editar perfil y no pedir esos datos.
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
// como hago para mandar los 2 campos extras a la bd??!!
 
/*var options = {
      profile:{
        firstName: $('input#firstName').val(),
        lastName : $('input#lastName').val()       
     }
};*/


/*Accounts.onCreateUser(function(options, user){ 
  var options = {
      profile:{
        firstName: $('input#firstName').val(),
        lastName : $('input#lastName').val()       
     }
  };
  console.log(firstName);
  return options;
});*/

   
// Accounts.CreateUser({profile:{firstName: $('input#firstName').val(), lastName: ('input#lastName').val() } }, function(error){});


 /* var fb = user.services.facebook;
  if (! fb) {
    user.profile.firstName = options.firstName;
    user.profile.lastName = options.lastName;
    user.profile.name = options.firstName +" "+ options.lastName ;
    //user._id = Random.id();
  } else {
    user.profile.firstName = fb.firstName;
    user.profile.lastName = fb.lastName;
    user.profile.name = fb.profile.firstName +" "+ fb.profile.lastName ;
  };
  
  return user;*/




