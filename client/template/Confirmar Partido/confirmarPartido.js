Template.confirmarPartido.helpers({
	
  reserva: function () {
    return Reserva.find();
  }
});

Template.confirmarPartido.events({

	'submit form': function(e) {
        
        e.preventDefault();
/*
        var partido = {
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
        Router.go('confirmarPartido', reserva);        */
    },

  'click [data-for-reserva]': function(event){

    var $item = $(event.currentTarget);
    var $target = $($item.data('forReserva'));

    $target.val($item.text());    
    
    },

  'click #obtenerDetalles': function (event) {
        
    var nomReserva = $('input:button[name=nombreReserva]').val();
    /*
    var reserva = Reserva.findOne({nom_reserva: nomReserva});
            
        console.log(reserva
            );
*/

	}
});