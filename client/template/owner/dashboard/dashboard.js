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

    canchas: function(){
    	var recinto = Session.get('recintoo');    	
    	var canchas = recinto && Canchas.find({'recintoId': recinto._id});
    	return canchas;
    }   

});

Template.dashboard.events({

	'click #modificarReserva': function (event) {
		Router.go('modificarReserva', {_id: this._id});
	},
	'click #crearReserva': function(event){
		var recintoo = null;
		var recintoId = this._id;
		var recinto = recintoId && Recintos.findOne({'_id': recintoId});
		Session.set('recintoo', recintoo);
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
  		var recinto = null;
  		var recintoId = this._id;
		var recintoo = recintoId && Recintos.findOne({'_id': recintoId});

		Session.set('recinto', recinto);
    	Session.set('recintoo', recintoo);
  	},
  	 
  	 
});

Template.dashboard.onDestroyed( function(){

    Session.set('recinto', null);

});

Template.dashboard.onCreated(function() {
  
  Session.set('recintoErrors', {});
  
});

/*Meteor.setInterval(function () {
  var now = moment()
  console.log(now.format('dddd D MMMM'));
  console.log(now.format('LT'));
 
  Session.set('time',      now.format('LT'))
  Session.set('date',      now.format('dddd D MMMM'))
  Session.set('timeTitle', now.format('L LT ([GMT]Z)'))
}, 90000)*/
