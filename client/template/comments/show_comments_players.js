Template.showCommentsPlayers.helpers({
  fivecomments: function () {
    return CommentsForPlayers.find({toUserId: this._id},{sort: {createAt:-1}, limit:5});
  },
  commentsCount: function(){
     return CommentsForPlayers.find({toUserId: this._id}).count();
  },
  

});

