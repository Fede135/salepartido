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
    
   'submit form': function(e,t) {
        
        e.preventDefault();

        var diaString = $(e.target).find('[name=datetimepicker]').val();        
        var diaMoment = moment(diaString, 'DD/MM/YYYY', true).format();
        var dia = new Date(diaMoment);
        var hora = $(e.target).find('[name=datetimepicker3]').val();
        var recinto = $(e.target).find('[name=nombreRecinto]').val();

        var reserva = {
            _id:Meteor.ObjectId,
            usuarioId:Meteor.user()._id,            
            nom_reserva:$(e.target).find('[name=nombreDeLaReserva]').val(),
            nom_usuario: Meteor.user().profile.name,
            nom_recinto:$(e.target).find('[name=nombreRecinto]').val(),
            num_cancha:$(e.target).find('[name=nombreCancha]').val(),
            hora_de_juego:$(e.target).find('[name=datetimepicker3]').val(),
            fecha_de_juegoD:dia,
            fecha_de_juego:$(e.target).find('[name=datetimepicker]').val(),
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

//$gte: newDate()
        if (Reserva.findOne(selector))
        return alert("Reserva existente");

        var idReserva= Reserva.insert(reserva);        
        
        var partido = { 
          _id:Meteor.ObjectId,
          reserva_id:idReserva,
          equipoA:[],
          equipoB:[],
        };
        
        var partidoId=Partido.insert(partido);
        
        alert("Reserva creada");
       //---------Para mandar mail a los que quiera invitar------- 
       /* var selected = template.findAll( "input[type=checkbox]:checked");
        var arrayAmigos = _.map(selected, function(item) {
              return item.defaultValue;
        });
        Meteor.call('mailReserva',arrayAmigos,partidoId,diaString,hora,recinto);*/

        Router.go('confirmarPartido',{_id:partidoId});
    },
  

  'click [data-picker-handle]': function (event) {

    var datetimepicker = $(event.currentTarget).data('pickerHandle');   
    $(datetimepicker).data('DateTimePicker').toggle();

  },

  'click [data-for-recinto]': function(event){
    
    var $item=$(event.currentTarget);
    var $target=$($item.data('forRecinto'));
    
    $target.val($item.text());

    var recinto=Recintos.findOne({'_id':($item.data('forId'))});
    $('input[name=nombreCancha]').val('');
    Session.set('recinto', recinto);
    
  },

  'click [data-for-cancha]': function(event){

    var $item=$(event.currentTarget);
    var $target=$($item.data('forCancha'));

    $target.val($item.text()); 
    
  },
   
  });

Template.organizarPartido.helpers({
	
  recinto: function () {
    return Recintos.find();
  },

  cancha: function () {
      var recinto = Session.get('recinto');
      var recinto_Id = recinto && recinto._id;
      var canchas = recinto_Id && Canchas.find({'recintoId':recinto_Id,'estado_cancha.estado_de_cancha':'Habilitada'});
      return canchas;
  },

   amigos: function () {  //este es el metodo que va realmente. falta ver porque no se crea el array usuarios
        var appFriends = FacebookFriends && FacebookFriends.find();
        var amigos = []
        appFriends && appFriends.forEach(function (amigo) {
          var fbid = amigo.id; //guardo el atributo id de lo que me manda fb de cada usuario para despues buscar en mi bd, ya que este id es unico
          var usuario = Meteor.users.findOne({'services.facebook.id' : fbid});
          amigos.push(usuario);
        });
        return amigos;
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

Template.organizarPartido.onDestroyed( function(){

    Session.set('recinto', null);

});