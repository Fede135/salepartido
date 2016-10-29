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

    'click #cancelar': function (event){

    event.preventDefault;

    Router.go('showProfile', {_id: Meteor.userId()}); 
    },
    
   'submit form': function(e,t) {
        
        e.preventDefault();

        var diaString = $(e.target).find('[name=datetimepicker]').val();
        var diaMoment = moment(diaString, 'DD/MM/YYYY', true).format();
        var dia = new Date(diaMoment);
        var hora = $(e.target).find('[name=datetimepicker3]').val();
        var recinto = $(e.target).find('[name=nombreRecinto]').val();
        //calculo fecha y hora de partido
        var horarioPartido = new Date(dia.getFullYear(),dia.getMonth(), dia.getDate(), hora, 0, 0);
        

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
        if (Reserva.findOne(selector)) {
          $('#alertReservaExistente').show();
        return false;
      }

        var idReserva = Reserva.insert(reserva);        
        
        //---------Envia notificaciones al dueño del recinto-----------
        createReservaForOwnerNotification(idReserva);
        
        //----------Guarda en arrayAmigos los amigos seleccionados para invitar---------
        var selectedFriends = t.findAll( "input[name=user]:checked");
        var arrayAmigos = _.map(selectedFriends, function(item) {
              return item.defaultValue;
        });
        //----------Guarda en arrayHost los amigos seleccionados para darle permisos de hostSecundario---------
        var selectedHost = t.findAll( "input[name=host]:checked");
        var arrayHostSecundario = _.map(selectedHost, function(item) {
              return item.defaultValue;
        });

        

        var partido = { 
          _id:Meteor.ObjectId,
          reserva_id:idReserva,
          hostId: Meteor.userId(),
          invitados: arrayAmigos,          
          equipoA:[],
          equipoB:[],
          suplentes:[],
          horario : horarioPartido,
        };
        
        var partidoId = Partido.insert(partido);
        var horamail = +$(e.target).find('[name=datetimepicker3]').val();
        var organizador = Meteor.users.findOne({_id : Meteor.userId()}).profile.name
        
        
       //---------Para mandar mail a los que quiera invitar------- 
        Meteor.call('mailReserva',arrayAmigos,partidoId,diaString,horamail,recinto,organizador);

        
        //Envia notificaciones de confirmar partido a invitados
        createInvitationToGameNotification(partidoId);

        //----------Agrega Roles a los usuarios para ese partido---------
        Meteor.call('gameRolesOrganizar', partidoId, arrayHostSecundario);

        //--------Activa el alert---------
        Session.set('alertReservaCreada', true);

        //-----------Redirige a confirmar partido--------
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

  'change [data-toggle-target]': function (event, template) {
    // Y acá en donde puse $(this) deberías reemplazarlo por $(event.currentTarget)
    var target     = $(event.currentTarget).data('toggleTarget');
    var $hostInput = $('[data-toggle-visibility="' + target + '"]');
    var isChecked  = $(event.currentTarget).is(':checked');

    if (isChecked) {
        $hostInput.removeClass('hidden');
    } else {
        $hostInput.addClass('hidden');
    }
  }
   
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

   amigos: function () { 
    var usuario = Meteor.users.findOne({_id: Meteor.userId()});
    var array = usuario.profile.friends;          
    if(array){
      var length = array.length;
      var arrayAmigos= [];
      for(i=0; i<length; i++ ) {              
          var amigosId = array[i].id;
          var amigo = Meteor.users.findOne({_id : amigosId}); 
          arrayAmigos.push(amigo);
      
        
      } 
      return arrayAmigos; 
    }else{
      return false;
    }       

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

Template.organizarPartido.onDestroyed( function() {

    Session.set('recinto', null);

});
