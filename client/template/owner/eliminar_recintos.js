Template.eliminarRecinto.helpers({
	recinto: function () {
		return Recinto.find();
	},

	  onError: function () {
      return function (error) { alert("RacataPum"); console.log(error); };
    },
    onSuccess: function () {
      return function (result) { alert("10p"); console.log(result); };
    },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = Recinto.findOne(id);    
        if (confirm('Realmente quiere eliminar el recinto cuyo nombre es"' + doc.nombreRecinto + '"?')) {
          this.remove();
        }
      };
    }
});