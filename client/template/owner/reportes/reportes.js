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

	/*'click #verReporte': function(e){
	
	var diaStringD = Session.get('fechaDesde');	
	var diaMomentD = moment(diaStringD, 'DD/MM/YYYY', true).format();	
	diaDesde = new Date(diaMomentD);
	console.log('desde',diaDesde)
	
	var diaStringH= Session.get('fechaHasta');	
	var diaMomentH = moment(diaStringH, 'DD/MM/YYYY', true).format();	
	diaHasta = new Date(diaMomentH);
	console.log('hasta',diaHasta)
	
	},*/
	
	'click #datetimepickerDesde': function (event) {		
		
		event.preventDefault();
		$('#datetimepickerDesde').on('dp.change', function(event){
			var fechaDesde= event.date.format('L');
			console.log(fechaDesde);
			Session.set('fechaDesde', fechaDesde);
		});
	},

	'click #datetimepickerHasta': function (event) {		
		
		event.preventDefault();
		$('#datetimepickerHasta').on('dp.change', function(event){
			var fechaHasta= event.date.format('L');
			console.log(fechaHasta);
			Session.set('fechaHasta', fechaHasta);
		});
	},        
   

 });


Template.reportes.helpers({
	//cantidad de reservas que se concretaron, de cada cliente
	cantJugadoresReservaron : function(){
	//Reservas ya concretadas
	var reservas = Reserva.find({nom_recinto: "Recinto 1",estado:"Jugada"});
	var arrayReservas = reservas.fetch();	
	//en este array se van a guardar los id de los jugadores q reservaron canchas
	var arrayIdJugadores = [];
	arrayReservas.forEach(function (obj) {
		var usuId = obj.usuarioId;		
		arrayIdJugadores.push(usuId);
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
		var cantReservas = Reserva.find({nom_recinto: "Recinto 1",usuarioId: o._id}).count();
		cantidadReservas.push(cantReservas);
		
	});
	
	//dentro de cantidadJugador, van otros array con la cantidad y el iduser
	var cantidadJugador = _.zip(cantidadReservas,arrayJugadoresUnicos);
	
	//lo ordeno de menor a mayor
	//arreglo con mas arreglos
	var cantidadJugadorOrdenado = cantidadJugador.sort();
	
	//trae los q mas tienen
	//var ultimo3 = cantidadJugadorOrdenado.slice(Math.max(cantidadJugadorOrdenado.length - 3, 1));
	
	var arrayObjetos= [];
	cantidadJugadorOrdenado.forEach(function (a) {
		var obje = _.object(['cantidad','usuario'],a);
		arrayObjetos.push(obje);
	});
	console.log(arrayObjetos);

	
	return arrayObjetos;
},
jugadoresCancelaron: function(){
	//Reservas ya concretadas
	var reservas = Reserva.find({nom_recinto: "Recinto 1",estado:"Cancelada"});//cambiar "Recinto 1" por el nombre del recinto donde se muestra
	//en este array se van a guardar los id de los jugadores q reservaron canchas
	var arrayReservas = reservas.fetch();
	var arrayIdJugadores = [];
	arrayReservas.forEach(function (obj) {
		var usuId = obj.usuarioId;
		arrayIdJugadores.push(usuId)
	});
	//array de jugadores que reservaron sin repetir
	var arrayIdJugadoresUnicos = _.uniq(arrayIdJugadores);
	var arrayJugadoresUnicos= [];
	arrayIdJugadoresUnicos.forEach(function(id){
		var usu = Meteor.users.findOne({_id:id});
		arrayJugadoresUnicos.push(usu)
	});
	var cantidadReservas= [];
	arrayJugadoresUnicos.forEach(function (o) {
		var cantReservas = Reserva.find({nom_recinto: "Recinto 1",usuarioId: o._id}).count();
		cantidadReservas.push(cantReservas);
		
	});
	//dentro de cantidadJugador, van otros array con la cantidad y el iduser
	var cantidadJugador = _.zip(cantidadReservas,arrayIdJugadoresUnicos);
	//lo ordeno de menor a mayor
	var cantidadJugadorOrdenado = cantidadJugador.sort();
	var arrayObjetos= [];
	cantidadJugadorOrdenado.forEach(function (a) {
		var obje = _.object(['cantidad','usuario'],a);
		arrayObjetos.push(obje);
	});
	console.log(arrayObjetos);
	return arrayObjetos;

},

cantReservas: function(){
	var diaStringD = Session.get('fechaDesde');	
	var diaMomentD = moment(diaStringD, 'DD/MM/YYYY', true).format();	
	diaDesde = new Date(diaMomentD);
	console.log('desde',diaDesde)
	
	var diaStringH= Session.get('fechaHasta');	
	var diaMomentH = moment(diaStringH, 'DD/MM/YYYY', true).format();	
	diaHasta = new Date(diaMomentH);
	console.log('hasta',diaHasta)
	
	if(diaDesde && diaHasta){
		var start = diaDesde;	
		console.log(start)
		var end = diaHasta;
		console.log(end)
		
		var reservas = Reserva.find({nom_recinto: "Recinto 1",'fecha_de_juegoD' : {"$gte" : start, "$lte" : end}});		
		var arrayReservas = reservas.fetch();
		var countReservas = reservas.count();
		console.log(arrayReservas);

		//--------------Reservas pendientes
		var reservasPendientes = Reserva.find({nom_recinto: "Recinto 1",fecha_de_juegoD : {"$gte" : start, "$lte" : end},estado:"Reservada"});
		var cantidadReservasReservadas= reservasPendientes.count();
		//--------------Reservas canceladas
		var reservasCanceladas = Reserva.find({nom_recinto: "Recinto 1",fecha_de_juegoD : {"$gte" : start, "$lte" : end},estado:"Cancelada"});
		var cantidadReservasCanceladas= reservasCanceladas.count();
		//--------------Reservas jugadas
		var reservasJugadas = Reserva.find({nom_recinto: "Recinto 1",fecha_de_juegoD : {"$gte" : start, "$lte" : end},estado:"Jugada"});
		var cantidadReservasJugadas= reservasJugadas.count();

		var array1 = _.zip(['Pendientes','Canceladas','Jugadas','TOTAL'],[cantidadReservasReservadas,cantidadReservasCanceladas,cantidadReservasJugadas,countReservas]);
		console.log(array1);
		var res = [];
		array1.forEach(function(e){
			var objeto = _.object(['tipo','cantidad'],e);
			res.push(objeto)
		})
		console.log(res);
		return res;
		//para buscar los usuarios q mas reservaron y los q ams cancelaron usar el codigo de arriba
	}

},

});

Template.reportes.onDestroyed(function() {
  Session.set('fechaDesde', fechaDesde);
  Session.set('fechaHasta', fechaHasta);
});