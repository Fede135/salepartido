Notifications = new Mongo.Collection('notifications');

createCommentForPlayersNotification = function(_id) {
  var comment = CommentsForPlayers.findOne(_id);
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
      text: "Comentaron tu perfil.",
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
      text: "Tienes una reserva nueva en "+reserva.nom_recinto+" en cancha N° "+reserva.num_cancha+" el "+reserva.fecha_de_juego+" a las "+reserva.hora_de_juego+".",
      read: false
    });
}

modifyReservaForOwnerNotification = function(oldHora, oldDia, oldRecinto, oldCancha, idReservaUpdate, recintoActualizado, horaActualizada, diaActualizado, canchaActualizada) {
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
    var reserva = Reserva.findOne({_id: idReservaUpdate});
    if (oldRecinto == recintoActualizado ) {
      var recinto = Recintos.findOne({'nombre_recinto': recintoActualizado });
      Notifications.insert({
        toUserId: recinto.ownerId,
        fromUserId: reserva.usuarioId,
        fecha: fecha,
        createAt: date,
        reservaId: reserva._id,
        link: Router.routes.dashboard.path({_id: recinto._id}),
        text: "Modificación de reserva del día "+oldDia+" a las "+oldHora+" hrs. en cancha N° "+oldCancha+" para el día "+diaActualizado+" a las " +horaActualizada+" hrs. en cancha N° "+canchaActualizada+".",
        read: false
      });
    } else {
      var recinto = Recintos.findOne({'nombre_recinto': oldRecinto });
      createReservaForOwnerNotification(idReservaUpdate);
      Notifications.insert({
        toUserId: recinto.ownerId,
        fromUserId: reserva.usuarioId,
        fecha: fecha,
        createAt: date,
        reservaId: reserva._id,
        link: Router.routes.dashboard.path({_id: recinto._id}),
        text: "Se canceló una reserva del día "+oldDia+" a las "+oldHora+" hrs. en cancha N° "+oldCancha+" en "+oldRecinto+".",
        read: false
      });
    }
}

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
    var hostName = Meteor.users.findOne({_id:partido.hostId}, {fields: {'profile.name': 1}});
    var reserva = Reserva.findOne({_id: partido.reserva_id});
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
      text: "Te invitaron al partido de "+hostName.profile.name+".",
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
    var hostName = Meteor.users.findOne({_id:partido.hostId}, {fields: {'profile.name': 1}});
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
      text: "Te invitaron al partido de "+hostName.profile.name+".",
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
    invitados.forEach( function(element) {
      var usuario = Meteor.users.findOne({'emails.0.address': element});
      Notifications.insert({
      toUserId: usuario._id,
      fromUserId: partido.hostId,
      fecha: fecha,
      createAt: date,
      commentId: partidoId,
      link: Router.routes.confirmarPartido.path({_id: partidoId}),
      text: "Se modificó la organización del partido de "+host.profile.name+" al que estabas invitado.",
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
      text: "Se modificó la organización del partido de "+host.profile.name+" al que habías confirmado tu asistencia.",
      read: false
    });     
    });   
}

fromSupleteToConfirmadoNotification = function (partidoId, primerSuplenteId) {
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
    var hostName = Meteor.users.findOne({_id:partido.hostId}, {fields: {'profile.name': 1}});
      Notifications.insert({
      toUserId: primerSuplenteId, 
      fecha: fecha,
      createAt: date,
      commentId: partidoId,
      link: Router.routes.confirmarPartido.path({_id: partidoId}),
      text: "Pasaste de suplente a titular en el partido de "+hostName.profile.name+".",
      read: false
    });     
};   
