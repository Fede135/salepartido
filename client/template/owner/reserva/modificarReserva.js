
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
	    var canchas = recintoId && Canchas.find({'recintoId':recintoId, 'estado_cancha.estado_de_cancha': "Habilitada"});
      
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

  'click #cancelar': function (event){

        event.preventDefault;
        var nomRecinto= this.nom_recinto;
        var recinto = nomRecinto &&  Recintos.findOne({'nombre_recinto': nomRecinto});
        var recintoId = recinto && recinto._id;
        Router.go('dashboard', {_id: recintoId});
  },

  'click #actualizarReserva': function(e) {
        
        var reserva = Session.get('reserva');
        var nom_reserva = reserva && reserva.nom_reserva;
      	var nombre_recinto = reserva && reserva.nom_recinto;
      	var nom_usuario = reserva && reserva.nom_usuario;
        var diaString = $('input[name=datetimepicker]').val();        
        var diaMoment = moment(diaString, 'DD/MM/YYYY', true);
        var dia = diaMoment.toDate();

        e.preventDefault();

        var reserva = {

            _id: this._id,
            nom_usuario: nom_usuario,            
            nom_reserva: nom_reserva,            
            nom_recinto: nombre_recinto,
            num_cancha: $('input[name=nombreCancha]').val(),
            hora_de_juego: $('input[name=datetimepicker3]').val(),
            fecha_de_juego: $('input[name=datetimepicker]').val(),
            fecha_de_juegoD:dia,
            estado:'Reservada'
        };
        
        var errors = validateReserva(reserva);
        
        if (errors.nombreCancha)
        return Session.set('reservaErrors', errors);

      var selector = {

          'nom_recinto':reserva.nom_recinto,         
          'num_cancha': +reserva.num_cancha,
          'hora_de_juego': +reserva.hora_de_juego,
          'fecha_de_juegoD':reserva.fecha_de_juegoD,
          'estado':reserva.estado
          
        };

        if (Reserva.findOne(selector)) {
          $('#alertReservaExistente').show();
        return false;
      }


        Reserva.update({_id: this._id}, {$set: 
          {            
            'num_cancha': $('input[name=nombreCancha]').val(), 
            'hora_de_juego': $('input[name=datetimepicker3]').val(),
            'fecha_de_juego': $('input[name=datetimepicker]').val(),            
            'fecha_de_juegoD':dia,
            'estado':reserva.estado
          }
        });
        
        Session.set('alertReservaActualizada', true);
        
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
