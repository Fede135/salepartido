Template.showCommentsEnclosure.helpers({
  fivecomments: function () {
    var comments = CommentsForEnclosure.find({toEnclosureId: this._id, status:"Habilitado"}, {sort: {createdAt:-1}, limit:5});
    if (comments.count() === 0) {
      return false;
    } else {      
    return comments;
    } 
  },
  
  comments20: function() {
    var comments = CommentsForEnclosure.find({toEnclosureId:this._id, status:"Habilitado"}, {sort: {createdAt:-1}, skip:5, limit:20});
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

Template.showCommentsEnclosure.events({
  'click #lanzoCommentId': function () {
    var commentId = this._id;
    Session.set("idCommentEnclosure", commentId);
  },
  'click #deleteComment': function() {
    var commentId = Session.get("idCommentEnclosure");
    CommentsForEnclosure.update({_id: commentId}, {$set: {status: "Borrado"}});
  }
});

