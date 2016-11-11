Accounts.ui.config({ 
  forceEmailLowercase: true,
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

T9n.setLanguage('es');

// AccountsTemplates.removeField('password');
// AccountsTemplates.addField({
//     _id: 'password',
//     type: 'password',
//     required: true,
//     minLength: 8,
//     placeholder: {
//         signUp: "At least eight characters"
//     },
//     //re: /(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
//     //errStr: 'At least 1 digit, 1 lower-case and 1 upper-case',
// });

Tracker.autorun(function () {
  
});
Accounts.onLogin(function (){
  var user = Meteor.user();
  // Meteor.subscribe('usersPlayer'), 
  
  if (user && user.services && user.services.facebook) {
    FacebookFriends = FacebookCollections.getFriends('me',['id','name']);
    //console.log('primer if');
 //Busca ls amigos de face y los guarda en el array friends del user
   Tracker.autorun(function () {
      //console.log('cantidad de amigos face',FacebookFriends.find().count());
      FacebookFriends.find().forEach(function (amigo) {
        var fbid = amigo.id; 
        //console.log('id de face',fbid);
        
        Meteor.setTimeout(function () {
          //console.log('timeout');
          //console.log(FacebookFriends.find().count() != 0)
          if (FacebookFriends.find().count() != 0){
              
              //console.log('if')
              //console.log(user.services.facebook.id);
              var userFace = Meteor.users.findOne({'services.facebook.id':fbid});//busco con el id de face al usuario
              if(userFace){
                 //console.log('usuario: ',userFace);
                 var idApp = userFace._id;//busco el id que tiene en la aplicacion
                 var correo = userFace.emails[0].address;
                 //console.log('_id: ',idApp);
                 //console.log('correo:',correo);
                 Meteor.users.update(Meteor.userId(),{
                  $addToSet: {'profile.friends':{id: idApp, correo: correo, fb:true}}
                }) //update  
              }//if user face
          }//if count 
    //ver que hacer si no entra a estos ifffff
    
       },4000);
               
      })//foreach
    })//tracker

  }//if
}); //accounts





//Meteor.logingIn()



accountsUIBootstrap3.map('es', {
  errorMessages: {
      genericTitle: "Hay un error.",
      userNotFound: "Usuario inexistente.",
      invalidEmail: "Correo electrónico inválido.",
      incorrectPassword: "Contraseña incorrecta.",
      //usernameTooShort: "Username must be at least 3 characters long",
      passwordTooShort: "La contraseña debe tener como mínimo 6 caracteres.",
      passwordsDontMatch: "Las contraseñas no son las mismas.",
      newPasswordSameAsOld: "La contraseña nueva y la vieja deben ser diferentes.",
      signupsForbidden: "Ingreso restringido."
 	} 
});