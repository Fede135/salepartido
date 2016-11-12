Template.gestionCancha.onRendered(function() {
  if(Session.get('alertCanchaCreada')) {
    $('#alertCanchaCreada').show();
  } else {
    $('#alertCanchaCreada').hide();
  }
  if(Session.get('alertCanchaEditada')) {
    $('#alertCanchaEditada').show();
  } else {
    $('#alertCanchaEditada').hide();
  }
});

Template.gestionCancha.onDestroyed( function() {
  Session.set('alertCanchaCreada', undefined);
  Session.set('alertCanchaEditada', undefined);
});

Template.gestionCancha.helpers({

	canchasRecinto : function(){
		var canchas = Canchas.find({recintoId:this._id})
			return canchas;

	},
});
	
Template.gestionCancha.events({

	'click #editCancha': function(event) {
	 Router.go('editCancha', {_id: this._id});//ID DE LA CANCHA
	},

  'click #crearCancha': function(event) {
      Router.go('cargarCancha', {_id: this._id}); //ID DEL RECINTO
  },
  
  'click #lanzaIdCancha': function (event) {
		var canchaId = this._id;
		Session.set("idCanchaDeleted", canchaId);
	},

  'click #deleteCancha': function(event) {
		var canchaId = Session.get('idCanchaDeleted');
    Canchas.update({_id: canchaId}, {$set: {'estado_cancha.estado_de_cancha': "Eliminada"}});
    var cancha = Canchas.findOne({'_id': canchaId});
    var recintoId = cancha.recintoId;
    var recinto = Recintos.findOne({"_id":recintoId});
    var nomRecinto = recinto.nombre_recinto;
    var reservaCanchaRecinto = Reserva.find({'nom_recinto': recinto.nombre_recinto, 'num_cancha': cancha.numero, 'estado': "Reservada"}).fetch();
    var cantReservaCanchaRecinto = reservaCanchaRecinto.length;
    for (var z = 0; z < cantReservaCanchaRecinto; z++) {
    Reserva.update({_id: reservaCanchaRecinto[z]._id}, {$set: {'estado': "Cancelada"}});
    var partido = Partido.findOne({'reserva_id': reservaCanchaRecinto[z]._id});
    var idPartido = partido._id;
    if (partido){
      var oldHora = reservaCanchaRecinto[z].hora_de_juego;
      var oldDia = reservaCanchaRecinto[z].fecha_de_juego;
      var oldRecinto = reservaCanchaRecinto[z].nom_recinto;
      var oldCancha = reservaCanchaRecinto[z].num_cancha;
      var jugadores = Roles.getUsersInRole(['invitado', 'suplente', 'confirmado'], idPartido);
      var jugadoresId = [];
      jugadores.forEach(function (e) {
      var jugadorId = e._id;
      jugadoresId.push(jugadorId);
      });
      Meteor.call('mailCancelar',jugadoresId,oldHora,oldDia,oldRecinto,oldCancha);
      cancelacionReservaPlayersNotificationDeleteOwner(idPartido, jugadoresId);      
      jugadoresId.forEach(function (e) {
        Roles.setUserRoles(e, 'noJugo', idPartido);
        });
      } 
    }
		$('#alertCanchaEliminada').show();
	},

});
	



