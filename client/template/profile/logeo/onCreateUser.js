//probando onCreateUser para almacenar firstName y lastName al momento de registrarse del usuario
//no se si va en el server o en el cliente
var options = {
       
    profile: {
        firstName: $('input#firstName'),
        lastName : $('input#lastName')
    },
};

Accounts.Meteor.onCreateUser(function(options, user) { 
   user.profile.firstName = options.profile.firstName;
   user.profile.lastName = options.profile.lastName;
   user.profile.name = options.profile.firstName +" "+ options.profile.lastName ;
  return user 
});


Meteor.loginWithFacebook({
    requestPermissions: ['public_profile','user_birthday','email' ]
});//, function(error){loginCallBack(error);});