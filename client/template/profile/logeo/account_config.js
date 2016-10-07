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

Tracker.autorun(function () {
  
});

Accounts.onLogin(function (){
  console.log('login');
  var user = Meteor.user();

  if (user && user.services && user.services.facebook) {
    FacebookFriends = FacebookCollections.getFriends('me',['id','name']);

 //Busca ls amigos de face y los guarda en el array friends del user
   Tracker.autorun(function () {
      console.log('cantidad de amigos face',FacebookFriends.find().count());
      FacebookFriends.find().forEach(function (amigo) {
        var fbid = amigo.id; 
        correo = amigo.email;
        console.log('id de face',fbid);
        console.log('correo de face',correo);
        Meteor.setTimeout(function () {
          console.log('timeout');
          console.log(FacebookFriends.find().count() != 0)
          if (FacebookFriends.find().count() != 0){
              
              console.log('if')
              console.log(user.services.facebook.id);
              var userFace = Meteor.users.findOne({'services.facebook.id':fbid});//busco con el id de face al usuario
              if(userFace){
                 console.log('usuario: ',userFace);
                 var idApp = userFace._id;//busco el id que tiene en la aplicacion
                 
                 console.log('_id: ',idApp);
                 
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