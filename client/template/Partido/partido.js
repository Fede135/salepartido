Meteor.subscribe('reserva');

Template.partido.helpers({
  
  reserva: function () {
    return Reserva.find();
  },

  errorMessage: function(field) {
    return Session.get('reservaErrors')[field];
  },

  errorClass: function (field) {
    return !!Session.get('reservaErrors')[field] ? 'has-error' : '';
  }
});

Template.partido.events({

    'click [data-for-reserva]': function(event){

    var $item = $(event.currentTarget);
    var $target = $($item.data('forReserva'));

    $target.val($item.text());      
    
    },

    'click #organizacionPartido': function(event){ 

      var nom_reserva=$('input[name=nombreReserva]').val();
      var reserva = Reserva.findOne({'nom_reserva':nom_reserva});
      var reserva_id = reserva._id;
      var partido = Partido.findOne({'reserva_id':reserva_id});
      var partido_id = partido._id;

      Router.go('confirmarPartido',{_id:partido_id});      
    },

    'click #modificar': function (event) {
      var nom_reserva=$('input[name=nombreReserva]').val();
      var reserva = Reserva.findOne({'nom_reserva':nom_reserva});
      var reserva_id = reserva._id;
    Router.go('modificarReservaPlayer', {_id: reserva_id});
  },

  'click #cancelar': function(event){

    var nom_reserva=$('input[name=nombreReserva]').val();
    var reserva = Reserva.findOne({'nom_reserva':nom_reserva});
    var reserva_id = reserva._id;

    Reserva.update({_id: reserva_id}, {$set: {'estado': "Cancelada"}});
    alert("Reserva cancelada");
    $('input[name=nombreReserva]').val('');

    },

});

Template.partido.onCreated(function() {
  
  Session.set('reservaErrors', {});
});