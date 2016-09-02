Template.showCommentsPlayers.helpers({
  
  comments: function () {
    return CommentsForPlayers.find({toUserId: this._id});
  }
  
});

