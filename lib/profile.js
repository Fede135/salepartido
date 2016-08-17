 //Metodos en el servidor relacionados con el perfil de usuario
 Meteor.methods({
   
   completeProfile: function(doc) { //metodo que comprueba el tipo de los atributos del lado del servidor y luego para insertar en la bd los cambios 
   check(doc, Schema.users);
    
     
    var user = Meteor.user();
    var actualizacion = (doc, { 
        birthday : doc.profile.birthday,
        gender : doc.profile.gender,
        country : {
          county: doc.profile.country.country,
          province : doc.profile.country.province,
          locality : doc.profile.country.locality,
          neighborhood : doc.profile.country.neighborhood
        }
    });
    //error al realizar la actualizacion ya que si el usuario esta logeado con Facebook borra el campo name de profile
    //ver bien como realizar la consulta, pero sería algo como lo que esta abajo.
    var userId = Meteor.users.update ({_id: user._id }, { $set: { profile :  actualizacion }}); 
 
     return {
       _id: userId
     };
   }
});