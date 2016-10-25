Template.gestionarReserva.helpers({
	reservas: function () {

		var recinto_Id = this._id;
		var recinto = recinto_Id && Recintos.findOne({'_id': recinto_Id});
    var nombRecinto = recinto && recinto.nombre_recinto;
    var dia = Session.get('dia');
    	
        var diaMoment=moment(dia).format('L');
        var dia=new Date(diaMoment);
        var reservas=nombRecinto && Reserva.find({'nom_recinto':nombRecinto, 'estado': "Reservada", 'fecha_de_juegoD':dia}); 
    	
		return reservas;
	}
});

Template.gestionarReserva.onRendered(function () {
  this.$('#datetimepicker').datetimepicker({
    locale: 'es',
    format: 'L',
    showClear: true,
  }); 
  
});

Template.gestionarReserva.events({

	'click [data-picker-handle]': function (event) {

   		var datetimepicker = $(event.currentTarget).data('pickerHandle');   
    	$(datetimepicker).data('DateTimePicker').toggle();

  },

  'click #datetimepicker': function(event){

  	event.preventDefault();
  	$('#datetimepicker').on('dp.change', function (event) {
  		var fecha = event.date.format('L');
  		var diaMoment = moment(fecha, 'DD/MM/YYYY', true).format();
       var dia = new Date(diaMoment); 
  		Session.set('dia', dia);
		})
  },
  
  'click #modificarReserva': function (event) {
    Router.go('modificarReserva', {_id: this._id});
  },

  'click #lanzaIdReserva' : function (event) {
    var reservaId = this._id;
    Session.set('idReservaDeleted', reservaId);
  },

  'click #deleteReserva': function(event){
    var reservaId = Session.get('idReservaDeleted')
    Reserva.update({_id: reservaId}, {$set: {'estado': "Cancelada"}});
    $('#alertReservaEliminada').show();
  },

  'click #lanzaIdReservaJugada': function (event) {
    var reservaJugadaId = this._id;
    Session.set ('reservaJugadaId', reservaJugadaId);
  },

  'click #partidoJugado': function (event) {
    var reservaJugadaId = Session.get('reservaJugadaId');
    Reserva.update({_id: reservaJugadaId}, {$set: {'estado': "Jugada"}});
    var partido = Partido.findOne({reserva_id: reservaJugadaId});
    var jugaron = Roles.getUsersInRole('confirmado', partido._id);
    jugaron.forEach(function(element) {
      var jugaronId = element._id;
      Roles.setUserRoles(jugaronId, 'jugoPartido', partido._id);
    });
    var nojugaron = Roles.getUsersInRole(['invitado', 'suplente', 'noJuega'], partido._id)
    nojugaron.forEach(function(element) {
      var nojugoId = element._id;
      Roles.setUserRoles(nojugoId, 'noJugo', partido._id);
    });
    $('#alertReservaJugada').show();
  }      	 

});