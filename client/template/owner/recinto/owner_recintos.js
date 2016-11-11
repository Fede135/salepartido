Meteor.subscribe('recintoPropio');

Template.ownerRecintos.onRendered(function () {
	if(Session.get('alertRecintoEditado')){
		$('#alertRecintoEditado').show();
	} else {
		$('#alertRecintoEditado').hide();
	}
});

Template.ownerRecintos.onDestroyed(function() {
	Session.set('alertRecintoEditado', undefined);
});

Template.ownerRecintos.helpers({
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

Template.ownerRecintos.events({
	'click #uploadRecinto': function (event) {
	 Router.go('uploadRecinto', {_id: this._id});
	},
	'click #editRecinto': function(event) {
	Router.go('editRecinto', {_id: this._id});
	},
	'click #lanzarIdRecinto': function (event) {
		var recintoId = this._id;
		Session.set("idRecintoDeleted", recintoId);
	},
	'click #deleteRecinto': function(event) {
		var recintoId = Session.get('idRecintoDeleted');
		var recinto = Recintos.findOne({"_id": recintoId});
		Recintos.update({_id: recintoId}, {$set: {'estado_recinto': "No habilitado"}});
		var canchasRecinto = Canchas.find({'recintoId': recintoId}).fetch();
		var cantCanchas = canchasRecinto.length;
		for (var j = 0; j < cantCanchas; j++) {
		Canchas.update({_id: canchasRecinto[j]._id}, {$set: {'estado_cancha.estado_de_cancha': "No Habilitada"}});
		var reservaCanchaRecinto = Reserva.find({'nom_recinto': recinto.nombre_recinto, 'num_cancha': canchasRecinto[j].numero, 'estado': "Reservada"}).fetch();
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
		}
		$('#alertRecintoEliminado').show();
	},

	'click #dashboardRecinto':function(event) {
		Session.clear();
		Router.go('dashboard', {_id: this._id});
	}
});
