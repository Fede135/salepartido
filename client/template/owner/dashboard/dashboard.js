Template.dashboard.helpers({

    tablaReserva: function(){

      var tabla = Session.get('tabla') && true;
    return tabla;
    },

    gestionReservas: function(){

      var reservas = Session.get('reserva') && true;
      return reservas;	
    },

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
    }   

});

Template.dashboard.events({

  'click #gestionCanchas': function(event){

     Session.clear();
     var canchas = true;

     Session.set('canchas', canchas);
  },

  'click #reservasHoy': function(event){

    Session.clear();
    var tabla = true;
    Session.set('tabla', tabla);
  },

  'click #gestionReserva': function(event){

    Session.clear();
    var reserva = true;
    Session.set('reserva', reserva);
  },

	'click #crearReserva': function(event){
    
    Session.clear();
		var abrirReserva = true;
		Session.set('abrirReserva', abrirReserva);
  }
    	 
});

Template.dashboard.onRendered(function() {
    var tabla = true;
    Session.set('tabla', tabla);
   
});




/*Meteor.setInterval(function () {
  var now = moment()
  console.log(now.format('dddd D MMMM'));
  console.log(now.format('LT'));
 
  Session.set('time',      now.format('LT'))
  Session.set('date',      now.format('dddd D MMMM'))
  Session.set('timeTitle', now.format('L LT ([GMT]Z)'))
}, 90000)*/


