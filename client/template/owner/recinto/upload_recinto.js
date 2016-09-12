// AutoForm.addHooks(
//   ["uploadRecinto"],
//   {
//     before   : {
//       method: CfsAutoForm.Hooks.beforeInsert
//     },
//     after    : {
//       method: CfsAutoForm.Hooks.afterInsert
//     }
//   }
// );

// AutoForm.hooks({
//  uploadRecinto: {
//    after: {
//      insert: function(error, result, template) {
//        insertedFile = Recintos.findOne(result).imagenes_id;
//        Images.update({_id: insertedFile}, {$set: {'recinto': result}});
//      }
//    }
//  }
// });

Template.uploadRecinto.helpers({

  imagenes:  function() {
    return Images.findOne({recinto: this._id});
  }
});


//Tendria que llamar a un metodo para que me inserte en Calificaciones
//el _id del recinto que esto creando al hacer click en el boton del 
//formulario.(el metodo donde inserta no esta).
/*
Template.uploadRecinto.events({
	'click #btn-upload-recinto':function(){
		Meteor.call('crarClificacion');

	}

});
*/
/*
  Meteor.setTimeout(function () {
    Roles.addUsersToRoles(user._id, ['player'], Roles.GLOBAL_GROUP);
  });
  return user;

})
*/
