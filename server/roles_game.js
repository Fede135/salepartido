// Meteor.methods({ 
//   defaultRoles: function (partidoId) {
//     check(partidoId, String);
    
//     var partido = Partido.findOne({_id: partidoId});
//     var invitados = partido.invitados; 
//     invitados.forEach( function(element) {
//       var player = Meteor.users.findOne({'emails.0.address': element});
//       var invitadoId = player._id;
//       Roles.addUsersToRoles(invitadoId, 'invitado', partidoId); 
//     };
//     var hostId = partido.hostId;
//     Roles.addUsersToRoles(hostId, 'host', partidoId);
//   }
// });  