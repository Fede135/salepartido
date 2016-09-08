Template.showCommentsEnclosure.helpers({
  fivecomments: function () {
    return CommentsForEnclosure.find({toUserId: this._id},{sort: {createAt:-1}, limit:5});
  },
  allcomments: function(){
    return CommentsForEnclosure.find({toUserId:this._id}, {sort: {createAt:-1}});
  },
  commentsCount: function(){
     return CommentsForEnclosure.find({toUserId: this._id}).count();
  },
});

