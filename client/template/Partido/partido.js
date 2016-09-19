Template.partido.helpers({
  
    reserva: function () {
      var reserva = Reserva.find({'usuarioId':this._id});
    /*var userId = Meteor.user()._id;
    console.log(userId);*/
    return reserva;
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
    }

});