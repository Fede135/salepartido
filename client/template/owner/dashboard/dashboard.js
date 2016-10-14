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
		var partidoId = Partido.findOne({reserva_id:this._id})._id;
		var arrayConfirmados = getGroupsForUser(partidoId,[confirmado]);
		console.log('array de confirmados',arrayConfirmados);
		arrayConfirmados.forEach(function (e) {
			setUserRoles(e,['jugoPartido'],partidoId);
		});
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

/*Meteor.setInterval(function () {
  var now = moment()
  console.log(now.format('dddd D MMMM'));
  console.log(now.format('LT'));
 
  Session.set('time',      now.format('LT'))
  Session.set('date',      now.format('dddd D MMMM'))
  Session.set('timeTitle', now.format('L LT ([GMT]Z)'))
}, 90000)*/