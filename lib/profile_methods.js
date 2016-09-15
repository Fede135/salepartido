//Metodos en el servidor relacionados con el perfil de usuario
 Meteor.methods({
   
   completeProfile: function (modifier, documentId) { //metodo que comprueba el tipo de los atributos del lado del servidor y luego para insertar en la bd los cambios
     
     check(modifier, Schema.users);
     check(documentId, documentId);
     
    var userId = Meteor.users.update(documentId , modifier);
    
    return {  
       _id: userId
     };
   }
});
