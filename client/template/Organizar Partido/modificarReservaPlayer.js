Template.modificarReservaPlayer.helpers({

  reserva: function(){
    var reserva = Reserva.findOne({'_id':this._id});      
    Session.set('reserva', reserva);
  return reserva;
  },
	
  recinto: function () {
    return Recintos.find();
  },

  cancha: function () {
      var recinto = Session.get('recinto');
      var recinto_Id = recinto && recinto._id;
      var canchas = recinto_Id && Canchas.find({'recintoId':recinto_Id, 'estado_cancha.estado_de_cancha': "Habilitada"});
      return canchas;
  },

  errorMessage: function(field) {
    return Session.get('reservaErrors')[field];
  },

  errorClass: function (field) {
    return !!Session.get('reservaErrors')[field] ? 'has-error' : '';
  }

});

Template.modificarReservaPlayer.onCreated(function() {
  
  Session.set('reservaErrors', {});
});

Template.modificarReservaPlayer.onDestroyed( function(){

    Session.set('recinto', null);

});

Template.modificarReservaPlayer.events({

'click [data-picker-handle]': function (event) {

    var datetimepicker = $(event.currentTarget).data('pickerHandle');   
    $(datetimepicker).data('DateTimePicker').toggle();

  },
 
 'click [data-for-cancha]': function(event){

    var $item=$(event.currentTarget);
    var $target=$($item.data('forCancha'));

    $target.val($item.text()); 
  },

  'click [data-for-recinto]': function(event){
    
    var $item=$(event.currentTarget);
    var $target=$($item.data('forRecinto'));
    
    $target.val($item.text());

    var recinto=Recintos.findOne({'_id':($item.data('forId'))});
    $('input[name=nombreCancha]').val('');
    Session.set('recinto', recinto);
    
  },

  'click #actualizarReserva': function(e) {
        
        var reserva = Session.get('reserva');
        var nom_reserva = reserva && reserva.nom_reserva;
        var nom_usuario = reserva && reserva.nom_usuario;      
        var diaString = $('input[name=datetimepicker]').val();        
        var diaMoment = moment(diaString, 'DD/MM/YYYY', true).format();
        var dia = new Date(diaMoment);

        e.preventDefault();

        var reserva = {

            _id: this._id,
            nom_usuario: nom_usuario,            
            nom_reserva: nom_reserva,            
            nom_recinto: $('input[name=nombreRecinto]').val(),
            num_cancha: $('input[name=nombreCancha]').val(),
            hora_de_juego: $('input[name=datetimepicker3]').val(),
            fecha_de_juego: $('input[name=datetimepicker]').val(),
            fecha_de_juegoD:dia,
            estado:'Reservada'
        };
        
        var errors = validateReserva(reserva);
        
        if (errors.nombreRecinto || errors.nombreCancha ||  errors.nombreDeLaReserva )
        return Session.set('reservaErrors', errors);

        var selector = {
            
            'nom_recinto':reserva.nom_recinto,
            'num_cancha': +reserva.num_cancha,
            'hora_de_juego': +reserva.hora_de_juego,
            'fecha_de_juegoD':reserva.fecha_de_juegoD,
            'estado':reserva.estado
            
          };

        if (Reserva.findOne(selector))
        return alert("Reserva existente");


        Reserva.update({_id: this._id}, {$set: 
          {            
            'num_cancha': $('input[name=nombreCancha]').val(), 
            'hora_de_juego': $('input[name=datetimepicker3]').val(),
            'fecha_de_juego': $('input[name=datetimepicker]').val(),                        
            'fecha_de_juegoD':dia,
            'estado':reserva.estado
          }
        });

        var partido = { 
          _id:Meteor.ObjectId,
          reserva_id:this._id,
          equipoA:[],
          equipoB:[],
        };
        
        var partidoId=Partido.insert(partido);

        alert("Reserva actualizada");

        Router.go('confirmarPartido',{_id:partidoId});
    }
});

Template.modificarReservaPlayer.onRendered(function () {
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