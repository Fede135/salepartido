/*AutoForm.addHooks(
  ['editProfile'],
  {
    after: {
      'method-update': function (error, result) {
        if (! error)
          alert("Su perfil ha sido actualizado");
          Router.go('showProfile', {_id: Meteor.userId()});

 
    }
  }
},
)*/
AutoForm.addHooks(
  ['editProfile'],
  {
    after: {
      'method-update': function (error, result) {
        if (! error)
          
          $('#edit').alert("Su perfil ha sido actualizado");
          Router.go('showProfile', {_id: Meteor.userId()});
    }
  }
},
)
