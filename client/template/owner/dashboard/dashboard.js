Template.dashboard.helpers({

  


/*		var recintoId = this._id;
		var recinto = recintoId && Recintos.findOne({'_id': recintoId});
		var nombRecinto = recinto && recinto.nombre_recinto;    
		var reservas = nombRecinto && Reserva.find({'nom_recinto':nombRecinto, 'estado': "Reservada"});	
		return reservas;*/
	

    abrirReserva: function(){

    	var reservaGet = Session.get('abrirReserva') && true;
      return reservaGet;

    },

    abrirCanchas: function(){

    	var recinto_Id = Session.get('canchas') && this._id;
      var canchas = recinto_Id && Canchas.find({'recintoId':recinto_Id, 'estado_cancha.estado_de_cancha': "Habilitada"});
    	return canchas;

    },

    canchas: function(){

      var recintoId = this._id;
      var canchas = recintoId && Canchas.find({'recintoId':recintoId, 'estado_cancha.estado_de_cancha': "Habilitada"});
      return canchas;
    },

    horas: function(){
      var horas = [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1];
      return horas;
    }   

});

Template.dashboard.events({

	'click #modificarReserva': function (event) {
		Router.go('modificarReserva', {_id: this._id});
	},
  
  'click #gestionCanchas': function(event){

     Session.clear();
     var canchas = true;

     Session.set('canchas', canchas);
  },

	'click #crearReserva': function(event){

    Session.clear();
		var abrirReserva = true;
		Session.set('abrirReserva', abrirReserva);
  },

  	'click #partidoJugado': function (event) {
		
		Reserva.update({_id: this._id}, {$set: {'estado': "Jugada"}});
		var partido = Partido.findOne({reserva_id: this._id});
		var jugaron = Roles.getUsersInRole('confirmado', partido._id);
		jugaron.forEach(function(element) {
			var jugaronId = element._id;
			Roles.setUserRoles(jugaronId, 'jugoPartido', partido._id);
		});
    var nojugaron = Roles.getUsersInRole(['invitado', 'suplente', 'noJuega'], partido._id)
    nojugaron.forEach(function(element) {
			var nojugaronId = element._id;
			Roles.setUserRoles(nojugaronId, 'noJugaron', partido._id);
		});

		alert("Reserva jugada");
	},

	'click #cancelarReserva': function(event){

		Reserva.update({_id: this._id}, {$set: {'estado': "Cancelada"}});
		alert("Reserva cancelada");

  	}
  	 
  	 
});

Template.dashboard.onCreated(function() {

    
  
});


/*Meteor.setInterval(function () {
  var now = moment()
  console.log(now.format('dddd D MMMM'));
  console.log(now.format('LT'));
 
  Session.set('time',      now.format('LT'))
  Session.set('date',      now.format('dddd D MMMM'))
  Session.set('timeTitle', now.format('L LT ([GMT]Z)'))
}, 90000)*/




