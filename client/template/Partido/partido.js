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

    'click #organizacionPartido': function(event){
      
      var nom_reserva=$('input[name=nombreReserva]').val();
      var reserva = Reserva.findOne({'nom_reserva':nom_reserva});
      var reserva_id = reserva._id;
      var partido = Partido.findOne({'reserva_id':reserva_id});
      var partido_id = partido._id;

      Router.go('confirmarPartido',{_id:partido_id});      
    }

});