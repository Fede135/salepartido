Template.cargarCancha.helpers({
	recinto: function () {
		//Me busca los recintos del usuario logueado.
		var recinto = Recintos.findOne({ownerId:Meteor.userId()})
		var r = recinto.nombre_recinto;
			return r;
		
	},
		
	countCanchas: function(){
		//la idea es que el usuario tenga varios recintos...pero al tener varios

		var recinto = Recintos.findOne({ownerId:Meteor.userId()})
		var p = recinto._id
		var count = Canchas.find({recintoId:p}).count();
			return count
	}

});	




 