Meteor.subscribe('recintoPropio');

Template.ownerRecintos.helpers({
	recinto: function () {
		return Recintos.find();
	},

	calificacion: function(){
		var cali = Calificaciones.findOne({id_recinto:this._id});
		if(cali){
			var array = cali.votes;
			var promedio = 0;

			for( i=0; i<array.length; i++ ){
				promedio += array[i];
			}
			promedio = promedio / array.length;
			
			return promedio;
	}
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

Template.ownerRecintos.events({
	'click #uploadRecinto': function (event) {
		Router.go('uploadRecinto', {_id: this._id});
	},
	'click #editRecinto': function(event) {
	Router.go('editRecinto', {_id: this._id});
	},
	'click #dashboardRecinto':function(event){
		Router.go('dashboard', {_id: this._id});
	}
});



