AutoForm.addHooks(
  ['editProfile'],
  {
    after: {
      'method-update': function (error, result) {
        if (! error) {
          Session.set('alertPerfilEditado', true);
          Router.go('showProfile', {_id: Meteor.userId()}); 
        }
      }
    } 
  }
);