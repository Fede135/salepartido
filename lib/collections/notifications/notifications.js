Notifications = new Mongo.Collection('notifications');

createCommentForPlayersNotification = function(_id) {
  var comment = CommentsForPlayers.findOne(_id);
    Notifications.insert({
      toUserId: comment.toUserId,
      fromUserId: comment.fromUserId,
      commentId: comment._id,
      read: false
    });
};

