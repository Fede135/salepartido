Template.deleteRecinto.helpers({
	recintos: function () {
		return Recintos.find();
	},

	  onError: function () {
      return function (error) { alert("Se produjo un error"); console.log(error); };
    },
    onSuccess: function () {
      return function (result) { alert("Se ha eliminado correctamente"); console.log(result); };
    },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = Recintos.findOne(id);
        if (confirm('Realmente quiere eliminar el recinto  "' + doc.nombre_recinto + '"?')) {
          this.remove();
        }
      };
    }
});