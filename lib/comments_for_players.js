Meteor.methods({
  sendComment: function(doc){
    check(doc, Schema.CommentsForPlayers);

    var user= Meteor.user();

    var comment = (doc, {
      //toUserId : idfromuser,
      fromUserId: user._id,
      commentToPlayer : doc.commentToPlayer,
      date : new Date(),
      //status: ""
    });
  
    var commentId = commentsForPlayers.insert(comment);
    return {
      _id: commentId
    };  
  }
});