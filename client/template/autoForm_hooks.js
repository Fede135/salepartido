AutoForm.addHooks(
  ['editProfile'],
  {
  after: {
    method: function (error, result) {
      if (! error)
        alert("Su perfil ha sido actualizado");
        Router.go('/showProfile');
    }
  }
},
/*['enterCommentsForPlayers'],
 {
    onSubmit: function(currentDoc) {
      if(customHandler(currentDoc)){
        var comment = (doc,{
          fromUserId: Meteor.userId(),
          commentToPlayer : doc.commentToPlayer,
          date: new Date(),
        });
          var commentId = commentsForPlayers.insert(comment);
          this.done();
        }
      }
    }*/
); 