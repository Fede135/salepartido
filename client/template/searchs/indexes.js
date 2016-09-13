const UsersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['profile.name', 'profile.firstName','profile.lastName'],
  engine: new EasySearch.MongoDB()
});