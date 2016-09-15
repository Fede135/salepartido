Template.partido.helpers({
	
  reservaSeleccionada: function () {
    return Session.get('reserva');
  },

  reserva: function () {
    return Reserva.find();
  }
});

Template.partido.events({

    'click [data-for-reserva]': function(event){

    var $item = $(event.currentTarget);
    var $target = $($item.data('forReserva'));

    $target.val($item.text());    

    var reserva = Reserva.findOne($item.data('reservaId'));
    Session.set('reserva', reserva);    
    
    },
});