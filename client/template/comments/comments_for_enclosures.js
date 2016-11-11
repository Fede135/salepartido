AutoForm.addHooks(
  ['enterCommentsEnclosure'],
  {
    before: {
      insert: function(doc) {
        if (doc.commentToEnclosure) {
          var docFiltrado = doc.commentToEnclosure.replace(/puto|pajero|cagón|culiado|pija|puta|concha|conchudo|conchuda|cagon|ojete|orto|marica/gi, function filtrar(x) {
            var len= x.length;
            var arr = []
            for (var i = 0; i < len; i++) {
              arr.push('*');
            }
            return arr.toString().replace(/,/g, "");
          });
          }
        var docModificado = {
            commentToEnclosure: docFiltrado,
            toEnclosureId: doc.toEnclosureId,
        }
        return docModificado;
      }
    },
    after: {
      insert: function (error, result) {
        if(! error){ 
          createCommentForEnclosureNotification(result);
        }
      }
    } 
    
  },
)