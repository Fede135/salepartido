Template.modificarReserva.helpers({

	reserva: function(){
		var reserva = Reserva.findOne({'_id':this._id});
		Session.set('reserva', reserva);
	return reserva;
	},

	cancha: function () {
      var reserva = Session.get('reserva');
      var nombre_recinto = reserva && reserva.nom_recinto;
      var recinto = nombre_recinto && Recintos.findOne({'nombre_recinto':nombre_recinto});
	    var recintoId = recinto && recinto._id;
	    var canchas = recintoId && Canchas.find({'recintoId':recintoId});
      
      return canchas;
  },	

	errorMessage: function(field) {
    return Session.get('reservaErrors')[field];
  		},

  	errorClass: function (field) {
    return !!Session.get('reservaErrors')[field] ? 'has-error' : '';
  	}
});

Template.modificarReserva.onRendered(function () {
  this.$('#datetimepicker').datetimepicker({  	
    locale: 'es',
    format: 'L',
    minDate: moment(),
    showClear: true,
  });

  this.$('#datetimepicker3').datetimepicker({
    locale: 'es',
    format:'H',
    disabledHours: [ 2 , 3 , 4 , 5 , 6 , 7 , 8 ],
    showClear: true
  });
});

Template.modificarReserva.events({

'click [data-picker-handle]': function (event) {

    var datetimepicker = $(event.currentTarget).data('pickerHandle');   
    $(datetimepicker).data('DateTimePicker').toggle();

  },
 
 'click [data-for-cancha]': function(event){

    var $item=$(event.currentTarget);
    var $target=$($item.data('forCancha'));

    $target.val($item.text()); 
  },

  'click #actualizarReserva': function(e) {
        
        var reserva = Session.get('reserva');
        var nom_reserva = reserva && reserva.nom_reserva;
      	var nombre_recinto = reserva && reserva.nom_recinto;
      	var nom_usuario = reserva && reserva.nom_usuario;

        e.preventDefault();

        var reserva = {

            _id: this._id,
            nom_usuario: nom_usuario,            
            nom_reserva: nom_reserva,            
            nom_recinto: nombre_recinto,
            num_cancha: $('input[name=nombreCancha]').val(),
            hora_de_juego: $('input[name=datetimepicker3]').val(),
            fecha_de_juego: $('input[name=datetimepicker]').val(),
        };
        
        var errors = validateReserva(reserva);
        
        if (errors.nombreCancha)
        return Session.set('reservaErrors', errors);


        Reserva.update({_id: this._id}, {$set: 
          {
            'num_cancha': $('input[name=nombreCancha]').val(), 
            'hora_de_juego': $('input[name=datetimepicker3]').val(),
            'fecha_de_juego': $('input[name=datetimepicker]').val()
          }
        });
 
        alert("Reserva creada");
        
        var recinto = nombre_recinto && Recintos.findOne({'nombre_recinto':nombre_recinto});
        var recintoId = recinto && recinto._id;
        Router.go('dashboard', {_id:recintoId});
    }, 
});  

Template.modificarReserva.onCreated(function() {
  
  Session.set('reservaErrors', {});
  Session.set('reserva', {});
});

Template.modificarReserva.onDestroyed( function(){

    Session.set('reserva', null);

});
