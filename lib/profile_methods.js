 //Metodos en el servidor relacionados con el perfil de usuario
 Meteor.methods({
   
   completeProfile: function(doc) { //metodo que comprueba el tipo de los atributos del lado del servidor y luego para insertar en la bd los cambios 
   check(doc, Schema.users);
    
     
    var user = Meteor.user();
    
    
    if (user.services.facebook == undefined){
    var actualizacion = (doc, { 
        birthday : new Date(doc.profile.birthday.getFullYear(), doc.profile.birthday.getMonth(), doc.profile.birthday.getDate() ), //ver fechas como la guarda
        gender : doc.profile.gender,
        country : {
          country: doc.profile.country.country,
          province : doc.profile.country.province,
          locality : doc.profile.country.locality,
          neighborhood : doc.profile.country.neighborhood
        }
    });
     
    } else {

      var fb = user.services.facebook;
      var token = fb.accessToken;
      var actualizacion = (doc, { 
        name : fb.name,
        firstName : fb.first_name,
        lastName : fb.last_name,
        birthday : new Date(doc.profile.birthday.getFullYear(), doc.profile.birthday.getMonth(), doc.profile.birthday.getDate()), //ver fechas como la guarda
        gender : doc.profile.gender,
        country : {
          country: doc.profile.country.country,
          province : doc.profile.country.province,
          locality : doc.profile.country.locality,
          neighborhood : doc.profile.country.neighborhood
        }
    });
    

    var email = {
      address : fb.email,
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