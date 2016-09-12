Template.eliminarCancha.helpers({
	canchas: function () {
		return Canchas.find({recintoId:"HnA3G5Fqf532eyFpd"});
	},

	  onError: function () {
      return function (error) { alert("BOO!"); console.log(error); };
    },
    onSuccess: function () {
      return function (result) { alert("YAY!"); console.log(result); };
    },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = Canchas.findOne(id);
        if (confirm('Realmente quiere eliminar la cancha numero  "' + doc.numero + '"?')) {
          this.remove();
        }
      };
    }
});