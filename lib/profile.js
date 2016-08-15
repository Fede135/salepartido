//Metodos en el servidor relacionados con el perfil de usuario
Meteor.methods({
  
  completeProfile: function(doc) { //metodo que comprueba el tipo de los atributos del lado del servidor y luego para insertar en la bd los cambios 
    //check(Meteor.userId(), String);
    console.log("antes del check");
    check(doc, Schema.users);
    
    
    var user = Meteor.user();
    var actualizacion = (doc, {
      nombreUsuario: doc.username,
      Email: doc.email
    });
    
    var userId = Meteor.users.upsert ({_id: user._id }, { $set: { profile : { username: nombreUsuario, email: Email } }});

    return {
      _id: userId
    };
  }
});