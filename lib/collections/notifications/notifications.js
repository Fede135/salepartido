Notifications = new Mongo.Collection('notifications');

createCommentForPlayersNotification = function(_id) {
  var comment = CommentsForPlayers.findOne(_id);
  console.log("Dentro del metodo para crear notif",comment);
  var monthNames = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ];
    var date = new Date();  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var fecha = day+' de '+monthNames[monthIndex]+' de '+year;
    Notifications.insert({
      toUserId: comment.toUserId,
      fromUserId: comment.fromUserId,
      fecha: fecha,
      createAt: date,
      commentId: comment._id,
      link: Router.routes.showProfile.path({_id: comment.toUserId}),
      text: "Comentaron tu perfil",
      read: false
    });
};

createReservaForOwnerNotification = function(reserva_id) {
  var monthNames = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ];
    var date = new Date();  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var fecha = day+' de '+monthNames[monthIndex]+' de '+year;
    var reserva = Reserva.findOne({_id:reserva_id});
    var recinto = Recintos.findOne({'nombre_recinto': reserva.nom_recinto})
    Notifications.insert({
      toUserId: recinto.ownerId,
      fromUserId: reserva.usuarioId,
      fecha: fecha,
      createAt: date,
      reservaId: reserva._id,
      link: Router.routes.dashboard.path({_id: recinto._id}),
      text: "Tienes una reserva nueva",
      read: false
    });
}

// updateReservaForOwnerNotification = function(reserva_id) {
//   var monthNames = [
//     "Enero", "Febrero", "Marzo",
//     "Abril", "Mayo", "Junio", "Julio",
//     "Agosto", "Septiembre", "Octubre",
//     "Noviembre", "Diciembre"
//   ];
//     var date = new Date();  
//     var day = date.getDate();
//     var monthIndex = date.getMonth();
//     var year = date.getFullYear();
//     var fecha = day+' de '+monthNames[monthIndex]+' de '+year;
//     var reserva = Reserva.findOne({_id:reserva_id});
//     var recinto = Recintos.findOne({'nombre_recinto': reserva.nom_recinto})
//     Notifications.insert({
//       toUserId: recinto.ownerId,
//       fromUserId: reserva.usuarioId,
//       fecha: fecha,
//       createAt: date,
//       reservaId: reserva._id,
//       link: Router.routes.dashboard.path({_id: recinto._id}),
//       text: "Se modificó una reserva existente",
//       read: false
//     });
// }

createInvitationToGameNotification = function (partidoId) {
  var monthNames = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ];
    var date = new Date();  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var fecha = day+' de '+monthNames[monthIndex]+' de '+year;
    var partido = Partido.findOne({_id: partidoId});
    var invitados = partido.invitados;
    invitados.forEach( function(element) {
      var usuario = Meteor.users.findOne({'emails.0.address': element});
      Notifications.insert({
      toUserId: usuario._id,
      fromUserId: partido.hostId,
      fecha: fecha,
      createAt: date,
      commentId: partidoId,
      link: Router.routes.confirmarPartido.path({_id: partidoId}),
      text: "Te invitaron a un partido",
      read: false
    });     
    });   
}

createInvitationToGameNotificationOnlyOthers = function (partidoId, arrayJugadores) {
  var monthNames = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ];
    var date = new Date();  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var fecha = day+' de '+monthNames[monthIndex]+' de '+year;
    var partido = Partido.findOne({_id: partidoId});
    var invitados = arrayJugadores;
    invitados.forEach( function(element) {
      var usuario = Meteor.users.findOne({'emails.0.address': element});
      Notifications.insert({
      toUserId: usuario._id,
      fromUserId: partido.hostId,
      fecha: fecha,
      createAt: date,
      commentId: partidoId,
      link: Router.routes.confirmarPartido.path({_id: partidoId}),
      text: "Te invitaron a un partido",
      read: false
    });     
    });
}

modifyInvitationToGameNotificationInvitados = function (partidoId, arrayInvitados) {
  var monthNames = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ];
    var date = new Date();  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var fecha = day+' de '+monthNames[monthIndex]+' de '+year;
    var partido = Partido.findOne({_id: partidoId});
    var host = Meteor.users.findOne({_id:partido.hostId});
    var invitados = _.without(arrayInvitados, host.emails[0].address);
    console.log("invitados dentro de modifyinvi", invitados);
    invitados.forEach( function(element) {
      var usuario = Meteor.users.findOne({'emails.0.address': element});
      console.log("usuario en notif modifinvitados", usuario);
      Notifications.insert({
      toUserId: usuario._id,
      fromUserId: partido.hostId,
      fecha: fecha,
      createAt: date,
      commentId: partidoId,
      link: Router.routes.confirmarPartido.path({_id: partidoId}),
      text: "Se modificó la organización de un partido al que estabas invitado",
      read: false
    });     
    });   
}

modifyInvitationToGameNotificationConfirmados = function (partidoId, confirCorreo) {
  var monthNames = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ];
    var date = new Date();  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var fecha = day+' de '+monthNames[monthIndex]+' de '+year;
    var partido = Partido.findOne({_id: partidoId});
    var host = Meteor.users.findOne({_id:partido.hostId});
    var invitados = _.without(confirCorreo, host.emails[0].address);
    invitados.forEach( function(element) {
      var usuario = Meteor.users.findOne({'emails.0.address': element});
      Notifications.insert({
      toUserId: usuario._id,
      fromUserId: partido.hostId,
      fecha: fecha,
      createAt: date,
      commentId: partidoId,
      link: Router.routes.confirmarPartido.path({_id: partidoId}),
      text: "Se modificó la organización de un partido al que habías confirmado tu asistencia",
      read: false
    });     
    });   
}