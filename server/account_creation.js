/*ServiceConfiguration.configurations.upsert({
        {service: "facebook"},
        { $set: {
          appId:'1604179873208704',
          secret: '826d819af100945ff4f535b746a7b71b',
          requestPermissions: ['user_friends'] //here you are requesting the permission to get the user's friends
        }
});*/

/*Accounts.onCreateUser(function (options, user) { 
  if (options.profile) { 
    user.profile = options.profile;      
  }
  Meteor.setTimeout(function () {
    Roles.addUsersToRoles(user._id, ['player'], Roles.GLOBAL_GROUP);
  });

  return user;

})*/


Accounts.onCreateUser(function (options, user) {
  if(! user.services.facebook) { 
    if (options.profile) { 
      user.profile = options.profile;     
    };
  } else {
      if (options.profile) { 
        user.profile = options.profile;
        var emails = {
          address: user.services.facebook.email,
          verified : true
        };
        user.emails = [emails];
      };
  };
  
  //user.editedProfile = false;
  Meteor.setTimeout(function () {
    Roles.addUsersToRoles(user._id, ['player'], Roles.GLOBAL_GROUP);
  });
  
  return user;
})
  
