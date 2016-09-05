Accounts.onCreateUser(function (options, user) { 
  if (options.profile) { 
    user.profile = options.profile; 
  /*var rol= getRolesForUser(user._id, Roles.GLOBAL_GROUP);
  var userId = Meteor.users.update({_id: user._id}, {$set: {roles: rol}});*/     
  }
   // Roles.addUsersToRoles(user._id, 'player', Roles.GLOBAL_GROUP);
  return user;

})


