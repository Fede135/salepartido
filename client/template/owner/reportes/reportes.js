Template.reportes.helpers({
	//cantidad de reservas que se concretaron, de cada cliente
	cantJugadoresReservaron : function(){
	//Reservas ya concretadas
	var idRecinto = this._id;
	var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;
	var reservas = Reserva.find({nom_recinto:recinto,estado:"Jugada"});	
	//en este array se van a guardar los id de los jugadores q reservaron canchas
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
	var ultimo3 = cantidadJugadorOrdenado.slice(Math.max(cantidadJugadorOrdenado.length - 7, 1));
	
	var arrayObjetos= [];
	ultimo3.forEach(function (a) {
		var obje = _.object(['cantidad','usuario'],a);
		arrayObjetos.push(obje);
	});
	
	return arrayObjetos;
},
jugadoresCancelaron: function(){
	//Reservas ya concretadas
	var idRecinto = this._id
	var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;
	var reservas = Reserva.find({nom_recinto:recinto,estado:"Cancelada"});//cambiar "Recinto 1" por el nombre del recinto donde se muestra
	//en este array se van a guardar los id de los jugadores q reservaron canchas
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
	var ultimo3 = cantidadJugadorOrdenado.slice(Math.max(cantidadJugadorOrdenado.length - 7, 1));
	var arrayObjetos= [];
	ultimo3.forEach(function (a) {
		var obje = _.object(['cantidad','usuario'],a);
		arrayObjetos.push(obje);
	});
	//console.log('cancelaron',arrayObjetos);
	return arrayObjetos;

},
cantJugadoresReservaronP : function(){ //personalmente, llamando o yendo al recinto
	var idRecinto = this._id
	var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;
	var reservas = Reserva.find({nom_recinto:recinto,estado:"Jugada"});
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
	//var ultimo3 = cantidadJugadorOrdenado.slice(Math.max(cantidadJugadorOrdenado.length - 3, 1));	
	var arrayObjetos= [];
	cantidadJugadorOrdenado.forEach(function (a) {
		var obje = _.object(['cantidad','usuario'],a);
		arrayObjetos.push(obje);
	});
	
	return arrayObjetos;
},

jugadoresCancelaronP : function(){ //personalmente, llamando o yendo al recinto
	var idRecinto = this._id
	var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;
	var reservas = Reserva.find({nom_recinto:recinto,estado:"Cancelada"});
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
	//var ultimo3 = cantidadJugadorOrdenado.slice(Math.max(cantidadJugadorOrdenado.length - 3, 1));	
	var arrayObjetos= [];
	cantidadJugadorOrdenado.forEach(function (a) {
		var obje = _.object(['cantidad','usuario'],a);
		arrayObjetos.push(obje);
	});
	
	return arrayObjetos;
},

cantPorHoras:function(){

/*	var mañana = [09,10,11,12];
	var siesta = [13,14,15,16];
	var tarde = [17,18,19,20];
	var noche = [21,22,23,0,1];*/
	var idRecinto = this._id
	var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;

	var reservasMañana = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 9, "$lte" : 12}}).count();

	var reservasSiesta = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 13, "$lte" : 16}}).count();

	var reservasTarde = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 17, "$lte" : 20}}).count();

	var reservasNoche = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 21, "$lte" : 23}}).count();

	var reservasMadrugada = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 0, "$lte" : 1}}).count();

	var cantNoche = reservasNoche + reservasMadrugada;

	var rangoCantidad = _.zip(['Mañana','Siesta','Tarde','Noche'],[reservasMañana,reservasSiesta,reservasTarde,cantNoche]);
	var obj = [];
	rangoCantidad.forEach(function(a){
		var ob = _.object(['rango','cantidad'],a);
		obj.push(ob);
	});

	return obj;

},
cantCanceladasPorHoras:function(){
	var idRecinto = this._id
	var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;

	var reservasMañana = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 9, "$lte" : 12},estado : "Cancelada"}).count();

	var reservasSiesta = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 13, "$lte" : 16},estado : "Cancelada"}).count();

	var reservasTarde = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 17, "$lte" : 20},estado : "Cancelada"}).count();

	var reservasNoche = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 21, "$lte" : 23},estado : "Cancelada"}).count();

	var reservasMadrugada = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 0, "$lte" : 1},estado : "Cancelada"}).count();

	var cantNoche = reservasNoche + reservasMadrugada;

	var rangoCantidad = _.zip(['Mañana','Siesta','Tarde','Noche'],[reservasMañana,reservasSiesta,reservasTarde,cantNoche]);
	var obj = [];
	rangoCantidad.forEach(function(a){
		var ob = _.object(['rango','cantidad'],a);
		obj.push(ob);
	});

	return obj;
},

cantConcretadasPorHoras:function(){
	var idRecinto = this._id
	var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;

	var reservasMañana = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 9, "$lte" : 12},estado : "Jugada"}).count();

	var reservasSiesta = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 13, "$lte" : 16},estado : "Jugada"}).count();

	var reservasTarde = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 17, "$lte" : 20},estado : "Jugada"}).count();

	var reservasNoche = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 21, "$lte" : 23},estado : "Jugada"}).count();

	var reservasMadrugada = Reserva.find({nom_recinto:recinto,hora_de_juego : {"$gte" : 0, "$lte" : 1},estado : "Jugada"}).count();

	var cantNoche = reservasNoche + reservasMadrugada;

	var rangoCantidad = _.zip(['Mañana','Siesta','Tarde','Noche'],[reservasMañana,reservasSiesta,reservasTarde,cantNoche]);
	var obj = [];
	rangoCantidad.forEach(function(a){
		var ob = _.object(['rango','cantidad'],a);
		obj.push(ob);
	});

	return obj;
},

concretadasPorDia: function(){
	var idRecinto = this._id
	var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;
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

	var arrayDiaCantidad = _.zip(['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],[cantDomingo,cantLunes,cantMartes,cantMiercoles,cantJueves,cantViernes,cantSabado]);
	var arrayObjeto = [];
	arrayDiaCantidad.forEach(function(e){
		var ob = _.object(['dia','cantidad'],e);
		arrayObjeto.push(ob);
	});
	return arrayObjeto;
},

canceladasPorDia: function(){
	var idRecinto = this._id
	var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;
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

	var arrayDiaCantidad = _.zip(['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],[cantDomingo,cantLunes,cantMartes,cantMiercoles,cantJueves,cantViernes,cantSabado]);
	var arrayObjeto = [];
	arrayDiaCantidad.forEach(function(e){
		var ob = _.object(['dia','cantidad'],e);
		arrayObjeto.push(ob);
	})
	return arrayObjeto;
},
cantReservas: function(){	
	
	if(Session.get('fechaHasta') && Session.get('fechaHasta')){
		var diaStringD = Session.get('fechaDesde');	
		var diaMomentD = moment(diaStringD, 'DD/MM/YYYY', true).format();	
		diaDesde = new Date(diaMomentD);
	//console.log('desde',diaDesde)
	
		var diaStringH= Session.get('fechaHasta');	
		var diaMomentH = moment(diaStringH, 'DD/MM/YYYY', true).format();	
		diaHasta = new Date(diaMomentH);
		var start = diaDesde;	
		//console.log(start)
		var end = diaHasta;
		//console.log(end)
		var idRecinto = this._id
		var recinto = Recintos.findOne({_id: idRecinto}).nombre_recinto;
		var reservas = Reserva.find({nom_recinto:recinto,'fecha_de_juegoD' : {"$gte" : start, "$lte" : end}});		
		var arrayReservas = reservas.fetch();
		var countReservas = reservas.count();
		//console.log(arrayReservas);

		//--------------Reservas pendientes
		var reservasPendientes = Reserva.find({nom_recinto:recinto,fecha_de_juegoD : {"$gte" : start, "$lte" : end},estado:"Reservada"});
		var cantidadReservasReservadas= reservasPendientes.count();
		//--------------Reservas canceladas
		var reservasCanceladas = Reserva.find({nom_recinto:recinto,fecha_de_juegoD : {"$gte" : start, "$lte" : end},estado:"Cancelada"});
		var cantidadReservasCanceladas= reservasCanceladas.count();
		//--------------Reservas jugadas
		var reservasJugadas = Reserva.find({nom_recinto:recinto,fecha_de_juegoD : {"$gte" : start, "$lte" : end},estado:"Jugada"});
		var cantidadReservasJugadas= reservasJugadas.count();

		var array1 = _.zip(['Pendientes','Canceladas','Jugadas','TOTAL'],[cantidadReservasReservadas,cantidadReservasCanceladas,cantidadReservasJugadas,countReservas]);
		//console.log(array1);
		var res = [];
		array1.forEach(function(e){
			var objeto = _.object(['tipo','cantidad'],e);
			res.push(objeto)
		})
		//console.log(res);
		return res;
		//para buscar los usuarios q mas reservaron y los q ams cancelaron usar el codigo de arriba
	}else{
		return false;
	}

},

});
Template.reportes.onRendered(function () {
	this.$('#datetimepickerDesde').datetimepicker({
		locale: 'es',
		format: 'L',   
		showClear: true,
	});

	this.$('#datetimepickerHasta').datetimepicker({
		locale: 'es',
		format: 'L',    
		showClear: true,
	});

});

Template.reportes.events({
	'click [data-picker-handle]': function (event) {

		var datetimepicker = $(event.currentTarget).data('pickerHandle');   
		$(datetimepicker).data('DateTimePicker').toggle();

		

	},	

'click #datetimepickerDesde': function (event) {		

	event.preventDefault();
	$('#datetimepickerDesde').on('dp.change', function(event){
		var fechaDesde= event.date.format('L');
			//console.log(fechaDesde);
			Session.set('fechaDesde', fechaDesde);
		});
},

'click #datetimepickerHasta': function (event) {		

	event.preventDefault();
	$('#datetimepickerHasta').on('dp.change', function(event){
		var fechaHasta= event.date.format('L');
			//console.log(fechaHasta);
			Session.set('fechaHasta', fechaHasta);
		});
},        


});

Template.reportes.onDestroyed(function() {

	Session.set('fechaDesde',null);
	Session.set('fechaHasta',null);
});