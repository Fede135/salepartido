Meteor.methods({ 
  gameRoles: function (partidoId, arrayHostSecundario) {
    check(partidoId, String);
    check(arrayHostSecundario, Array); 
    var partido = Partido.findOne({_id: partidoId});
    var invitados = partido.invitados;
    var hostId = partido.hostId;
    Roles.addUsersToRoles(hostId, ['host', 'invitado'], partidoId);
    var hostSecundario =_.intersection(invitados, arrayHostSecundario);
    var invitado = _.difference(invitados, hostSecundario);
    invitado.forEach( function(element) {
      var player = Meteor.users.findOne({'emails.0.address': element});
      var invitadoId = player._id;
      Roles.addUsersToRoles(invitadoId, 'invitado', partidoId);
    });
    hostSecundario.forEach( function(element) {
      var player = Meteor.users.findOne({'emails.0.address': element});
      var hostSecundarioId = player._id;
      Roles.addUsersToRoles(hostSecundarioId, ['hostSecundario', 'invitado'], partidoId);
    });
  }
});  