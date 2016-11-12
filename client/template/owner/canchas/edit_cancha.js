Template.editCancha.helpers({

	canchasRecinto : function(){
		idCancha= this._id;
		canchas = Canchas.findOne({_id:idCancha});
			return canchas;

	},

	// Todo esto es para mostrar los valores guardados en cancha
	cantJugadores: function(){
	 	return ["5 vs 5","6 vs 6","7 vs 7","11 vs 11"].map((el) => ({label: el, value: el}));
	 },

	 tipoCancha : function(){
	 	return ["Césped Sintético","Césped Natural","Baldosa","Tierra","Parquet"].map((al) => ({label: al, value: al}));
	 },

	 estadoCancha : function(){
	 	return ["Habilitada","No Habilitada","Mantenimiento"].map((ol) => ({label: ol, value: ol}));
	 },

	 updateCancha: function () {
            return "updateOrgForm-" + this._id;
         },
});

Template.editCancha.events({
	
	'click #cancelar': function (event){

        event.preventDefault;
        Router.go('dashboard', {_id: canchas.recintoId});
    },
});

AutoForm.addHooks(
   'updateCancha',
	{
	after:{
    	update: function (error, result) {  
    		if (canchas.estado_cancha.estado_de_cancha == "No Habilitada" || canchas.estado_cancha.estado_de_cancha == "Mantenimiento"){
	      		console.log("apa")
	      		var canchaId = canchas._id;
			    var recintoId = canchas.recintoId;
			    var recinto = Recintos.findOne({"_id":recintoId});
			    var nomRecinto = recinto.nombre_recinto;
			    var reservaCanchaRecinto = Reserva.find({'nom_recinto': recinto.nombre_recinto, 'num_cancha': canchas.numero, 'estado': "Reservada"}).fetch();
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
      
	      	if(! error){
    			Session.set('alertCanchaActualizada', true);
	    	    Router.go('dashboard', {_id: canchas.recintoId});
       		}	
    	}
  	}
	},
);

