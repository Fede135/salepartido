Template.enterCommentsForEnclosures.events({
  'keyup [name="commentToEnclosure"]' : function (event, template) {
      AutoForm.removeStickyValidationError('enterCommentsEnclosure', 'commentToEnclosure');
    }
});

AutoForm.addHooks(
  ['enterCommentsEnclosure'],
  {
    before: {
      insert: function(doc) {
        if (doc.commentToEnclosure == undefined) {
          AutoForm.addStickyValidationError('enterCommentsEnclosure', 'commentToEnclosure', 'required', doc.commentToEnclosure);  
        } else {
          var docFiltrado = doc.commentToEnclosure.replace(/puto|pajero|cagón|culiado|pija|puta|concha|conchudo|conchuda|cagon|ojete|orto|marica/gi, function filtrar(x) {
            var len= x.length;
            var arr = []
            for (var i = 0; i < len; i++) {
              arr.push('*');
            }
            return arr.toString().replace(/,/g, "");
          });
          docModificado = {
            commentToEnclosure: docFiltrado,
            toEnclosureId: doc.toEnclosureId,
          };
          return docModificado;
        }
      }
    },
    beginSubmit: function () {
     AutoForm.removeStickyValidationError('enterCommentsEnclosure', 'commentToEnclosure');
    },

    after: {
      insert: function (error, result) {
        createCommentForEnclosureNotification(result);
      }
    } 
    
  },
)