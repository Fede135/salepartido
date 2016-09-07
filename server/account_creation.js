Accounts.onCreateUser(function (options, user) { 
  if (options.profile) { 
    user.profile = options.profile;      
  }
  Meteor.setTimeout(function () {
    Roles.addUsersToRoles(user._id, ['player'], Roles.GLOBAL_GROUP);
  });
  return user;

})


