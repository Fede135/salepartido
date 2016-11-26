generarReportes = function (idRecinto) {

  var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;

	var reservasMañanaC = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 9, "$lte" : 12}}).count();

	var reservasSiestaC = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 13, "$lte" : 16}}).count();

	var reservasTardeC = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 17, "$lte" : 20}}).count();

	var reservasNocheC = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 21, "$lte" : 23}}).count();

	var reservasMadrugadaC = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 0, "$lte" : 1}}).count();

	
	var reservasMañanaCancel = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 9, "$lte" : 12},estado : "Cancelada"}).count();

	var reservasSiestaCancel = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 13, "$lte" : 16},estado : "Cancelada"}).count();

	var reservasTardeCancel = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 17, "$lte" : 20},estado : "Cancelada"}).count();

	var reservasNocheCancel = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 21, "$lte" : 23},estado : "Cancelada"}).count();

	var reservasMadrugadaCancel = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 0, "$lte" : 1},estado : "Cancelada"}).count();

  var reservasMañanaJ = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 9, "$lte" : 12},estado : "Jugada"}).count();

	var reservasSiestaJ = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 13, "$lte" : 16},estado : "Jugada"}).count();

	var reservasTardeJ = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 17, "$lte" : 20},estado : "Jugada"}).count();

	var reservasNocheJ = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 21, "$lte" : 23},estado : "Jugada"}).count();

	var reservasMadrugadaJ = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 0, "$lte" : 1},estado : "Jugada"}).count();

  var reservasJ = Reserva.find({nom_recinto:recinto,estado : "Jugada"});
	var arrayReservas = reservasJ.fetch();
	//console.log('reservas jugadas',arrayReservas);
	var arrayFecha = [];
	arrayReservas.forEach(function(a){
		var dia = a.fecha_de_juegoD.getUTCDay()
		arrayFecha.push(dia);
	});
	//console.log('dias',arrayFecha)
	var domingo = [];
	var lunes = [];
	var martes = [];
	var miercoles = [];
	var jueves = [];
	var viernes = [];
	var sabado = [];
	arrayFecha.forEach(function(d){
		switch(d){
			case 0:
			domingo.push(d);
			break;
			case 1:
			lunes.push(d);
			break;
			case 2:
			martes.push(d);
			break;
			case 3:
			miercoles.push(d);
			break;
			case 4:
			jueves.push(d);
			break;
			case 5:
			viernes.push(d);
			break;
			case 6:
			sabado.push(d);
			break;

		}
	});
	var cantDomingo = domingo.length;
	var cantLunes = lunes.length;
	var cantMartes = martes.length;
	var cantMiercoles= miercoles.length;
	var cantJueves= jueves.length;
	var cantViernes = viernes.length;
	var cantSabado = sabado.length;

	var reservasC = Reserva.find({nom_recinto:recinto,estado : "Cancelada"});
	var arrayReservas = reservasC.fetch();
	//console.log('reservas jugadas',arrayReservas);
	var arrayFecha = [];
	arrayReservas.forEach(function(a){
		var dia = a.fecha_de_juegoD.getUTCDay()
		arrayFecha.push(dia);
	});
	//console.log('dias',arrayFecha)
	var domingo = [];
	var lunes = [];
	var martes = [];
	var miercoles = [];
	var jueves = [];
	var viernes = [];
	var sabado = [];
	arrayFecha.forEach(function(d){
		switch(d){
			case 0:
			domingo.push(d);
			break;
			case 1:
			lunes.push(d);
			break;
			case 2:
			martes.push(d);
			break;
			case 3:
			miercoles.push(d);
			break;
			case 4:
			jueves.push(d);
			break;
			case 5:
			viernes.push(d);
			break;
			case 6:
			sabado.push(d);
			break;

		}
	});

	var cantDomingo = domingo.length;
	var cantLunes = lunes.length;
	var cantMartes = martes.length;
	var cantMiercoles= miercoles.length;
	var cantJueves= jueves.length;
	var cantViernes = viernes.length;
	var cantSabado = sabado.length;

var reservas = Reserva.find({nom_recinto:recinto,estado:"Jugada"});
	if(reservas){
		var arrayReservas = reservas.fetch();
		var arrayIdJugadores = [];	
		arrayReservas.forEach(function (obj) {
			if(obj.usuarioId){
				var usuId = obj.usuarioId;		
				arrayIdJugadores.push(usuId);
			}
		});	
		//array de jugadores que reservaron sin repetir
		var arrayIdJugadoresUnicos = _.uniq(arrayIdJugadores);
		var arrayJugadoresUnicos =[];
		arrayIdJugadoresUnicos.forEach(function(id){
			var usu = Meteor.users.findOne({_id:id});
			arrayJugadoresUnicos.push(usu)
		})
		var cantidadReservas= [];
		arrayJugadoresUnicos.forEach(function (o) {
			var cantReservas = Reserva.find({nom_recinto:recinto,estado:"Jugada",usuarioId: o._id}).count();
			cantidadReservas.push(cantReservas);
			
		});	
		//dentro de cantidadJugador, van otros array con la cantidad y el iduser
		var cantidadJugador = _.zip(cantidadReservas,arrayJugadoresUnicos);
		
		//lo ordeno de menor a mayor
		//arreglo con mas arreglos
		var cantidadJugadorOrdenado = cantidadJugador.sort();
		
		//trae los q mas tienen
		var ultimo3 = cantidadJugadorOrdenado.slice(Math.max(cantidadJugadorOrdenado.length - 4, 1));
}

var reservas = Reserva.find({nom_recinto:recinto,estado:"Cancelada"});//cambiar "Recinto 1" por el nombre del recinto donde se muestra
	//en este array se van a guardar los id de los jugadores q reservaron canchas
	if(reservas){
		var arrayReservasCanceladas = reservas.fetch();
		var arrayIdJugadoresCancelaron = [];
		arrayReservasCanceladas.forEach(function (obj) {
			if(obj.usuarioId){
			var usuId = obj.usuarioId;
			arrayIdJugadoresCancelaron.push(usuId);
			}
		});
		//array de jugadores que reservaron sin repetir
		var arrayIdJugadoresCancelaronUnicos = _.uniq(arrayIdJugadoresCancelaron);
		var arrayJugadoresCancelaronUnicos= [];
		arrayIdJugadoresCancelaronUnicos.forEach(function(id){
			var usu = Meteor.users.findOne({_id:id});
			arrayJugadoresCancelaronUnicos.push(usu)
		});
		var cantidadReservas= [];
		arrayJugadoresCancelaronUnicos.forEach(function (o) {
			var cantReservas = Reserva.find({nom_recinto:recinto,estado:"Cancelada",usuarioId: o._id}).count();
			cantidadReservas.push(cantReservas);
			
		});
		//dentro de cantidadJugador, van otros array con la cantidad y el iduser
		var cantidadJugador = _.zip(cantidadReservas,arrayJugadoresCancelaronUnicos);
		//lo ordeno de menor a mayor
		var cantidadJugadorOrdenado = cantidadJugador.sort();
		var ultimo3 = cantidadJugadorOrdenado.slice(Math.max(cantidadJugadorOrdenado.length - 4, 1));
	}

	var reservas = Reserva.find({nom_recinto:recinto,estado:"Jugada"});
	if(reservas){
		var arrayReservas = reservas.fetch();			
		var arrayNombreJugadores = [];	
		arrayReservas.forEach(function (obj) {
			if(!obj.usuarioId){
				var usuNombre = obj.nom_usuario;		
				arrayNombreJugadores.push(usuNombre);
			}
		});	
		var arrayNombreJugadoresUnicos = _.uniq(arrayNombreJugadores);
		
		var cantidadReservas= [];
		arrayNombreJugadoresUnicos.forEach(function (nombre) {
			var cantReservas = Reserva.find({nom_recinto:recinto,estado:"Jugada",nom_usuario: nombre}).count();
			cantidadReservas.push(cantReservas);
			
		});		
		var cantidadJugador = _.zip(cantidadReservas,arrayNombreJugadoresUnicos);		
		var cantidadJugadorOrdenado = cantidadJugador.sort();	
		//trae los q mas tienen
		var ultimo3 = cantidadJugadorOrdenado.slice(Math.max(cantidadJugadorOrdenado.length - 4, 1));	
	}


var reservas = Reserva.find({nom_recinto:recinto,estado:"Cancelada"});
	if(reservas){
		var arrayReservas = reservas.fetch();			
		var arrayNombreJugadores = [];	
		arrayReservas.forEach(function (obj) {
			if(!obj.usuarioId){
				var usuNombre = obj.nom_usuario;		
				arrayNombreJugadores.push(usuNombre);
			}
		});	
		var arrayNombreJugadoresUnicos = _.uniq(arrayNombreJugadores);
		
		var cantidadReservas= [];
		arrayNombreJugadoresUnicos.forEach(function (nombre) {
			var cantReservas = Reserva.find({nom_recinto:recinto,estado:"Cancelada",nom_usuario: nombre}).count();
			cantidadReservas.push(cantReservas);
			
		});		
		var cantidadJugador = _.zip(cantidadReservas,arrayNombreJugadoresUnicos);		
		var cantidadJugadorOrdenado = cantidadJugador.sort();	
		//trae los q mas tienen
		var ultimo3 = cantidadJugadorOrdenado.slice(Math.max(cantidadJugadorOrdenado.length - 4, 1));
	}

	var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;

	var reservasMañana = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 9, "$lte" : 12}}).count();

	var reservasSiesta = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 13, "$lte" : 16}}).count();

	var reservasTarde = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 17, "$lte" : 20}}).count();

	var reservasNoche = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 21, "$lte" : 23}}).count();

	var reservasMadrugada = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 0, "$lte" : 1}}).count();

	var cantNoche = reservasNoche + reservasMadrugada;

	var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;

	var reservasMañana = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 9, "$lte" : 12},estado : "Cancelada"}).count();

	var reservasSiesta = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 13, "$lte" : 16},estado : "Cancelada"}).count();

	var reservasTarde = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 17, "$lte" : 20},estado : "Cancelada"}).count();

	var reservasNoche = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 21, "$lte" : 23},estado : "Cancelada"}).count();

	var reservasMadrugada = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 0, "$lte" : 1},estado : "Cancelada"}).count();

	var cantNoche = reservasNoche + reservasMadrugada;

	var reservasMañana = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 9, "$lte" : 12},estado : "Jugada"}).count();

	var reservasSiesta = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 13, "$lte" : 16},estado : "Jugada"}).count();

	var reservasTarde = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 17, "$lte" : 20},estado : "Jugada"}).count();

	var reservasNoche = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 21, "$lte" : 23},estado : "Jugada"}).count();

	var reservasMadrugada = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 0, "$lte" : 1},estado : "Jugada"}).count();

	var reservas = Reserva.find({nom_recinto:recinto,estado : "Jugada"});
	var arrayReservas = reservas.fetch();
	//console.log('reservas jugadas',arrayReservas);
	var arrayFecha = [];
	arrayReservas.forEach(function(a){
		var dia = a.fecha_de_juegoD.getUTCDay()
		arrayFecha.push(dia);
	});
	//console.log('dias',arrayFecha)
	var domingo = [];
	var lunes = [];
	var martes = [];
	var miercoles = [];
	var jueves = [];
	var viernes = [];
	var sabado = [];
	arrayFecha.forEach(function(d){
		switch(d){
			case 0:
			domingo.push(d);
			break;
			case 1:
			lunes.push(d);
			break;
			case 2:
			martes.push(d);
			break;
			case 3:
			miercoles.push(d);
			break;
			case 4:
			jueves.push(d);
			break;
			case 5:
			viernes.push(d);
			break;
			case 6:
			sabado.push(d);
			break;

		}
	});
	var cantDomingo = domingo.length;
	var cantLunes = lunes.length;
	var cantMartes = martes.length;
	var cantMiercoles= miercoles.length;
	var cantJueves= jueves.length;
	var cantViernes = viernes.length;
	var cantSabado = sabado.length;


var reservas = Reserva.find({nom_recinto:recinto,estado : "Cancelada"});
	var arrayReservas = reservas.fetch();
	//console.log('reservas jugadas',arrayReservas);
	var arrayFecha = [];
	arrayReservas.forEach(function(a){
		var dia = a.fecha_de_juegoD.getUTCDay()
		arrayFecha.push(dia);
	});
	//console.log('dias',arrayFecha)
	var domingo = [];
	var lunes = [];
	var martes = [];
	var miercoles = [];
	var jueves = [];
	var viernes = [];
	var sabado = [];
	arrayFecha.forEach(function(d){
		switch(d){
			case 0:
			domingo.push(d);
			break;
			case 1:
			lunes.push(d);
			break;
			case 2:
			martes.push(d);
			break;
			case 3:
			miercoles.push(d);
			break;
			case 4:
			jueves.push(d);
			break;
			case 5:
			viernes.push(d);
			break;
			case 6:
			sabado.push(d);
			break;

		}
	});

	var cantDomingo = domingo.length;
	var cantLunes = lunes.length;
	var cantMartes = martes.length;
	var cantMiercoles= miercoles.length;
	var cantJueves= jueves.length;
	var cantViernes = viernes.length;
	var cantSabado = sabado.length;

	return true;
};


buscarAmigos = function () {

	var usuarios = Meteor.users.find();
	return true;

};

buscarPartidos = function (idUsuario) {

	var partidosArray = Roles.getGroupsForUser(idUsuario, 'invitado');
    if(partidosArray.length != 0 ) { 
      var partidos = [];
      partidosArray.forEach(function(e) {
        var partido = Partido.findOne({_id: e});
        partidos.push(partido);
      })
     
		}

		var partidosArray = Roles.getGroupsForUser(idUsuario, 'confirmado');
    if(partidosArray.length != 0 ) {
      var partidos = []; 
      partidosArray.forEach(function(e) {
        var partido = Partido.findOne({_id: e});
        partidos.push(partido);
      });
		}
    var partidosArray = Roles.getGroupsForUser(idUsuario, 'jugoPartido');
    if(partidosArray.length != 0 ) {
      var partidos = []; 
      partidosArray.forEach(function(e) {
        var partido = Partido.findOne({_id: e});
        partidos.push(partido);
      });
	}
	return true;
}