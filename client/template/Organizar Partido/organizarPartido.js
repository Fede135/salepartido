Template.organizarPartido.onRendered(function () {
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


Template.organizarPartido.events({
    
   'submit form': function(e) {
        
        e.preventDefault();

        var reserva = {
            nom_reserva:$(e.target).find('[name=nombreDeLaReserva]').val(),
            nom_usario: Meteor.user().profile.firstName,
            nom_recinto: $(e.target).find('[name=nombreRecinto]').val(),
            num_cancha: $(e.target).find('[name=nombreCancha]').val(),
            hora_de_juego: $(e.target).find('[name=datetimepicker3]').val(),
            fecha_de_juego: $(e.target).find('[name=datetimepicker]').val()
        };

        var errors = validateReserva(reserva);
        if (errors.nombreRecinto || errors.nombreCancha ||  errors.nombreDeLaReserva )
        return Session.set('reservaErrors', errors);

        reserva._id = Reserva.insert(reserva);
        Router.go('confirmarPartido', reserva);        
    },
  

  'click [data-picker-handle]': function (event) {

    var datetimepicker = $(event.currentTarget).data('pickerHandle');   
    $(datetimepicker).data('DateTimePicker').toggle();

  },

  'click [data-for-recinto]': function(event){
    
    var $item = $(event.currentTarget);
    var $target = $($item.data('forRecinto'));
    
    $target.val($item.text()); 
    
  },

  'click [data-for-cancha]': function(event){

    var $item = $(event.currentTarget);
    var $target = $($item.data('forCancha'));

    $target.val($item.text());    
  }
  
  });

Template.organizarPartido.helpers({
	
  recinto: function () {
    return Recintos.find();
  },

  cancha: function () {
    return Canchas.find();
  },


  errorMessage: function(field) {
    return Session.get('reservaErrors')[field];
  },

  errorClass: function (field) {
    return !!Session.get('reservaErrors')[field] ? 'has-error' : '';

  }
});

Template.organizarPartido.onCreated(function() {
  Session.set('reservaErrors', {});
});






/*
$('input:button[name=datetimepicker]').val());
$('input:button[name=datetimepicker3]').val());
$('input:button[name=recinto]').val());
$('input:button[name=cancha]').val());
*/
