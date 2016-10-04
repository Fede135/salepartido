Template.gestionCancha.helpers({

	canchasRecinto : function(){
		var canchas = Canchas.find({recintoId:this._id})
			return canchas;

	},

	onError: function () {
      return function (error) { alert("Se produjo un error"); console.log(error); };
    },
    onSuccess: function () {
      return function (result) { alert("Se ha eliminado correctamente"); console.log(result); };
    },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = Canchas.findOne(id);
        if (confirm('Realmente quiere eliminar la cancha número: ' + doc.numero + '?')) {
          this.remove();
        }
      };
    }

});
	
Template.gestionCancha.events({
	'click #editCancha': function(event) {
	 Router.go('editCancha', {_id: this._id});//ID DE LA CANCHA
	},

  'click #crearCancha': function(event) {
      Router.go('cargarCancha', {_id: this._id}); //ID DEL RECINTO
  },

});
	



