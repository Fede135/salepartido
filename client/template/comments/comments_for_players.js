AutoForm.addHooks(
  ['enterCommentsPlayers'],
  {
    before: {
      insert: function(doc) {
        console.log(doc);
        var docFiltrado = doc.commentToPlayer.replace(/puto|pajero|cagón|culiado|pija|puta|concha|conchudo|conchuda|cagon/gi, function filtrar(x) {
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
    },
    after: {
      insert: function (error, result) {
        createCommentForPlayersNotification(result);
      }
    } 
  },
)

