AutoForm.addHooks(
  ['editProfile'],
  {
    after: {
      'method-update': function (error, result) {
        if (! error) {
          perfilEditado = true;
          Router.go('showProfile', {_id: Meteor.userId()}); 
        }
      }
    } 
  }
);