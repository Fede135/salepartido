//Metodos en el servidor para editar el perfil de usuario
Meteor.methods({

  completeProfile: function (modifier, documentId) { //metodo que comprueba el tipo de los atributos del lado del servidor y luego para hacer un update en la bd los cambios

    check(modifier, Schema.users);
    check(documentId, documentId);

    var userId = Meteor.users.update(documentId, modifier);

    return {
      _id: userId
    };
  }
});
