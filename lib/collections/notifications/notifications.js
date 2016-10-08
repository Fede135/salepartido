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
