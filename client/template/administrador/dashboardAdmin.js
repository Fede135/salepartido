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
		var reservaUsuario = Reserva.find({'usuarioId': userId, 'estado': "Reservada"}).fetch();
		var cantReserva = reservaUsuario.length;
		for(var i = 0; i < cantReserva; i++){
			var idReserva= reservaUsuario[i]._id;
			Reserva.update({_id: idReserva}, {$set: {'estado': "Cancelada"}});
		}
		var partido = Partido.find().fetch();
		var cantPartido= partido.length;
		for(var i = 0; i < cantPartido; i++){
			var idpartido = partido[i]._id;
			var equipoA= partido[i].equipoA;
			var listaA =_.findWhere(equipoA, {userId: userId});
       		if (listaA) {
       		Partido.update(idpartido, { $pull: { equipoA: { userId: userId, nombre: usuario.profile.name}}});        
       		}	
			var equipoB= partido[i].equipoB;
			var listaB =_.findWhere(equipoB, {userId: userId});
       		if (listaB) { 
       		Partido.update(idpartido, { $pull: { equipoB: { userId: userId, nombre: usuario.profile.name}}});       
       		}
       		var invitados= partido[i].invitados;
       		var mailUser= usuario.emails[0].address;
			var listaInvitados =_.findWhere(invitados, mailUser);
       		if (listaInvitados) { 
       		Partido.update(idpartido, { $pull: {invitados: mailUser}});       
       		}
       		var suplentes= partido[i].suplentes;
			var listaSuplentes =_.findWhere(suplentes, userId);
       		if (listaSuplentes) { 
       		Partido.update(idpartido, { $pull: {suplentes: userId}});       
       		}
       		var partidos = Partido.findOne({'_id': idpartido});
   			var reserva = Reserva.findOne({'_id': partidos.reserva_id});
		    // Guardando los valores originales de la reserva antes de ser actualizada
		    var oldHora = reserva.hora_de_juego;
		    var oldDia = reserva.fecha_de_juego;
		    var oldRecinto = reserva.nom_recinto;
		    var oldCancha = reserva.num_cancha;
       		var jugadores = Roles.getUsersInRole(['invitado', 'suplente', 'confirmado'], idpartido);
		    var jugadoresId = [];
		    jugadores.forEach(function (e) {
		      var jugadorId = e._id;
		      jugadoresId.push(jugadorId);
		    });

		    Meteor.call('mailCancelar',jugadoresId,oldHora,oldDia,oldRecinto,oldCancha);
		    cancelacionReservaForOwnerNotification(oldHora, oldDia, oldRecinto, oldCancha, reserva._id);
		    cancelacionReservaPlayersNotification(idpartido, jugadoresId);      
		    jugadoresId.forEach(function (e) {
		      Roles.setUserRoles(e, 'noJugo', idpartido);
		    });
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
		};
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

