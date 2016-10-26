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

     abrirReportes: function(){

      var reportesGet = Session.get('reportes') && true;
      return reportesGet;

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

     Session.set('canchas', true);
  },

  'click #reportes': function(event){

     Session.clear();
     
     Session.set('reportes', true);
  },

  'click #reservasHoy': function(event){

    Session.clear();

    Session.set('tabla', true);
  },

  'click #gestionReserva': function(event){

    Session.clear();

    Session.set('reserva', true);
  },

	'click #crearReservaTemplate': function(event){
    
    Session.clear();

		Session.set('abrirReserva', true);
  }
    	 
});

Template.dashboard.onRendered(function() {
     if(Session.get('alertReservaCreada')) { 
       $('#alertReservaCreada').show();
     } else {
       $('#alertReservaCreada').hide();
     }
    if (Session.get('alertReservaActualizada')) {
      $('#alertReservaActualizada').show();
    } else {
      $('#alertReservaActualizada').hide();
    }
    if (Session.get('alertCanchaActualizada')) {
      $('#alertCanchaActualizada').show();
    } else {
      $('#alertCanchaActualizada').hide();
    }
    Session.clear();
    var tabla = true;
    Session.set('tabla', tabla);
    
});

Template.dashboard.onDestroyed(function() {
  Session.set('alertReservaCreada', undefined);
  Session.set('alertReservaActualizada', undefined);
})




/*Meteor.setInterval(function () {
  var now = moment()
  console.log(now.format('dddd D MMMM'));
  console.log(now.format('LT'));
 
  Session.set('time',      now.format('LT'))
  Session.set('date',      now.format('dddd D MMMM'))
  Session.set('timeTitle', now.format('L LT ([GMT]Z)'))
}, 90000)*/
