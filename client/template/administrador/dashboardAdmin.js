Template.dashboardAdmin.helpers({
	
	usuarioDueños: function(){
		return Meteor.users.find({'roles.__global_roles__': ['owner']});
	},
	
	usuarioJugador: function(){
		return Meteor.users.find({'roles.__global_roles__': ['player']});
	},

	cantidadDueños: function(){
		return Meteor.users.find({'roles.__global_roles__': ['owner']}).count();
	},

	cantidadJugadores: function(){
		return Meteor.users.find({'roles.__global_roles__': ['player']}).count();
	},

	emailsVerified: function () {
		return Meteor.users.findOne({_id: this._id, 'emails.0.verified': true});
	},
	habilitado: function () {
		return Meteor.users.findOne({_id: this._id, 'estado_usuario': "habilitado"});
	}
});

Template.dashboardAdmin.events({


	'click #cambiarRoleADueno': function (e) {
		
		e.preventDefault;
		
		Meteor.users.update({_id: this._id}, {$set: {'roles.__global_roles__': ['owner']}});
	
		$('#alertDarDueño').show();
		
	},

	'click #cambiarRoleAPlayer': function (e) {
		
		e.preventDefault;
		
		Meteor.users.update({_id: this._id}, {$set: {'roles.__global_roles__': ['player']}});
	
		$('#alertDarPlayer').show();
	},

	'click #eliminarPlayer': function (e) {
		e.preventDefault;
		Session.set('userId', this._id);
	},

	'click #eliminarDueno': function (e) {
		e.preventDefault;
		Session.set('userId', this._id);
	},

	'click #deleteUser' : function (e) {
		var userId = Session.get('userId');
		var usuario = Meteor.users.findOne({'_id':userId});
		if (usuario.roles.__global_roles__ == "player") {
			var reservaUsuario = Reserva.find({'usuarioId': userId, 'estado': "Reservada"}).fetch();
			var cantReserva = reservaUsuario.length;
			for(var i = 0; i < cantReserva; i++){
				var idReserva= reservaUsuario[i]._id;
				Reserva.update({_id: idReserva}, {$set: {'estado': "Cancelada"}});
				var oldHora = reservaUsuario[i].hora_de_juego;
			    var oldDia = reservaUsuario[i].fecha_de_juego;
			    var oldRecinto = reservaUsuario[i].nom_recinto;
			    var oldCancha = reservaUsuario[i].num_cancha;
			    var partidoReserva = Partido.findOne({'reserva_id': idReserva});
			    var idPartidoReserva = partidoReserva._id;
	       		var jugadores = Roles.getUsersInRole(['invitado', 'suplente', 'confirmado'], idPartidoReserva);
			    var jugadoresId = [];
			    jugadores.forEach(function (e) {
	 	        var jugadorId = e._id;
			        jugadoresId.push(jugadorId);
			    });
			    Meteor.call('mailCancelar',jugadoresId,oldHora,oldDia,oldRecinto,oldCancha);
			    cancelacionReservaForOwnerNotification(oldHora, oldDia, oldRecinto, oldCancha, idReserva);
			    cancelacionReservaPlayersNotification(idPartidoReserva, jugadoresId);      
			    jugadoresId.forEach(function (e) {
			      Roles.setUserRoles(e, 'noJugo', idPartidoReserva);
			    });
			}
			var partidos = Partido.find().fetch();
			var cantPartidos= partidos.length;
			for(var i = 0; i < cantPartidos; i++){
				var idpartido = partidos[i]._id;
				var equipoA= partidos[i].equipoA;
				var listaA =_.findWhere(equipoA, {userId: userId});
	       		if (listaA) {
	       		Partido.update(idpartido, { $pull: { equipoA: { userId: userId, nombre: usuario.profile.name}}});        
	       		}	
				var equipoB= partidos[i].equipoB;
				var listaB =_.findWhere(equipoB, {userId: userId});
	       		if (listaB) { 
	       		Partido.update(idpartido, { $pull: { equipoB: { userId: userId, nombre: usuario.profile.name}}});       
	       		}
	       		var invitados= partidos[i].invitados;
	       		var mailUser= usuario.emails[0].address;
				var listaInvitados =_.findWhere(invitados, mailUser);
	       		if (listaInvitados) { 
	       		Partido.update(idpartido, { $pull: {invitados: mailUser}});       
	       		}
	       		var suplentes= partidos[i].suplentes;
				var listaSuplentes =_.findWhere(suplentes, userId);
	       		if (listaSuplentes) { 
	       		Partido.update(idpartido, { $pull: {suplentes: userId}});       
	       		}
			}
			var users = Meteor.users.find({'roles.__global_roles__': ['player']}).fetch();
			var cantUsers = users.length;
			for (var i = 0; i < cantUsers; i++) {
				var friends = users[i].profile.friends;
				if (friends != null){
					var cantFriends = friends.length;
					for (var j = 0; j <cantFriends; j++) {
						var idFriend = friends[j].id
						if (idFriend === userId){
							Meteor.users.update(users[i]._id,{ $pull: { 'profile.friends': { id: userId}}});
						}
					}
				}
			}
		}
		else{
			var recinto = Recintos.find({"ownerId":userId}).fetch();
			var cantRecintos = recinto.length;
			for (var i = 0; i < cantRecintos; i++) {
				Recintos.update({_id: recinto[i]._id}, {$set: {'estado_recinto': "No habilitado"}});
				var canchasRecinto = Canchas.find({'recintoId': recinto[i]._id}).fetch();
				var cantCanchas = canchasRecinto.length;
					for (var j = 0; j < cantCanchas; j++) {
					Canchas.update({_id: canchasRecinto[j]._id}, {$set: {'estado_cancha.estado_de_cancha': "No Habilitada"}});
					var reservaCanchaRecinto = Reserva.find({'nom_recinto': recinto[i].nombre_recinto, 'num_cancha': canchasRecinto[j].numero, 'estado': "Reservada"}).fetch();
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
			}
		}
		
		Meteor.users.update({_id: userId}, {$set: {'estado_usuario': "suspendido"}});
			$('#alertEliminarUser').show();
	},

	'click #verificarEmail' : function (e) {
		var userId = Session.get('userId');
	  	Meteor.users.update({_id: userId}, {$set: {'emails.0.verified':true}});	
		$('#alertVerificarEmail').show();
	},
	'click #habilitarUsuario': function (e) {
		e.preventDefault;
		Session.set('userId', this._id);
	},
	'click #habilitarUser' : function (e) {
		var userId = Session.get('userId');
	  	Meteor.users.update({_id: userId}, {$set: {'estado_usuario': "habilitado"}});	
		$('#alertUsuarioHabilitada').show();
	},

	'click #lanzaId' : function (e) {
		Session.set('userId', this._id);
	}

});

