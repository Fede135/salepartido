Template.deleteRecinto.helpers({
	recintos: function () {
		return Recintos.find();
	},

	  onError: function () {
      return function (error) { alert("BOO!"); console.log(error); };
    },
    onSuccess: function () {
      return function (result) { alert("YAY!"); console.log(result); };
    },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = Recintos.findOne(id);
        if (confirm('Realmente quiere eliminar la cancha numero  "' + doc.numero + '"?')) {
          this.remove();
        }
      };
    }
});