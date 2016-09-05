Template.showCommentsPlayers.helpers({
  comments: function () {
    //return CommentsForPlayers.find({toUserId: this._id}).sort({createAt: -1}).limit(3); //no tiene sentido jaja, esta consulta en mongo anda y en js no. Preg a Franco
    return CommentsForPlayers.find({toUserId: this._id},{sort: {createAt:-1}});
  },
  commentsCount: function(){
     return CommentsForPlayers.find({toUserId: this._id}).count();
  },
  

});

