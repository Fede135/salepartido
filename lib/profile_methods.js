 //Metodos en el servidor relacionados con el perfil de usuario
 Meteor.methods({
   
   completeProfile: function(doc) { //metodo que comprueba el tipo de los atributos del lado del servidor y luego para insertar en la bd los cambios 
   check(doc, Schema.users);
    
     
    var user = Meteor.user();
    
    
    if (user.services.facebook == undefined){
    var actualizacion = (doc, {
        name : user.profile.firstName+" " + " "+ user.profile.lastName, 
        birthday : new Date(doc.profile.birthday.getFullYear(), doc.profile.birthday.getMonth(), doc.profile.birthday.getDate() ), //ver fechas como la guarda
        gender : doc.profile.gender,
        country : {
          country: doc.profile.country.country,
          province : doc.profile.country.province,
          locality : doc.profile.country.locality,
          neighborhood : doc.profile.country.neighborhood
        }
    });
     /* if(actualizacion.name && actualizacion.birthday){
        var editedProfile = true;
        var userId = Meteor.users.update ({_id: user._id }, { $set: { editedProfile : editedProfile }});
      }*/
    
    /*
    var rol= Roles.getRolesForUser(user._id, Roles.GLOBAL_GROUP);
    console.log(rol,'*********************************');
    var userId = Meteor.users.update({_id: user._id}, {$set: {roles: rol}});*/    
    } else {
      var fb = user.services.facebook;
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
    

    /*var email = {
      address : fb.email,
      verified : true
    };*/
    
    if(actualizacion.name && actualizacion.birthday){
        var editedProfile = true;
        var userId = Meteor.users.update ({_id: user._id }, { $set: { editedProfile : editedProfile }});
      } 

    /*var rol= Roles.getRolesForUser(user._id, Roles.GLOBAL_GROUP);
    console.log(rol,'*********************************');
    var userId = Meteor.users.update({_id: user._id}, {$set: {roles: rol}});*/
 
    //var userId = Meteor.users.update ({_id: user._id }, { $set: { emails : [email]}});

    };
    
    

    var playerdata = (doc, {
      position : doc.player.position,
      foot : doc.player.foot,
      height : doc.player.height,
      weight : doc.player.weight
    });
    var userId = Meteor.users.update({_id: user._id }, { $set: { profile : actualizacion }});
    var userId = Meteor.users.update({_id: user._id}, { $set : { player: playerdata}});
    return {  
       _id: userId
     };
   }
});