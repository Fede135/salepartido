Template.dashboard.helpers({	

	reservas: function () {

		var recintoId = this._id;
		var recinto = recintoId && Recintos.findOne({'_id': recintoId});
		var nombRecinto = recinto && recinto.nombre_recinto;
		var reservas = nombRecinto && Reserva.find({'nom_recinto':nombRecinto, 'estado': "Reservada"});
		
		return reservas;
	},

	recintoSeleccionado: function(){
      
      return Session.get('recinto');
    },
});

Template.dashboard.events({

	'click #modificarReserva': function (event) {
		Router.go('modificarReserva', {_id: this._id});
	},
	'click #crearReserva': function(event){
		var recintoId = this._id;
		var recinto = recintoId && Recintos.findOne({'_id': recintoId});

    	Session.set('recinto', recinto);
  	},
  	'click #jugada': function (event) {
		var partido = Partido.findOne({'reserva_id':this._id});
		var partidoId = partido && partido._id;
		
		Partido.update({_id: partidoId}, {$set: {'estado': "Jugado"}});
	},
	'click #eliminarReserva': function(event){

		Reserva.update({_id: this._id}, {$set: {'estado': "Suspendida"}});
		alert("Reserva eliminada");

  	},
});

Template.dashboard.onDestroyed( function(){

    Session.set('recinto', null);

});

Template.dashboard.onCreated(function() {
  
  Session.set('recintoErrors', {});
});