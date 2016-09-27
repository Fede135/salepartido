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
      text: "Comentaron tu perfil",
      read: false
    });
};

