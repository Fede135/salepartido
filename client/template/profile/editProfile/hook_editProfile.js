AutoForm.addHooks(
  ['editProfile'],
  {
    after: {
      'method-update': function (error, result) {
      	console.log(result);
        if (! error)
          alert("Su perfil ha sido actualizado");
          Router.go('showProfile', {_id: Meteor.userId()});

 
    }
  }
},
)