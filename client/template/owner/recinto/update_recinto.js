Template.updateRecinto.helpers({
	recinto: function () {
		return Recintos.find({ownerId: Meteor.userId()});
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

});

Template.updateRecinto.events({

	'click #editRecinto': function(event) {
		console.log("dsad")
		console.log(event)
		Router.go('editRecinto', {_id:this._id});
	}
});



