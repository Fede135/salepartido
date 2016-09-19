Template.eliminarPartido.helpers({
	partido: function () {
		return Partido.find();
	},

	  onError: function () {
      return function (error) { alert("Se produjo un error"); console.log(error); };
    },
    onSuccess: function () {
      return function (result) { alert("Se ha eliminado correctamente"); console.log(result); };
    },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = Partido.findOne();
        if (confirm('Realmente quiere eliminar el recinto  "' + doc._id + '"?')) {
          this.remove();
        }
      };
    }
});