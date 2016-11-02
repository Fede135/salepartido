Template.enterCommentsForPlayers.events({
  'keyup [name="commentToPlayer"]' : function (event, template) {
      AutoForm.removeStickyValidationError('enterCommentsPlayers', 'commentToPlayer');
    }
});

AutoForm.addHooks(
  ['enterCommentsPlayers'],
  {
    before: {
      insert: function(doc) {
        if (doc.commentToPlayer == undefined) {
          AutoForm.addStickyValidationError('enterCommentsPlayers', 'commentToPlayer', 'required', doc.commentToPlayer);  
        } else {
          var docFiltrado = doc.commentToPlayer.replace(/puto|pajero|cagón|culiado|pija|puta|concha|conchudo|conchuda|cagon|ojete|orto|marica/gi, function filtrar(x) {
            var len= x.length;
            var arr = []
            for (var i = 0; i < len; i++) {
              arr.push('*');
            }
            return arr.toString().replace(/,/g, "");
          });
          docModificado = {
            commentToPlayer: docFiltrado,
            toUserId: doc.toUserId,
          };
          return docModificado;
        }
      }
    },
    beginSubmit: function () {
     AutoForm.removeStickyValidationError('enterCommentsPlayers', 'commentToPlayer');
    },
    after: {
      insert: function (error, result) {
        createCommentForPlayersNotification(result);
      }
    } 
  },
)

