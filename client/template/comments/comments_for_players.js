AutoForm.addHooks(
  ['enterCommentsPlayers'],
  {
    before: {
      insert: function(doc) {
        if (doc.commentToPlayer) {
          var docFiltrado = doc.commentToPlayer.replace(/puto|pajero|cagón|culiado|pija|puta|concha|conchudo|conchuda|cagon|ojete|orto|marica/gi, function filtrar(x) {
            var len= x.length;
            var arr = []
            for (var i = 0; i < len; i++) {
              arr.push('*');
            }
            return arr.toString().replace(/,/g, "");
          });
        }
        var docModificado = {
            commentToPlayer: docFiltrado,
            toUserId: doc.toUserId,
          };
          return docModificado; 
      }
    },
  after: {
    insert: function (error, result) {
      if(! error){
       createCommentForPlayersNotification(result);
      } 
    }
  } 
},
)

