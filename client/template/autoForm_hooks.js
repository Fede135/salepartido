AutoForm.addHooks(
  ['editProfile'],
  {
    after: {
      method: function (error, result) {
        if (! error)
          alert("Su perfil ha sido actualizado");
          Router.go('showProfile', {_id: Meteor.userId()});
      }
    }
  },
); 