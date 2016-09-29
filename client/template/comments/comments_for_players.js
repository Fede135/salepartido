AutoForm.addHooks(
  ['enterCommentsPlayers'],
  {
    after: {
      insert: function (error, result) {
        createCommentForPlayersNotification(result);
      }
    } 
  },
)