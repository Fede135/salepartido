/*
//probando onCreateUser para almacenar firstName y lastName al momento de registrarse del usuario
Accounts.onCreateUser(function(options, user) { 
   user.profile.firstName = options.profile.firstName;
   user.profile.lastName = options.profile.lastName;
   user.profile.name = options.profile.firstName +" "+ options.profile.lastName ;
  return user 
});

*/