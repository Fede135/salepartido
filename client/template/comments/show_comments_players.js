Template.showCommentsPlayers.helpers({
  fivecomments: function () {
    var comments = CommentsForPlayers.find({toUserId: this._id, status:"Habilitado"}, {sort: {createdAt:-1}, limit:5});
    if (comments.count() === 0) {
      return false;
    } else {      
    return comments;
    } 
  },
  
  comments20: function() {
    var comments = CommentsForPlayers.find({toUserId:this._id, status:"Habilitado"}, {sort: {createdAt:-1}, skip:5, limit:20});
    if (comments.count() === 0) {
      return false;
    } else {      
    return comments;
    }       
  },

  ownComment: function() {
    return this.fromUserId === Meteor.userId();
  }
});

Template.showCommentsPlayers.events({
  'click #lanzoId': function () {
    console.log(this._id);
    commentId = this._id;
    Session.set("idComment", commentId);
    console.log(Session.set("idComment", commentId));
  },
  'click #deleteComment': function() {
    Session.get("idComment", commentId);
    console.log(commentId);
    console.log(CommentsForPlayers.update({_id: commentId}, {$set: {status: "Borrado"}}));
    CommentsForPlayers.update({_id: commentId}, {$set: {status: "Borrado"}});
  }
});



