 //Metodos en el servidor relacionados con el perfil de usuario
 Meteor.methods({
   
   completeProfile: function(doc) { //metodo que comprueba el tipo de los atributos del lado del servidor y luego para insertar en la bd los cambios 
   check(doc, Schema.users);
    
     
    var user = Meteor.user();
    
    
    if (user.services.facebook.accessToken == null){
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
     
    } else {
      var actualizacion = (doc, { 
        name : user.services.facebook.name,
        firstName : user.services.facebook.first_name,
        lastName : user.services.facebook.last_name,
        birthday : doc.profile.birthday,
        gender : doc.profile.gender,
        country : {
          county: doc.profile.country.country,
          province : doc.profile.country.province,
          locality : doc.profile.country.locality,
          neighborhood : doc.profile.country.neighborhood
        }
    });
    

    var email = {
      address : user.services.facebook.email,
      verified : true
    }; 

    
 
    var userId = Meteor.users.update ({_id: user._id }, { $set: { emails : [email]}});

    }
    
    var userId = Meteor.users.update ({_id: user._id }, { $set: { profile :  actualizacion }});

    return {
       _id: userId
     };
   }
});