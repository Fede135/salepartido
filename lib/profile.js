//Metodos en el servidor relacionados con el perfil de usuario
Meteor.methods({
  
  completeProfile: function(doc) { //metodo que comprueba el tipo de los atributos del lado del servidor y luego para insertar en la bd los cambios 
    
    check(Meteor.userId(), String);
    check(doc, {
      name : String,
      locality : String,
      email : String
    });

    var user = Meteor.user();
    var locality = doc.locality;
    var userId = Meteor.users.upsert ({_id: user._id }, { $set: { localidad : locality }});

    return {
      _id: userId
    };
  }
});