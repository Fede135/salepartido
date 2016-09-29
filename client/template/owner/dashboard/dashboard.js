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
  	'click #partidoJugado': function (event) {
		
		Reserva.update({_id: this._id}, {$set: {'estado': "Jugada"}});
		alert("Reserva jugada");
	},
	'click #cancelarReserva': function(event){

		Reserva.update({_id: this._id}, {$set: {'estado': "Cancelada"}});
		alert("Reserva cancelada");

  	},
  	'click #gestionCanchas': function(event){
		Router.go('gestionCancha', {_id: this._id});
  	},
});

Template.dashboard.onDestroyed( function(){

    Session.set('recinto', null);

});

Template.dashboard.onCreated(function() {
  
  Session.set('recintoErrors', {});
});