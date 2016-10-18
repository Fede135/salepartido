Template.partidos.helpers({
	partidosJugados: function(){
		var reserva = Reserva.find({estado : "Jugada"}).fetch();
		var arrayPartidos=[];
		reserva.forEach(function (e) {
			var recintoId= e._id
			var partido = Partido.findOne({recinto_id: recintoId});
			arrayPartidos.push(partido)
		});
		var arrayPartidosJugo=[];
		arrayPartidos.forEach(function (e) {
			var partidoId= e._id;
			if(Roles.userIsInRole( Meteor.userId(),['jugoPartido'], partidoId)){
				arrayPartidosJugo.push(partidoId);      
			}
		});

		return arrayPartidosJugo;
	},
	partidosInvitado: function(){
		var reserva = Reserva.find({estado : "Reservada"}).fetch();
		var arrayPartidos=[];
		reserva.forEach(function (e) {
			var recintoId= e._id
			var partido = Partido.findOne({recinto_id: recintoId});
			arrayPartidos.push(partido)
		});
		var arrayPartidosInvitado=[];
		arrayPartidos.forEach(function (e) {
			var partidoId= e._id;
			if(Roles.userIsInRole( Meteor.userId(),['invitado'], partidoId)){
				arrayPartidosInvitado.push(partidoId);       
			}
		});
		
		return arrayPartidosInvitado;
	},


	partidosPendientes: function(){
		var reserva = Reserva.find({estado : "Reservada"}).fetch();
		var arrayPartidos=[];
		reserva.forEach(function (e) {
			var recintoId= e._id
			var partido = Partido.findOne({recinto_id: recintoId});
			arrayPartidos.push(partido)
		});
		var arrayPartidosPendientes=[];
		arrayPartidos.forEach(function (e) {
			var partidoId= e._id;
			if(Roles.userIsInRole( Meteor.userId(),['confirmado'], partidoId)){
				arrayPartidosPendientes.push(partidoId);      
			}
		});
		
		return arrayPartidosPendientes;
	},
	dia: function(){
		var reservaDia = Reserva.findOne({_id: this.reserva_id}).fecha_de_juego;
		return reservaDia;
	},
	hora: function(){
		var reservaHora = Reserva.findOne({_id: this.reserva_id}).hora_de_juego;
		return reservaHora;
	},
	recinto: function(){
		var reservaRecinto = Reserva.findOne({_id: this.reserva_id}).nom_recinto;
		return  reservaRecinto;
	},
	cancha: function(){
		var reservaCancha = Reserva.findOne({_id: this.reserva_id}).num_cancha;
		return reservaCancha
	},

});