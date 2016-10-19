Meteor.subscribe('canchas');
Template.crearReserva.onRendered(function () {
  this.$('#datetimepicker').datetimepicker({
    locale: 'es',
    format: 'L',
    minDate: moment(),
    showClear: true,
    daysOfWeekDisabled: [1, 7],
  });

  this.$('#datetimepicker3').datetimepicker({
    locale: 'es',
    format:'H',
    disabledHours: [ 2 , 3 , 4 , 5 , 6 , 7 , 8 ],
    showClear: true
  });
});

Template.crearReserva.events({
    
   'submit form': function(e) {
        
        e.preventDefault();

        var recintoId = this._id;
        var recinto = recintoId && Recintos.findOne({'_id': recintoId});
        var nombRecinto = recinto && recinto.nombre_recinto;
        var diaString = $(e.target).find('[name=datetimepicker]').val();
        console.log(diaString)        
        var diaMoment = moment(diaString, 'DD/MM/YYYY', true).format("L");
        console.log(diaMoment)
        var dia = new Date(diaMoment);
        console.log(dia)

        var reserva = {
            _id:Meteor.ObjectId,            
            nom_reserva:$(e.target).find('[name=nombreDeLaReserva]').val(),
            nom_usuario:$(e.target).find('[name=nombreDelCliente]').val(),
            nom_recinto:nombRecinto,
            num_cancha:$(e.target).find('[name=nombreCancha]').val(),
            hora_de_juego:$(e.target).find('[name=datetimepicker3]').val(),
            fecha_de_juegoD:dia,
            fecha_de_juego:$(e.target).find('[name=datetimepicker]').val(),
            estado:'Reservada'
        };        
        var errors = validateReserva(reserva);
      
        if (errors.nombreRecinto || errors.nombreDelCliente || errors.nombreCancha ||  errors.nombreDeLaReserva )
        return Session.set('reservaErrors', errors);

        var selector = {
          
          'nom_recinto':reserva.nom_recinto,
          'num_cancha':+reserva.num_cancha,
          'hora_de_juego':+reserva.hora_de_juego,
          'fecha_de_juegoD':reserva.fecha_de_juegoD,
          'estado':reserva.estado
          
        };


        if (Reserva.findOne(selector))
          return alert("Reserva existente");
        
        var x= Reserva.insert(reserva);
        
        var partido = { 
          _id:Meteor.ObjectId,
          reserva_id:x
        };
        
        var partidoId= Partido.insert(partido);
        
        alert("Reserva creada");

        Session.clear();
        var tabla = true;
        Session.set('tabla', tabla);
                
    },

    'click #cancelar': function (event){

        event.preventDefault;

         Session.set('tabla', true);
    },
    
    'click [data-picker-handle]': function (event) {

      var datetimepicker = $(event.currentTarget).data('pickerHandle');   
      $(datetimepicker).data('DateTimePicker').toggle();

    },

    'click [data-for-cancha]': function(event){

      var $item=$(event.currentTarget);
      var $target=$($item.data('forCancha'));

      $target.val($item.text());        
    }
  
  });

Template.crearReserva.helpers({

  recinto: function () {
   
    var recintoDueno = Recintos.find({'ownerId': Meteor.user()._id});
    return recintoDueno;
  },
  
  cancha: function () {
      
      var recinto_Id = this._id;
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

Template.crearReserva.onCreated(function() {
  
  Session.set('reservaErrors', {});
});

Template.crearReserva.onDestroyed( function(){

    Session.set('reserva', null);

});
