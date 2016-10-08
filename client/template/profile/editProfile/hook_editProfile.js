AutoForm.addHooks(
  ['editProfile'],
  {
    after: {
      'method-update': function (error, result) {
        if (! error) {
          alert('Se editó su perfil correctamente');
          Router.go('showProfile', {_id: Meteor.userId()}); 
        }
      }
    } 
  }
);