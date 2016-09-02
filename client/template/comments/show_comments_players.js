Template.showCommentsPlayers.helpers({
  
  /*comments: function () {
    return CommentsForPlayers.find();
  },*/
  comment: function() {    
    return CommentsForPlayers.findOne().commentToPlayer;
  }
});

