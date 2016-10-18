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
    minDate: moment(),
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

  'click #cancelarReserva': function(event){

    Reserva.update({_id: this._id}, {$set: {'estado': "Cancelada"}});
    alert("Reserva cancelada");

  }  	 

});