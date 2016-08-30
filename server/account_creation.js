/*
//probando onCreateUser para almacenar firstName y lastName al momento de registrarse del usuario
Accounts.onCreateUser(function(options, user) { 
   user.profile.firstName = options.profile.firstName;
   user.profile.lastName = options.profile.lastName;
   user.profile.name = options.profile.firstName +" "+ options.profile.lastName ;
  return user 
});

*/

 /*Accounts.onCreateUser(function (options, user) {
  var fb = user.services.facebook;
  if (! fb) {
    user.profile.firstName = options.profile.firstName;
    user.profile.lastName = options.profile.lastName;
    user.profile.name = options.profile.firstName +" "+ options.profile.lastName ;
    //user._id = Random.id();
  } else {
    user.profile.firstName = fb.firstName;
    user.profile.lastName = fb.lastName;
    user.profile.name = fb.profile.firstName +" "+ fb.profile.lastName ;
  };
  
  return user;
});*/